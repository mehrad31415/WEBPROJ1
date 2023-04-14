//Javascript

//Confirmation basics
const summaryForm = document.getElementsByClassName('movie-summary')[0];
const movieSel = document.getElementById('movie-title');
const dateTimeSel = document.getElementById('timeslot');
const ticketsSel = document.getElementById('num-tickets');
const movieNew = document.getElementsByName('movieTitle')[0];
const dateTimeNew = document.getElementsByName('timeslot')[0];
const ticketsNew = document.getElementsByName('numTickets')[0];
const btnConfirm = document.getElementsByName("confirm")[0];
const btnCancel = document.getElementsByName("cancel")[0];


//base-page
const movie = JSON.parse(ejsMovie);
const date = ejsDate.split('-');
const time = ejsTime.split('-');
const dateTime = new Date(date[0], date[1]-1, date[2], time[0], time[1], time[2]);
const currentSchedule = JSON.parse(ejsSchedule);
let newOrderID = JSON.parse(ejsOrderAll);
const schedule = [];
for (let i = 0; i < currentSchedule.length; i++){
    schedule.push({movieID: currentSchedule[i].movie_id, date: new Date(currentSchedule[i].date.replace(' ', 'T'))});
}
const article = document.getElementsByClassName("article-block")[0];

//!!checks!!
const checkSchedule = (function() {
    const filter = {movieID: movie.movieID, date: dateTime}
    for (let i =0; i < schedule.length; i++){
        if (schedule[i].movieID == filter.movieID && schedule[i].date.toString() == filter.date.toString()) return true;
    }
    return false;
})();

console.log(checkSchedule);

if (!checkSchedule){
    article.append(document.createTextNode('The selected timeslot does not correspond with the movie ' + movie.movieName + '. Please try again'));
} else {
    if (!checkLogIn){
        article.append(document.createTextNode('You are unable to purchase tickets for ' + movie.movieName + '. Please log in with the button above.'));
    } else {
        const par = document.createElement('p');
        article.append(par);
        const strongLink = document.createElement('STRONG');
        const link = document.createElement('a');
        link.setAttribute("class", "link--decoration");
        link.setAttribute("href", "./contact");
        link.setAttribute("target", "_blank");
        strongLink.appendChild(link);
        link.append(document.createTextNode('contact us'));
        par.append(document.createTextNode('You are about to purchase tickets for the movie \'' + movie.movieName + '\' for ' + dateTime.toLocaleString() + '. Are you certain this is what you want? You should be aware of our prices. The price for the selected movie at the selected timeslot is: €0,00. If this is in conflict with what you believe in, please '), strongLink, document.createTextNode('. If you do want to purchase these tickets for this price, enter the ammount of tickets you want and click the button below:'));
        
        const ammount = document.createElement('input');
        ammount.placeholder = 'ammount between 1 & 9';
        ammount.type = 'number';
        ammount.addEventListener('change', function () {
            if (ammount.value > 9) ammount.value = 9;
            if (ammount.value < 1) ammount.value = 1;
            ticketsSel.append(document.createTextNode(ammount.value));
            ticketsNew.value = ammount.value;
            changeOrderCookie();
        });
        
        const btnPur = document.createElement("button");
        article.append(ammount, btnPur);
        btnPur.setAttribute('class', 'purchase-item__button');
        btnPur.append(document.createTextNode("Purchase tickets for '" + movie.movieName + " ("+ movie.movieYear +")' at " + dateTime.toLocaleString() + " local time."));
        btnPur.addEventListener("click", function () {
            if (ammount.value > 0){
                summaryForm.style.display = "block";
            }
        });
    }
}

//confirmation
movieSel.append(document.createTextNode(movie.movieName));
dateTimeSel.append(document.createTextNode(dateTime.toLocaleString()));
ticketsNew.addEventListener('change', function () {
    if (ticketsNew.value > 9) ticketsNew.value = 9;
    if (ticketsNew.value < 1) ticketsNew.value = 1;
});
//movie options
//get movies from cookies
let movies = [];
for (let i = 0; i < cookies.length; i++){
    if (cookies[i].substring(0, 6) == "movies") {
        movies = JSON.parse(decodeURI(cookies[i].slice(7)).replaceAll('%3A', ':').replaceAll('%2C', ','));
        delete_cookie('movies');
    }
}

//add movies to options
for (i = 0; i < movies.length; i++) {
    const option =  document.createElement('option');
    option.value = movies[i].movieID;
    if (movies[i].movieName == movie.movieName) option.selected = true;
    option.append(document.createTextNode(movies[i].movieName));
    movieNew.append(option);
}


//add timeslots to options
getSchedule(movieNew.value);

movieNew.addEventListener('change', () => {
    console.log("movie changed");
    getSchedule(movieNew.value);
});

function getSchedule(currentMovie) {
    while (dateTimeNew.firstChild) {
        dateTimeNew.removeChild(dateTimeNew.firstChild);
    }

  // Get the selected movie ID
  const movieId = currentMovie;

  // Send an AJAX request to retrieve the available timeslots
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/ajax/timeslots?movieId=${movieId}`, true);
  xhr.onload = () => {
    if (xhr.status === 200 && xhr.readyState===4) {
      const timeslots = JSON.parse(xhr.responseText);

      addTimeslots(timeslots);
      console.log(timeslots);
    } else {
      console.error('Failed to retrieve timeslots');
    }
  };
  xhr.send();
}

function addTimeslots(timeslots){
    for (i = 0; i < timeslots.length; i++) {
        const option =  document.createElement('option');
        const date = new Date(timeslots[i].date);
        option.value = date.toISOString();
        if (timeslots[i].date == dateTime) option.selected = true;
        option.append(document.createTextNode(date.toLocaleString()));
        dateTimeNew.append(option);
    }
}

//make buttons work
btnConfirm.addEventListener("click", function () {
    if (ticketsNew.value > 0){
        window.location.href = 'pur';
        newOrder = {
            order_id: newOrderID,
            user_id: userID,
            movie_id: movieNew.value, 
            date: dateTimeNew.value,
            ammount: ticketsNew.value,
        }
        console.log(JSON.stringify(newOrder));
        document.cookie = 'newOrder=' + JSON.stringify(newOrder) + '; path=/pur';
    }
    return false;
});

btnCancel.addEventListener("click", function () {
    summaryForm.style.display = "none";
});

//check for unfinished order
if (newOrder != null) {
    newOrderID = newOrder.order_id;
    movieNew.value = newOrder.movie_id; 
    dateTimeNew.value = newOrder.date;
    ticketsNew.value = newOrder.ammount;
    summaryForm.style.display = "block";
} else {
    newOrder = {
        order_id: newOrderID,
        user_id: userID,
        movie_id: movieNew.value, 
        date: dateTime.toISOString(),
        ammount: 2
    }
    document.cookie = 'newOrder=' + JSON.stringify(newOrder) + '; path=/';
}



movieNew.onchange = function (){changeOrderCookie()};
dateTimeNew.onchange = function (){changeOrderCookie()};
ticketsNew.onchange = function (){changeOrderCookie()};

function changeOrderCookie() {
    delete_cookie(newOrder);
    newOrder = {
        order_id: newOrderID,
        user_id: userID,
        movie_id: movieNew.value, 
        date: dateTimeNew.value,
        ammount: ticketsNew.value
    }
    document.cookie = 'newOrder=' + JSON.stringify(newOrder) + '; path=/';
}