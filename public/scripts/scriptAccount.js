//Javascript

const userInformation = document.getElementsByName('user-information')[0];
const userOrders = document.getElementsByName('user-orders')[0];

//get user information from cookies
let user;
for (let i = 0; i < cookies.length; i++){
    if (cookies[i].substring(0, 5) == "user=") {
        user = [];
        user = JSON.parse(decodeURI(cookies[i].slice(5)).replaceAll('%3A', ':').replaceAll('%2C', ','));
        user.email = user.email.replace('%40', '@');
        delete_cookie('user');
    }
}

const arrayList = ['Username', 'E-mail', 'Address', 'Date of registration', 'Creditcard'];
let infoArray = [];
if (user != null) {
    date = new Date(user.registered_date).toDateString();
    infoArray = [user.username, user.email, user.address, date, user.credit_card]
}

//display user information
if (checkLogIn){
    for (let i = 0; i < arrayList.length; i++){
        const p = document.createElement('p');
        p.append(document.createTextNode(arrayList[i] + ': ' + infoArray[i] + '.'));
        userInformation.append(p);    
    }
} else {
    const p = document.createElement('p');
    p.append(document.createTextNode('You are not logged in.'));
    userInformation.append(p);
}

//get orders from cookies
let orders;
for (let i = 0; i < cookies.length; i++){
    if (cookies[i].substring(0, 6) == "orders") {
        orders = [];
        orders = JSON.parse(decodeURI(cookies[i].slice(7)).replaceAll('%3A', ':').replaceAll('%2C', ','));
        delete_cookie('orders');
    }
}
console.log(orders);

if (orders) {
// display orders
    for (let i = 0; i < orders.length; i++){
        const p = document.createElement('p');
        const date = orders[i].date.replaceAll('T', ' ').replaceAll('Z', '');
        p.append(
            document.createTextNode('Order for the movie \'' + orders[i].title + '\'.'), document.createElement('br'),
            document.createTextNode('- date and time of the movie: ' + date.substring(0, 16)), document.createElement('br'),
            document.createTextNode('- number of tickets: ' + orders[i].num_of_tickets), document.createElement('br'), document.createElement('br')
        );
        userOrders.append(p);
    }
} else {
    const p = document.createElement('p');
    p.append(document.createTextNode('No orders to be displayed.'));
    userOrders.append(p);
}