//Javascript

let movieArray = [];
const movie = JSON.parse(ejsMovie);
const artists = JSON.parse(ejsArtists);
const stringSchedule = JSON.parse(ejsSchedule);
const schedule = [];
for (let i = 0; i < stringSchedule.length; i++){
    schedule.push(new Date(stringSchedule[i].date.replace(' ', 'T')));
}
const checkLogin = true;


//console.log(artists);
let id = movie.movieID;

const currentMovie = new Movie(movie.movieID, movie.movieName, movie.movieYear, movie.movieGenre);
currentMovie.movieLink = movie.movieLink;
currentMovie.posterLink = movie.posterLink;
currentMovie.trailerLink = movie.trailerLink;
currentMovie.movieAbout.push(movie.movieAbout.replaceAll('???', '"').replaceAll('@@@', '\n'));
currentMovie.moviePlot.push(movie.moviePlot.replaceAll('???', '"').replaceAll('@@@', '\n'));



for (let i = 0; i < artists.length; i++){
    const artistTemp = new Artists(
        artists[i].artistName,
        artists[i].artistYearBirth,
        artists[i].artistYearDeath,
        artists[i].artistLink);
    artistTemp.role = artists[i].artistRole.toLowerCase();
    artistTemp.info = artists[i].artistInfo.replaceAll('???', '"').replaceAll('@@@', '\n');
    arrayTemp = artists[i].artistArray.split(',');
    for (let j = 0; j < arrayTemp.length; j++){
        artistTemp.infoArray.push(arrayTemp[j]);
    }
    console.log("artist added to movie...");
    artistTemp.addToMovie(currentMovie);
    artistTemp.toTooltip();
}

//Add purchase options
const container = document.getElementsByClassName("body__container")[0];
const article = document.createElement("article");
container.appendChild(article);
article.setAttribute("class", "article-block");
if (!checkLogin){
    article.append(document.createTextNode('You are unable to purchase tickets for ' + currentMovie.movieName + '. Please log in with the button above.'));
} else {
    article.append(document.createTextNode('Purchase your tickets for ' + currentMovie.movieName + ' now:  '));
    for (let i = 0; i < schedule.length; i++){
        const purchaseBtn = document.createElement('button');
        purchaseBtn.append(document.createTextNode(schedule[i].toLocaleString()));
        article.append(purchaseBtn);
        purchaseBtn.addEventListener("click", goToTickets.bind(null, currentMovie.movieID, schedule[i]));
    }
}
currentMovie.addAllToPage();

if (id == 0) {
    const infoScript = document.createElement('script');
    infoScript.setAttribute('src', '../scripts/scriptAngryMen.js');
    body.append(infoScript);
}

function goToTickets(id, dayTime) {
    window.location =   'tickets' + 
                        '?id=' + id +
                        '&date=' + dayTime.getFullYear() + '-' + (dayTime.getMonth()+1) + '-' + dayTime.getDate() +
                        '&time=' + dayTime.getHours() + '-' + dayTime.getMinutes() + '-' + dayTime.getSeconds();
}