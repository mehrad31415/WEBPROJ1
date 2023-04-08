//Javascript

//USER-INFORMATION SHOULD COME FROM SESSION!!!!
const checkLogIn = true; //Should be changed by session

const user = {
    userId : 4,
    username : "nick",
    email : "nick.bosch@gmail.com",
    login : "nick123",
    password : "nick321",
    address : `9512 SB, Bareveld 63, Nieuwediep, Drenthe`,
    creditCard : "NL00ABNA0123456789",
    registeredDate : '2020-03-29 19:54:11.120'
}


const arrayList = ['Username', 'E-mail', 'Address', 'Date of registration', 'Creditcard'];
const infoArray = [user.username, user.email, user.address, user.registeredDate, user.creditCard]
const userInformation = document.getElementsByName('user-information')[0];
const userOrders = document.getElementsByName('user-orders')[0];
const cookies = document.cookie.split('; ');
console.log(cookies);
//display user information
if (checkLogIn){
    for (let i = 0; i < arrayList.length; i++){
        const p = document.createElement('p');
        p.append(document.createTextNode(arrayList[i] + ': ' + infoArray[i]));
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
    }
}

if (orders) {
// display orders
    for (let i = 0; i < orders.length; i++){
        const p = document.createElement('p');
        p.append(
            document.createTextNode('Order placed on ' + orders[i].date + '.'), document.createElement('br'),
            document.createTextNode('- movie: \'' + orders[i].title + '\''), document.createElement('br'),
            document.createTextNode('- number of tickets: ' + orders[i].num_of_tickets), document.createElement('br'), document.createElement('br')
        );
        userOrders.append(p);
    }
} else {
    const p = document.createElement('p');
    p.append(document.createTextNode('No orders to be displayed.'));
    userOrders.append(p);
}