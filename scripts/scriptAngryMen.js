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
