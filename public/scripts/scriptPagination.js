
const paginatedList = document.getElementById("paginated-list");

let pageNumber = 1;
let pageSize = 10;

loadMovies();

function loadMovies() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/ajax/movies?page=${pageNumber}&pageSize=${pageSize}`);
  xhr.onload = function() {
    if (xhr.status === 200 && xhr.readyState == 4) {
      const movies = JSON.parse(xhr.responseText);
      renderMovies(movies);
      pageNumber++;
    }
  };
  xhr.send();
};

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
    if (movies[i].movieID === 0) {
      location = './angry-men';
    } else {
      location = `info?id=${movies[i].movieID}`;
    }
    btnPag.addEventListener('click', function() {
      window.location = location;
    });
  }
}

window.addEventListener('scroll', function() {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    loadMovies();
  }
});