const paginatedList = document.getElementById("paginated-list");

let pageNumber = 1;
let pageSize = 10;

loadMovies();
// XML request to fetch the list of movies.
function loadMovies() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/ajax/movies?page=${pageNumber}&pageSize=${pageSize}`, true);
  xhr.onload = function() {
    if (xhr.status === 200 && xhr.readyState == 4) {
      const movies = JSON.parse(xhr.responseText);
      renderMovies(movies);
      pageNumber++;
    }
  };
  xhr.send();
}

function renderMovies(movies) {
  for (let i = 0; i < movies.length; i++) {
    const itemPag = document.createElement('li');
    itemPag.setAttribute('class', 'paginated-item');
    const btnPag = document.createElement('button');
    btnPag.setAttribute('class', 'paginated-item__button');
    btnPag.appendChild(document.createTextNode(`${movies[i].movieName} (${movies[i].movieYear})`));
    itemPag.appendChild(btnPag);
    paginatedList.appendChild(itemPag);
    let location;
    // given that we wanted to use our previous 12 angry men pages we built in the first two projects,
    // we redirected our location to those pages for 12 angry men. The rest are redirected as usual.
    if (movies[i].movieID === 0) {
      location = './angry-men';
    } else {
      location = `info?id=${movies[i].movieID}`;
    }
    btnPag.addEventListener('click', function() {
      window.location.href = location;
    });
  }
}
// progressive pagination on scroll. 
window.addEventListener('scroll', function() {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    loadMovies();
  }
});