//Javascript

//HEAD
if (page == 'angry-men-home.html' || page == '') {
    contentString = "Home webpage of the movie '12 Angry Men'";
} else {
    contentString = page.split("-")[0].split(".")[0].charAt(0).toUpperCase() + page.split("-")[0].split(".")[0].slice(1) + " webpage of the movie '12 Angry Men'";
}
descr.setAttribute('content', contentString);

if (page == 'angry-men-home.html' || page == '') {
    title.firstChild.replaceWith(document.createTextNode('12 ANGRY MEN | HOME'));
} else {
    title.firstChild.replaceWith(document.createTextNode('12 ANGRY MEN | ' + page.split("-")[0].split(".")[0].toUpperCase()));
}

//HEADER
h1.innerHTML= "";
if (page == 'angry-men-home.html' || page == '') {
    h1.append(document.createTextNode('12 Angry Men'));
} else {
    h1.append(document.createTextNode('12 Angry Men - ' + page.split("-")[0].split(".")[0].charAt(0).toUpperCase() + page.split("-")[0].split(".")[0].slice(1)));
}

//NAVIGATION
nav.setAttribute('class', 'nav nav__no-margin row');    
nav2 = document.createElement('nav');
body.children[0].insertBefore(nav2, nav.nextSibling);
nav2.setAttribute('class', 'nav row');
const nav2List = document.createElement('ul');
nav2List.setAttribute('class', 'nav-list')
nav2.append(nav2List);

const plotList = document.createElement('li');
plotList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
const plotLink = document.createElement('a');
plotLink.setAttribute('class', 'link');
plotLink.setAttribute('href', './angry-men');
plotList.append(plotLink);
plotLink.append(document.createTextNode('Plot'));
const castList = document.createElement('li');
castList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
const castLink = document.createElement('a');
castLink.setAttribute('class', 'link');
castLink.setAttribute('href', '/angry-men/cast');
castList.append(castLink);
castLink.append(document.createTextNode('Cast'));
const adapList = document.createElement('li');
adapList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
const adapLink = document.createElement('a');
adapLink.setAttribute('class', 'link');
adapLink.setAttribute('href', '/angry-men/adaptations');
adapList.append(adapLink);
adapLink.append(document.createTextNode('Adaptations'));
const awarList = document.createElement('li');
awarList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
const awarLink = document.createElement('a');
awarLink.setAttribute('class', 'link');
awarLink.setAttribute('href', '/angry-men/awards');
awarList.append(awarLink);
awarLink.append(document.createTextNode('Awards'));
const tranList = document.createElement('li');
tranList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
const tranLink = document.createElement('a');
tranLink.setAttribute('class', 'link');
tranLink.setAttribute('href', '/angry-men/transcripts');
tranList.append(tranLink);
tranLink.append(document.createTextNode('Transcripts'));
const reviList = document.createElement('li');
reviList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
const reviLink = document.createElement('a');
reviLink.setAttribute('class', 'link');
reviLink.setAttribute('href', '/angry-men/reviews');
reviList.append(reviLink);
reviLink.append(document.createTextNode('Reviews'));
const infoList = document.createElement('li');
infoList.setAttribute('class', 'nav__field navigation-list--two-row navigation-list--one-row');
const infoLink = document.createElement('a');
infoLink.setAttribute('class', 'link');
infoLink.setAttribute('href', './info?id=0');
infoList.append(infoLink);
infoLink.append(document.createTextNode('Info'));

nav2List.append(plotList, castList, adapList, awarList, tranList, reviList, infoList,);
