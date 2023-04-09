//Javascript

const cookies = document.cookie.split('; ');
let userID = null;
for (let i = 0; i < cookies.length; i++){
    if (cookies[i].substring(0, 6) == "userID") {
        userIDTemp = cookies[i].replace('userID=', '');
        if (userIDTemp != 'undefined') {
            userID = userIDTemp;
        }
    }
}
let checkLogIn = false;

if (userID != null){
    checkLogIn = true;
}

const path = window.location.pathname;
const page = path.split("/").pop();
let tooltipArray = [];

const head = document.getElementsByTagName('head')[0];
const body = document.getElementsByTagName('body')[0];
const header = document.getElementsByTagName('header')[0];
const footer = document.getElementsByTagName('footer')[0];
const nav = document.getElementsByTagName('nav')[0];
let nav2 = null;

//repeating elements
    //CLASSES
    body.setAttribute('class', 'body--fit-content body--background-color body--text-font');
    body.children[0].setAttribute('class', 'body__container');
    nav.setAttribute('class', 'nav row');
    header.setAttribute('class', 'header--fit-content header--background-colour row');
    footer.setAttribute('class', 'footer--positioning footer--fit-content footer--background-colour row');

    //HEAD
    const charset = document.createElement('meta');
    charset.setAttribute('charset', 'UTF-8');
    const descr = document.createElement('meta');
    descr.setAttribute('name', 'description');
    let contentString;
    if (page == 'index.html' || page == '') {
        contentString = "Home webpage of 'MovieHouse'";
    } else {
        contentString = page.split("-")[0].split(".")[0].charAt(0).toUpperCase() + page.split("-")[0].split(".")[0].slice(1) + " webpage of 'MovieHouse'";
    }
    descr.setAttribute('content', contentString);
    const author = document.createElement('meta');
    author.setAttribute('name', 'author');
    author.setAttribute('content', 'STUDENTS OF UTRECHT UNIVERSITY WEB TECHNOLOGY COURSE');
    const viewp = document.createElement('meta');
    viewp.setAttribute('name', 'viewport');
    viewp.setAttribute('content', 'width=device-width, initial-scale=1.0');
    const title = document.createElement('title');
    if (page == 'index.html' || page == '') {
        title.append(document.createTextNode('MOVIEHOUSE | HOME'));
    } else {
        title.append(document.createTextNode('MOVIEHOUSE | ' + page.split("-")[0].split(".")[0].toUpperCase()));
    }
    //Adding Favicon
    const icon = document.createElement('link');
    icon.setAttribute('rel', 'icon');
    icon.setAttribute('href', '../files/icon/icon.ico');
    const styles = document.createElement('link');
    styles.setAttribute('rel', 'stylesheet');
    styles.setAttribute('href', '../css/style.css');
    //Font Embedding
    const font1 = document.createElement('link');
    font1.setAttribute('rel', 'preconnect');
    font1.setAttribute('href', 'https://fonts.googleapis.com');
    const font2 = document.createElement('link');
    font2.setAttribute('rel', 'preconnect');
    font2.setAttribute('href', 'https://fonts.gstatic.com');
    font2.setAttribute('crossorigin', '');
    const font3 = document.createElement('link');
    font3.setAttribute('rel', 'stylesheet');
    font3.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300&family=Roboto&display=swap');

    head.append(charset, descr, author, viewp, title, icon, styles, font1, font2, font3);

    //HEADER
    const imgLink = document.createElement('a');
    imgLink.setAttribute('href', 'home');
    imgLink.setAttribute('class', 'film-frame--width');
    const img = document.createElement('img');
    img.setAttribute('src', '../files/images/film-frame.png');
    img.setAttribute('alt', 'This is an image of a film frame sticker from twitter');
    img.setAttribute('class', 'film-frame');
    imgLink.append(img);
    const h1 = document.createElement('h1');
    h1.setAttribute('class', 'h1--position h1--text-attributes h1--width');
    if (page == 'index.html' || page == '') {
        h1.append(document.createTextNode('MovieHouse'));
    } else {
        h1.append(document.createTextNode('MovieHouse - ' + page.split("-")[0].split(".")[0].charAt(0).toUpperCase() + page.split("-")[0].split(".")[0].slice(1)));
    }

    //LOGIN
    const formLogIn = document.createElement('form');
    formLogIn.method = "post";
    const divLoginHeader = document.createElement('div');
    divLoginHeader.classList = 'header';
    const divLogInForm = document.createElement('div');
    divLogInForm.classList = 'login-form';
    divLogInForm.id = 'login-form';
    divLoginHeader.append(divLogInForm);
    const btnSubmit = document.createElement('button');
    btnSubmit.type = 'submit';
    btnSubmit.id = 'login-btn';
    if (!checkLogIn){
        formLogIn.action = "/auth?log=in";
        btnSubmit.append(document.createTextNode('Login'));
        const inputUname = document.createElement('input');
        const inputPword = document.createElement('input');
        inputUname.type = 'text';
        inputUname.id = 'username';
        inputUname.name = 'username';
        inputUname.placeholder = 'Username';
        inputPword.type = 'password';
        inputPword.id = 'password';
        inputPword.name = 'password';
        inputPword.placeholder = 'Password';
        divLogInForm.append(inputUname, inputPword);
    } else {
        btnSubmit.append(document.createTextNode('Log Out'));
        formLogIn.action = "/auth?log=out";
        const btnAccount = document.createElement('button');
        btnAccount.type = 'button';
        btnAccount.id = 'login-btn';
        btnAccount.append(document.createTextNode('My Account'));
        btnAccount.onclick = function(){
            window.location = 'account'
        };
        divLogInForm.append(btnAccount);
    }
    divLogInForm.append(btnSubmit);
    formLogIn.append(divLoginHeader);

    header.append(imgLink, h1, formLogIn);

    //NAVIGATION
    const navList = document.createElement('ul');
    navList.setAttribute('class', 'nav-list')
    nav.append(navList);
    const homeList = document.createElement('li');
    homeList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
    const homeLink = document.createElement('a');
    homeLink.setAttribute('class', 'link');
    homeLink.setAttribute('href', 'home');
    homeList.append(homeLink);
    homeLink.append(document.createTextNode('Home'));
    const contList = document.createElement('li');
    contList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
    const contLink = document.createElement('a');
    contLink.setAttribute('class', 'link');
    contLink.setAttribute('href', 'contact');
    contList.append(contLink);
    contLink.append(document.createTextNode('Contact'));

    navList.append(homeList, contList);

    //FOOTER
    const parFooter = document.createElement('p');
    parFooter.setAttribute('class', 'footer__paragraph');
    parFooter.append(document.createTextNode('This website has been created as part of the Web Technology course at Utrecht University.'));
    parFooter.append(document.createElement('br'));
    parFooter.append(document.createTextNode('This work has been carried out by three students, namely, Bogaert, L.P. van den (Lars), Riel, E.P.M. van (Erik), Haghshenas, M. (Mehrad).'));
    parFooter.append(document.createElement('br'));
    parFooter.append(document.createTextNode('Should you have any enquiries please '));
    const contact = document.createElement('a');
    contact.setAttribute('class', 'footer__contact-link--no-colour-change');
    contact.setAttribute('href', 'contact.html');
    contact.append(document.createTextNode('contact us'));
    parFooter.append(contact, document.createTextNode('.'));
    const spanFooter = document.createElement('span');
    spanFooter.setAttribute('class', 'footer__jump-top--position-absolute');
    const toTopLink = document.createElement('a');
    toTopLink.setAttribute('href', '#');
    toTopLink.setAttribute('class', 'footer__jump-top--no-colour-change');
    toTopLink.append(document.createTextNode('Click here to scroll to the top of the page.'), document.createElement('br'));
    spanFooter.append(toTopLink);

    footer.append(parFooter, spanFooter);

//menus 

//Create constants

const elementDropdown = document.createElement('select');
const styleDropdown = document.createElement('select');
const fontSizeInput = document.createElement('input');
const colorInput = document.createElement('input');

// Add the CSS elements
elementDropdown.classList.add('select-dropdown');
styleDropdown.classList.add('select-dropdown');
fontSizeInput.classList.add('fontssize-box');

colorInput.type = 'color';

footer.appendChild(elementDropdown);
footer.appendChild(styleDropdown);

//Log in Menu

// !!!!!FROM CHATGPT:!!!!!

// // //serverside:

// const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const bcrypt = require('bcrypt');
// const db = require('./db'); // assuming you have a separate file for your database connection

// const app = express();

// app.use(bodyParser.json());
// app.use(cookieParser());

// app.post('/api/login', (req, res) => {
//   const { email, password } = req.body;

//   // Query the database to check if the user exists
//   db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
//     if (error) {
//       console.error('Error checking if user exists:', error);
//       return res.status(500).json({ success: false, message: 'An error occurred while checking if the user exists.' });
//     }

//     if (results.length === 0) {
//       // User does not exist
//       return res.status(401).json({ success: false, message: 'Invalid email or password.' });
//     }

//     // Compare the user's password hash with the provided password
//     const user = results[0];
//     bcrypt.compare(password, user.passwordHash, (error, isMatch) => {
//       if (error) {
//         console.error('Error comparing passwords:', error);
//         return res.status(500).json({ success: false, message: 'An error occurred while authenticating the user.' });
//       }

//       if (isMatch) {
//         // Passwords match, login successful

//         // Set a cookie to keep track of the user's email
//         res.cookie('email', email, { sameSite: 'strict' });

//         // Set a cookie to keep track of the user's login status
//         res.cookie('loggedIn', true, { sameSite: 'strict' });

//         return res.status(200).json({ success: true, message: 'Login successful.' });
//       } else {
//         // Passwords do not match
//         return res.status(401).json({ success: false, message: 'Invalid email or password.' });
//       }
//     });
//   });
// });

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

// // // html
// <!DOCTYPE html>
// <html>
// <head>
//   <title>Login</title>
// </head>
// <body>
//   <h1>Login</h1>
//   <form id="login-form">
//     <label for="email">Email:</label>
//     <input type="email" id="email" name="email" required>

//     <br><br>

//     <label for="password">Password:</label>
//     <input type="password" id="password" name="password" required>

//     <br><br>

//     <button type="submit">Login</button>
//   </form>

//   <script src="login.js"></script>
// </body>
// </html>

// userside javascript

// // Assume you have a login form in your HTML with input fields with ids "email" and "password"
// const emailInput = document.getElementById('email');
// const passwordInput = document.getElementById('password');

// // Add an event listener to your login form submit button
// const loginForm = document.getElementById('login-form');
// loginForm.addEventListener('submit', (event) => {
//   event.preventDefault(); // Prevent the form from submitting

//   const email = emailInput.value;
//   const password = passwordInput.value;

//   // Perform validation on the email and password fields if needed

//   // Send a login request to your server with the email and password
//   fetch('/api/login', {
//     method: 'POST
