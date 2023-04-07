//Javascript

const movie = JSON.parse(ejsMovie);
const date = ejsDate.split('-');
const time = ejsTime.split('-');
const dateTime = new Date(date[0], date[1]-1, date[2], time[0], time[1], time[2]);
const stringSchedule = JSON.parse(ejsSchedule);
const newOrderID = JSON.parse(ejsOrderAll).lenght;
const schedule = [];
for (let i = 0; i < stringSchedule.length; i++){
    schedule.push({movieID: stringSchedule[i].movie_id, date: new Date(stringSchedule[i].date.replace(' ', 'T'))});
}
const article = document.getElementsByClassName("article-block")[0];

//!!checks!!
const checkLogin = true; //This should be replaced with the actual code to check for login
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
    if (!checkLogin){
        article.append(document.createTextNode('You are unable to purchase tickets for ' + movie.movieName + '. Please log in with the button above.'));
    } else {
        //get user_id:
            userID = 0;

        const par = document.createElement('p');
        article.append(par);
        const strongLink = document.createElement('STRONG');
        const link = document.createElement('a');
        link.setAttribute("class", "link--decoration");
        link.setAttribute("href", "contact");
        link.setAttribute("target", "_blank");
        strongLink.appendChild(link);
        link.append(document.createTextNode('contact us'));
        par.append(document.createTextNode('You are about to purchase tickets for the movie \'' + movie.movieName + '\' for ' + dateTime.toLocaleString() + '. Are you certain this is what you want? You should be aware of our prices. The price for the selected movie at the selected timeslot is: €0,00. If this is in conflict with what you believe in, please '), strongLink, document.createTextNode('. If you do want to purchase these tickets for this price, enter the ammount of tickets you want and click the button below:'));
        
        const ammount = document.createElement('input');
        ammount.placeholder = 'ammount between 1 & 5';
        ammount.type = 'number';
        ammount.addEventListener('change', function () {
            if (ammount.value > 5) ammount.value = 5;
            if (ammount.value < 1) ammount.value = 1;
        });
        
        const btnPur = document.createElement("button");
        article.append(ammount, btnPur);
        btnPur.setAttribute('class', 'purchase-item__button');
        btnPur.append(document.createTextNode("Purchase tickets for '" + movie.movieName + " ("+ movie.movieYear +")' at " + dateTime.toLocaleString() + " local time."));
        btnPur.addEventListener("click", function () {
            if (ammount.value > 0){
                window.location = 'account';
                document.cookie = 
                    'newOrder={'
                    + 'order_id:' + newOrderID 
                    + 'user_id:' + userID 
                    + 'movie_id:' + movie.movieID 
                    + 'date:' + dateTime.toString()
                    + 'ammount:' + ammount.value
                    + '; path=/account';
            }
        });
    }
}