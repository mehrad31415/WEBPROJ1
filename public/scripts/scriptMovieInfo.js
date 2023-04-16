//Javascript

fetch('/info/fetch' + window.location.search)
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    if (!data) {
      throw new Error('Movie data not found in server response');
    }

    const movie = new Object(data.movie);
    const artists = data.artists;
    const stringSchedule = data.schedule;
    const schedule = [];

    for (let i = 0; i < stringSchedule.length; i++){
        schedule.push(new Date(stringSchedule[i].date.replace(' ', 'T')));
    }

    // console.log(movie);
    constructMovieInfo(movie, artists, schedule);

  })
  .catch(error => {
    console.error(error);
  });


function constructMovieInfo (movie, artists, schedule){
    // console.log('construct movie method');
    let id = movie.movieID;

    const currentMovie = new Movie(movie.movieID, movie.movieName, movie.movieYear, movie.movieGenre);
    currentMovie.movieLink = movie.movieLink;
    currentMovie.posterLink = movie.posterLink;
    currentMovie.trailerLink = movie.trailerLink;
    currentMovie.movieAbout.push(movie.movieAbout.replaceAll('???', '"').replaceAll('@@@', '\n'));
    currentMovie.moviePlot.push(movie.moviePlot.replaceAll('???', '"').replaceAll('@@@', '\n'));

    constructArtists (currentMovie, artists);
    constructPage (currentMovie, schedule, id);
    addAngryMenScript (id);
}



function constructArtists (movie, artists){
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
        // console.log("artist added to movie...");
        artistTemp.addToMovie(movie);
        artistTemp.toTooltip();
    }
}

function constructPage(movie, schedule, id){
    const container = document.getElementsByClassName("body__container")[0];
    const article = document.createElement("article");
    container.appendChild(article);
    article.setAttribute("class", "article-block");
    if (!checkLogIn){
        article.append(document.createTextNode('You are unable to purchase tickets for ' + movie.movieName + '. Please log in with the button above.'));
    } else {
        article.append(document.createTextNode('Purchase your tickets for ' + movie.movieName + ' now:  '));
        for (let i = 0; i < schedule.length; i++){
            const purchaseBtn = document.createElement('button');
            purchaseBtn.classList = "purchase-button";
            purchaseBtn.append(document.createTextNode(schedule[i].toLocaleString()));
            article.append(purchaseBtn);
            purchaseBtn.addEventListener("click", goToTickets.bind(null, movie.movieID, schedule[i]));
        }
    }
    movie.addAllToPage(id);
}

function addAngryMenScript (id) {
    if (id == 0) {
        const infoScript = document.createElement('script');
        infoScript.setAttribute('src', '../scripts/scriptAngryMen.js');
        body.append(infoScript);
    }
}

function goToTickets(id, dayTime) {
    window.location =   'tickets' + 
                        '?id=' + id +
                        '&date=' + dayTime.getFullYear() + '-' + (dayTime.getMonth()+1) + '-' + dayTime.getDate() +
                        '&time=' + dayTime.getHours() + '-' + dayTime.getMinutes() + '-' + dayTime.getSeconds();
}