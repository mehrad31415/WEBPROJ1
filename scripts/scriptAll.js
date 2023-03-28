//Javascript

const path = window.location.pathname;
const page = path.split("/").pop();
let tooltipArray = [];

const head = document.getElementsByTagName('head')[0];
const body = document.getElementsByTagName('body')[0];
const header = document.getElementsByTagName('header')[0];
const footer = document.getElementsByTagName('footer')[0];
const nav = document.getElementsByTagName('nav')[0];


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
    imgLink.setAttribute('href', 'index.html');
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
    const homeList = document.createElement('li');
    homeList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
    const homeLink = document.createElement('a');
    homeLink.setAttribute('class', 'link');
    homeLink.setAttribute('href', 'angry-men-home.html');
    homeList.append(homeLink);
    homeLink.append(document.createTextNode('Home'));
    const castList = document.createElement('li');
    castList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
    const castLink = document.createElement('a');
    castLink.setAttribute('class', 'link');
    castLink.setAttribute('href', 'cast-members.html');
    castList.append(castLink);
    castLink.append(document.createTextNode('Cast'));
    const adapList = document.createElement('li');
    adapList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
    const adapLink = document.createElement('a');
    adapLink.setAttribute('class', 'link');
    adapLink.setAttribute('href', 'adaptations-and-parodies.html');
    adapList.append(adapLink);
    adapLink.append(document.createTextNode('Adaptations'));
    const awarList = document.createElement('li');
    awarList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
    const awarLink = document.createElement('a');
    awarLink.setAttribute('class', 'link');
    awarLink.setAttribute('href', 'awards.html');
    awarList.append(awarLink);
    awarLink.append(document.createTextNode('Awards'));
    const tranList = document.createElement('li');
    tranList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
    const tranLink = document.createElement('a');
    tranLink.setAttribute('class', 'link');
    tranLink.setAttribute('href', 'transcripts.html');
    tranList.append(tranLink);
    tranLink.append(document.createTextNode('Transcripts'));
    const reviList = document.createElement('li');
    reviList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
    const reviLink = document.createElement('a');
    reviLink.setAttribute('class', 'link');
    reviLink.setAttribute('href', 'reviews.html');
    reviList.append(reviLink);
    reviLink.append(document.createTextNode('Reviews'));
    const infoList = document.createElement('li');
    infoList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
    const infoLink = document.createElement('a');
    infoLink.setAttribute('class', 'link');
    infoLink.setAttribute('href', 'info.html');
    infoList.append(infoLink);
    infoLink.append(document.createTextNode('Info'));
    const contList = document.createElement('li');
    contList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
    const contLink = document.createElement('a');
    contLink.setAttribute('class', 'link');
    contLink.setAttribute('href', 'contact.html');
    contList.append(contLink);
    contLink.append(document.createTextNode('Contact'));

    nav.append(homeList, castList, adapList, awarList, tranList, reviList, infoList, contList);

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

//Element menu 
// get all elements from DOM
const elements = document.querySelectorAll('body, header, footer, aside, article, section');

elements.forEach((element) => {
    // get type of elemnt
    const elementType = element.nodeName.toLowerCase();

    const option = document.createElement('option');
    option.text = elementType;
    elementDropdown.add(option);
});

// font and size menu

const styleOptions = [{
    name: 'Font-size (px)',
    property: 'font-size'
},
{
    name: 'Color',
    property: 'color'
},
];

// Add the placeholder to the textbox
fontSizeInput.setAttribute('placeholder', 'Enter font-size');


styleOptions.forEach((option) => {
    const styleOption = document.createElement('option');
    styleOption.text = option.name;
    styleOption.value = option.property;
    styleDropdown.add(styleOption);
});


// Logic for switching the color or font size input  
if (styleDropdown.value === 'font-size') {
    footer.appendChild(fontSizeInput);
} else {
    footer.appendChild(colorInput);
}

styleDropdown.addEventListener('change', (event) => {
    if (event.target.value === 'font-size') {
        footer.removeChild(colorInput);
        footer.appendChild(fontSizeInput);
    } else {
        footer.removeChild(fontSizeInput);
        footer.appendChild(colorInput);
    }
});

// font and size menu font input
fontSizeInput.addEventListener('input', (event) => {
    if (event.target.value < 8 || event.target.value > 24) {
        return;
    }
    const element = document.querySelector(elementDropdown.value);
    // find all children of element
    const children = element.querySelectorAll('*');
    // add font size to all children
    children.forEach((child) => {
        child.style.fontSize = event.target.value + 'px';
    });
});

// font and size menu color input
colorInput.addEventListener('change', (event) => {
    const element = document.querySelector(elementDropdown.value);
    // find all children of element
    const children = element.querySelectorAll('*');
    // add color to all children
    children.forEach((child) => {
        child.style.color = event.target.value;
    });
});

