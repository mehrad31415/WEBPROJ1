//Javascript

fetch('/tickets/fetch' + window.location.search)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (!data) {
      throw new Error('Movie data not found in server response');
    }
    // { allMovies, movie, schedule, orderAll, date, time, amount}
    const movie = new Object(data.movie);
    const currentSchedule = data.schedule;
    const schedule = [];
    for (let i = 0; i < currentSchedule.length; i++){
        schedule.push({movieID: currentSchedule[i].movie_id, date: new Date(currentSchedule[i].date.replace(' ', 'T'))});
    }
    const orderAll = data.orderAll;
    console.log(data.date);
    const dateTemp = data.date;
    const date = dateTemp.split('-');
    const timeTemp = data.time;
    const time = timeTemp.split('-');
    const amountFetch = data.amount;
    const dateTime = new Date(date[0], date[1]-1, date[2], time[0], time[1], time[2]);
    const allMovies = data.allMovies

    constructPage(allMovies, movie, schedule, orderAll, dateTime, amountFetch)

  })
  .catch(error => {
    console.error(error);
  });

function constructPage(allMovies, movie, schedule, orderAll, dateTime, amountFetch){
    //Constants, because somehow fetch will not let me access constants outside of the (callback)function
const summaryForm = document.getElementsByClassName('movie-summary')[0];
const movieSel = document.getElementById('movie-title');
const dateTimeSel = document.getElementById('timeslot');
const ticketsSel = document.getElementById('num-tickets');
const movieNew = document.getElementsByName('movieTitle')[0];
const dateTimeNew = document.getElementsByName('timeslot')[0];
const ticketsNew = document.getElementsByName('numTickets')[0];
const btnConfirm = document.getElementsByName("confirm")[0];
const btnCancel = document.getElementsByName("cancel")[0];
const article = document.getElementsByClassName("article-block")[0];
let newOrderID = orderAll
let newOrder = null;
//!!checks!!
const checkSchedule = (function() {
    const filter = {movieID: movie.movieID, date: dateTime}
    for (let i =0; i < schedule.length; i++){
        if (schedule[i].movieID == filter.movieID && schedule[i].date.toString() == filter.date.toString()) return true;
    }
    return false;
})();

constructBasePage(movie, dateTime, checkSchedule, amountFetch, summaryForm, ticketsSel, ticketsNew, article);
constructConfirmationWindow(movie, dateTime, movieSel, dateTimeSel, dateTimeNew, ticketsNew, movieNew, allMovies);
EventListeners (btnConfirm, btnCancel, newOrderID, userID, movieNew, dateTimeNew, ticketsNew, summaryForm, movie, dateTime);

}

function constructBasePage(movie, dateTime, checkSchedule, amountFetch, summaryForm, ticketsSel, ticketsNew, article) {
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
            link.setAttribute("href", "contact");
            link.setAttribute("target", "_blank");
            strongLink.appendChild(link);
            link.append(document.createTextNode('contact us'));
            par.append(document.createTextNode('You are about to purchase tickets for the movie \'' + movie.movieName + '\' for ' + dateTime.toLocaleString() + '. Are you certain this is what you want? You should be aware of our prices. The price for the selected movie at the selected timeslot is: €0,00. If this is in conflict with what you believe in, please '), strongLink, document.createTextNode('. If you do want to purchase these tickets for this price, enter the amount of tickets you want and click the button below:'));
            
            const amount = document.createElement('input');
            amount.placeholder = 'amount between 1 & 9';
            amount.type = 'number';
            if (amountFetch != null) {
                amount.value = amountFetch;
            }
            amount.addEventListener('change', function () {
                if (amount.value > 9) amount.value = 9;
                if (amount.value < 1) amount.value = 1;
                ticketsNew.value = amount.value;
            });
            
            const btnPur = document.createElement("button");
            article.append(amount, btnPur);
            btnPur.setAttribute('class', 'purchase-item__button');
            btnPur.append(document.createTextNode("Purchase tickets for '" + movie.movieName + " ("+ movie.movieYear +")' at " + dateTime.toLocaleString() + " local time."));
            btnPur.addEventListener("click", function () {
                if (amount.value > 0){
                    ticketsNew.value = amount.value;
                    summaryForm.style.display = "block";
                    ticketsSel.append(document.createTextNode(amount.value));
                }
            });
        }
    }
}

function constructConfirmationWindow(movie, dateTime, movieSel, dateTimeSel, dateTimeNew, ticketsNew, movieNew, allMovies){
    movieSel.append(document.createTextNode(movie.movieName));
    dateTimeSel.append(document.createTextNode(dateTime.toLocaleString()));
    ticketsNew.addEventListener('change', function () {
        if (ticketsNew.value > 9) ticketsNew.value = 9;
        if (ticketsNew.value < 1) ticketsNew.value = 1;
    });
    //movie options
    //get movies from cookies
    // let movies = [];
    // for (let i = 0; i < cookies.length; i++){
    //     if (cookies[i].substring(0, 6) == "movies") {
    //         movies = JSON.parse(decodeURI(cookies[i].slice(7)).replaceAll('%3A', ':').replaceAll('%2C', ','));
    //         delete_cookie('movies');
    //     }
    // }

    //add movies to options
    for (i = 0; i < allMovies.length; i++) {
        const option =  document.createElement('option');
        option.value = allMovies[i].movieID+ ';;' + allMovies[i].movieName;
        if (allMovies[i].movieName == movie.movieName) option.selected = true;
        option.append(document.createTextNode(allMovies[i].movieName));
        movieNew.append(option);
    }


    //add timeslots to options
    getSchedule(movieNew.value.split(';;')[0], dateTimeNew, dateTime);

    movieNew.addEventListener('change', () => {
        console.log("movie changed");
        getSchedule(movieNew.value.split(';;')[0], dateTimeNew, dateTime);
    });
}

function getSchedule(currentMovie, dateTimeNew, dateTime) {
    while (dateTimeNew.firstChild) {
        dateTimeNew.removeChild(dateTimeNew.firstChild);
    }

  // Get the selected movie ID
  const movieId = currentMovie;

  // Send an AJAX request to retrieve the available timeslots
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/ajax/timeslots?movieId=${movieId}`, true);
  xhr.onload = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      const timeslots = JSON.parse(xhr.responseText);

      addTimeslots(timeslots, dateTime, dateTimeNew);
      console.log(timeslots);
    } else {
      console.error('Failed to retrieve timeslots');
    }
  };
  xhr.send();
}

function addTimeslots(timeslots, dateTime, dateTimeNew){
    for (i = 0; i < timeslots.length; i++) {
        const option =  document.createElement('option');
        const date = new Date(timeslots[i].date);
        option.value = date.toISOString();
        if (timeslots[i].date == dateTime) option.selected = true;
        option.append(document.createTextNode(date.toLocaleString()));
        dateTimeNew.append(option);
    }
}

function EventListeners (btnConfirm, btnCancel, newOrderID, userID, movieNew, dateTimeNew, ticketsNew, summaryForm, movie, dateTime) {
    btnConfirm.addEventListener("click", function () {
        if (ticketsNew.value > 0){
            window.location.href = 'pur';
            const newOrder = {
                order_id: newOrderID,
                user_id: userID,
                movie_id: movieNew.value.split(';;')[0], 
                date: dateTimeNew.value,
                amount: ticketsNew.value,
            }
            console.log(JSON.stringify(newOrder));
            document.cookie = 'newOrder=' + JSON.stringify(newOrder) + '; path=/pur';
        }
        return false;
    });
    
    btnCancel.addEventListener("click", function () {
        summaryForm.style.display = "none";
    });

    const orderUnfCookies = cookies.filter(cookie => cookie.startsWith('orderUnf'));

    // Determine the index of the next orderUnf cookie
    const nextIndex = orderUnfCookies.length + 1;

    // Set up beforeunload event listener to delete any empty orderUnf cookies
    window.addEventListener('beforeunload', () => {
    // Create orderUnf cookie
    const orderUnfCookieName = `orderUnf${nextIndex}`;
    const orderUnfCookieValue = {
    order_id: newOrderID,
    user_id: userID,
    movie_id: movieNew.value ? movieNew.value : movie.movieName,
    date: dateTimeNew.value ? dateTimeNew.value : dateTime.toISOString(),
    amount: ticketsNew.value ? ticketsNew.value : 2
    };
    const orderUnfCookieString = `${orderUnfCookieName}=${encodeURIComponent(JSON.stringify(orderUnfCookieValue))}`;
    document.cookie = orderUnfCookieString;
    cookies.forEach(cookie => {
        if (cookie.startsWith('orderUnf')) {
        const order = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
        if (!order.movie_id || !order.date || !order.amount) {
            delete_cookie(cookie);
        }
        }
    });
    });

}