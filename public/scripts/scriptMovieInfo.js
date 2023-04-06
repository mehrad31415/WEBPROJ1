//Javascript

let movieArray = [];
const movie = JSON.parse(ejsMovie);
const artists = JSON.parse(ejsArtists);
const stringSchedule = JSON.parse(ejsSchedule);
const schedule = [];
for (let i = 0; i < stringSchedule.length; i++){
    schedule.push(new Date(stringSchedule[i].date.replace(' ', 'T')));
}


//console.log(artists);
let id = movie.movieID;

const currentMovie = new Movie(movie.movieID, movie.movieName, movie.movieYear, movie.movieGenre);
currentMovie.movieLink = movie.movieLink;
currentMovie.posterLink = movie.posterLink;
currentMovie.trailerLink = movie.trailerLink;
currentMovie.movieSchedule = schedule;
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

movieArray.push(currentMovie);

if (page == "info") {
    let movie = movieArray.find(obj => {
        return obj.movieID == id;
    });
    movie.addAllToPage();
} 

if (id == 0) {
    const infoScript = document.createElement('script');
    infoScript.setAttribute('src', '../scripts/scriptAngryMen.js');
    body.append(infoScript);
}