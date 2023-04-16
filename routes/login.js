const express = require('express');
const router = express.Router();
const { getUserByID, getOrdersByUser, getNrOfUsers, getAllUsers } = require('../controllers/queries');
let swtch = 0;
const { db } = require('../controllers/db');

router.get('/account', async (req, res) => {
    let userID = null;
    if (req.session.userID) userID = JSON.parse(req.session.userID);
    res.cookie('userID', userID, { httpOnly: false });
    const user = await getUserByID(userID);
    const nrOrders = (await getOrdersByUser(userID)).length;
    if (userID != null) {
        let orders = null;
        if (nrOrders > 0) orders = await getOrdersByUser(userID);
        res.cookie('orders', JSON.stringify(orders).replace(/'/g, "\\'").replaceAll('\\"', '???'), { httpOnly: false });
        res.cookie('user', JSON.stringify(user).replace(/'/g, "\\'").replaceAll('\\"', '???'), { httpOnly: false });
    }
    res.status(200).render('account');
});
router.get('/pur', (req, res) => {
    // console.log(req.cookies);
    if (req.cookies.newOrder) {
        order = JSON.parse(req.cookies.newOrder);
        db.run('INSERT INTO Ordering (order_id, user_id, movie_id, date, num_of_tickets) VALUES(?, ?, ?, ?, ?)', [order.order_id, order.user_id, order.movie_id, order.date, order.amount]);
        res.clearCookie("newOrder");

        const cookies = req.cookies;
        for (let cookieName in cookies) {
            if (cookieName.startsWith('orderUnf')) {
                const cookieValue = JSON.parse(cookies[cookieName]);
                // console.log(cookieValue.order_id);
                if (cookieValue.order_id == order.order_id) {
                    res.clearCookie(cookieName);
                }
            }

        }

    }

    res.redirect('/account');
});

router.post('/auth', async (req, res) => {
    const log = req.query.log;
    switch (log) {
        case 'in':
            // Capture the input fields
            let login = req.body.login;
            let password = req.body.password;

            // Ensure the input fields exists and are not empty
            if (login && password) {
                let query = "SELECT * FROM user WHERE login = ? AND password = ?";

                // Query the database
                db.get(query, [login, password], (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    // If the user exists
                    if (rows) {
                        // Set the session
                        req.session.loggedin = true;
                        req.session.userID = rows.user_id;
                        // Redirect to the account page
                        res.redirect('/account');
                    } else {
                        // Redirect to the login page
                        // statuscode 403 has been used here meaning that the client cannot access the target url.
                        res.status(403).render('incorrect-user-pass');
                    }
                });
            } else {
                // theoretically because the inputs are required we should not encounter this but for safety this has been put.
                res.status(403).send('Please enter Username and Password!');
            }
            break;
        case 'out':
            //Destroy all unfinished order cookies
            const cookies = req.cookies;
            for (let cookieName in cookies) {
                if (cookieName.startsWith('orderUnf')) {
                    res.clearCookie(cookieName);
                }

            };
            // Destroy the session
            req.session.destroy((err) => {
                if (err) {
                    throw err;
                }
                res.clearCookie("userID");
                // Redirect to the home page
                res.redirect('/');
            });
            break;
        case 'sign':
            swtch = 0;
            const signUserID   = (await getNrOfUsers()) + 1;
            const signUsername = req.body.username;
            const signEmail    = req.body.email;
            const signLogin    = req.body.login;
            const signPassword = req.body.password;
            const signAddress  = req.body.address;
            const signCredit   = req.body.creditcard;
            const signDate     = new Date();
            const allUsers     = await getAllUsers();
            // console.log(allUsers);
            for (let i = 0; i < await allUsers.length; i++) {
                const elem = allUsers[i];
                if (signUsername === elem.username || signEmail === elem.email || signLogin === elem.login) {
                    swtch = 1;
                    break;
                }
            }
            if (swtch === 1) {
                res.cookie = ('swtch', swtch);
                res.status(200).redirect('sign');


                // router.get('/message', (req,res) => {
                //     res.status(200).json({"msg":"user already exists"});
                // });
                // res.render('sign-in', {swtch:swtch});
            } else {
                db.run('INSERT INTO user '
                    + '(user_id, username, email, login, password, address, credit_card, registered_date) '
                    + 'VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [
                    signUserID,
                    signUsername,
                    signEmail,
                    signLogin,
                    signPassword,
                    signAddress,
                    signCredit,
                    signDate.toISOString().replace('T', ' ').replace('Z', '')
                ]);
                // Set the session
                req.session.loggedin = true;
                req.session.userID = signUserID;
                // Redirect to the account page
                res.redirect('/account');
            }
            break;
        default:
            res.redirect('/');
    }
});

router.get('/sign', (req, res) => {

    if (req.cookies.swtch) {
        swtch = req.cookies.swtch;
        res.clearCookie('swtch');
    }
    res.status(200).render('sign-in', {swtch : swtch});
});

module.exports = router;