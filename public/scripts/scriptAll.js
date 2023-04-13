//Javascript

const cookies = document.cookie.split('; ');
let userID = null;
let newOrder = null;
for (let i = 0; i < cookies.length; i++){
    if (cookies[i].substring(0, 7) == "userID=") {
        userIDTemp = cookies[i].replace('userID=', '');
        if (userIDTemp != 'undefined') {
            userID = JSON.parse(userIDTemp.replace('j%3A', ''));
        }
    }
    if (cookies[i].substring(0, 9) == "newOrder=") {
        newOrderTemp = cookies[i].replace('newOrder=', '');
        if (newOrderTemp != 'undefined') {
            newOrder = JSON.parse(newOrderTemp);
        }
    }
}
console.log('newOrder = ');
console.log(newOrder);

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
    imgLink.setAttribute('href', './');
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

header.append(imgLink, h1);

    //NAVIGATION
    const navList = document.createElement('ul');
    navList.setAttribute('class', 'nav-list')
    nav.append(navList);
    const homeList = document.createElement('li');
    homeList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
    const homeLink = document.createElement('a');
    homeLink.setAttribute('class', 'link');
    homeLink.setAttribute('href', './');
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

// LOGIN
const formPopup = document.createElement("div");
formPopup.className = "form-popup";
formPopup.id = "LogInPopUp";

const form = document.createElement("form");
form.method = 'post'
form.action = "/auth?log=in";
form.className = "form-container";

const heading = document.createElement("h1");
heading.textContent = "Log In";

const usernameLabel = document.createElement("label");
usernameLabel.textContent = "login";
usernameLabel.setAttribute("for", "login");

const passwordLabel = document.createElement("label");
passwordLabel.textContent = "password";
passwordLabel.setAttribute("for", "password");

// Create the input elements for login and password
const emailInput = document.createElement("input");
emailInput.setAttribute("type", "text");
emailInput.setAttribute("placeholder", "Enter Login");
emailInput.setAttribute("name", "login");
emailInput.setAttribute("required", "");

const passwordInput = document.createElement("input");
passwordInput.setAttribute("type", "password");
passwordInput.setAttribute("placeholder", "Enter Password");
passwordInput.setAttribute("name", "password");
passwordInput.setAttribute("required", "");

// Create the login button element
const loginButton = document.createElement("button");
loginButton.setAttribute("type", "submit");
loginButton.className = "btn";
loginButton.textContent = "Login";

// Create the close button element with onclick attribute
const closeButton = document.createElement("button");
closeButton.setAttribute("type", "button");
closeButton.className = "btn cancel";
closeButton.textContent = "Close";
closeButton.setAttribute("onclick", "closeForm()");

// Add the elements to the form container
form.appendChild(heading);
form.appendChild(usernameLabel);
form.appendChild(emailInput);
form.appendChild(passwordLabel);
form.appendChild(passwordInput);
form.appendChild(loginButton);
form.appendChild(closeButton);

formPopup.appendChild(form);
body.appendChild(formPopup);

//LOGIN Bottom Buttons
const divLogIn = document.createElement('div');
divLogIn.classList = 'login-div';
const btnLog = document.createElement('button');
if (newOrder != null) {
    const btnOrder = document.createElement('button');
    btnOrder.type = 'button';
    btnOrder.id = 'tickets-btn';
    btnOrder.append(document.createTextNode('Unfinished Order'));
    btnOrder.onclick = function(){
    dayTime = new Date(newOrder.date);
    console.log(newOrder);
    // movieNew.value = newOrder.movie_id; 
    // dateTimeNew.value = newOrder.date;
    // ticketsNew.value = newOrder.ammount;
    window.location =   'tickets' + 
                        '?id=' + newOrder.movie_id +
                        '&date=' + dayTime.getFullYear() + '-' + (dayTime.getMonth()+1) + '-' + dayTime.getDate() +
                        '&time=' + dayTime.getHours() + '-' + dayTime.getMinutes() + '-' + dayTime.getSeconds();
    };
    divLogIn.append(btnOrder);
}
if (!checkLogIn){
    btnLog.type = 'button';
    btnLog.onclick = openForm;
    btnLog.append(document.createTextNode('Log In'));
    const btnSignIn = document.createElement('button');
    btnSignIn.type = 'button';
    btnSignIn.id = 'login-btn';
    btnSignIn.append(document.createTextNode('Sign In'));
    btnSignIn.onclick = function(){
        window.location = 'sign'
    }
    divLogIn.append(btnLog, btnSignIn);
} else {
    const formLogOut = document.createElement('form');
    formLogOut.method = "post";
    formLogOut.action = "/auth?log=out";
    btnLog.type = 'submit';
    btnLog.append(document.createTextNode('Log Out'));
    const btnAccount = document.createElement('button');
    btnAccount.type = 'button';
    btnAccount.id = 'login-btn';
    btnAccount.append(document.createTextNode('My Account'));
    btnAccount.onclick = function(){
        window.location = 'account'
    };
    formLogOut.append(btnLog);
    divLogIn.append(formLogOut, btnAccount);
}
header.append(divLogIn)

//functions
function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function openForm() {
    document.getElementById("LogInPopUp").style.display = "block";
    divLogIn.style.display = 'none';
}

function closeForm() {
    document.getElementById("LogInPopUp").style.display = "none";
    divLogIn.style.display = 'inline-flex';
}