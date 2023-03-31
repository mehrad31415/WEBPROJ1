//Javascript

const paginatedList = document.getElementById("paginated-list");

//!! ADD PLACEHOLDERS JUST TO ILLUSTRATE THE PAGINATION. IN THIS PART WILL THE DATABASE BE IMPLEMENTED !!
const itemAngryMen = document.createElement("li");
itemAngryMen.setAttribute('class', 'paginated-item');
const btnAngryMen = document.createElement("button");
itemAngryMen.append(btnAngryMen);
btnAngryMen.setAttribute('class', 'paginated-item__button');
btnAngryMen.append(document.createTextNode('Placeholder for Movie 12 Angry Men'));
paginatedList.append(itemAngryMen);
btnAngryMen.addEventListener("click", function () {
  window.location = "plot-AM";
});

for (let i = 1; i < 50; i++){
  const itemPag = document.createElement("li");
  itemPag.setAttribute('class', 'paginated-item');
  const btnPag = document.createElement("button");
  itemPag.append(btnPag);
  btnPag.setAttribute('class', 'paginated-item__button');
  btnPag.append(document.createTextNode('Placeholder for Movie '+i));
  paginatedList.append(itemPag);
  btnPag.addEventListener("click", function () {
    window.location = "info?id="+i;
  });
}

//Constants
const paginationNumbers = document.getElementById("pagination-numbers");
const listItems = paginatedList.querySelectorAll("li");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const paginationLimit = 10;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

//Add buttons
const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

//check buttonstatus
const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

//set active page
const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

//Append page numbers
const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);

  paginationNumbers.appendChild(pageNumber);
};

//get and set pagination numbers
const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();
  
  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
};

//Add event listners
window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});