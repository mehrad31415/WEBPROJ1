const orderUnfCookies = cookies.filter(cookie => cookie.startsWith('orderUnf'));
const container = document.createElement('div');

// Loop through the order cookies and create elements for each order
orderUnfCookies.forEach(cookie => {
    const order = JSON.parse(decodeURIComponent(cookie.split('=')[1]));

    // Create elements
    const orderElement = document.createElement('div');
    orderElement.classList.add('order');
    const movieIdElement = document.createElement('p');
    movieIdElement.textContent = `Movie: ${order.movie_id.split(';;')[1]}`;
    orderElement.appendChild(movieIdElement);
    const dateElement = document.createElement('p');
    dateElement.textContent = `Date and Time: ${order.date.replace('T', ', ').replace('Z', '').slice(0, -7)}`;
    orderElement.appendChild(dateElement);
    const amountElement = document.createElement('p');
    amountElement.textContent = `Amount: ${order.amount}`;
    orderElement.appendChild(amountElement);
    const cancelButton = document.createElement('button');
    cancelButton.classList = "purchase-button";
    cancelButton.textContent = 'Cancel Order';
    cancelButton.addEventListener('click', () => {
        delete_cookie(cookie);
        container.removeChild(orderElement);
    });
        orderElement.appendChild(cancelButton);
        const goToOrderButton = document.createElement('button');
        goToOrderButton.classList = "purchase-button";
        goToOrderButton.textContent = 'Go to Order';
        goToOrderButton.addEventListener('click', () => {
            const dayTime = new Date(order.date);
            window.location.href =  'tickets' + 
                                    '?id=' + order.movie_id.split(';;')[0] +
                                    '&date=' + dayTime.getFullYear() + '-' + (dayTime.getMonth()+1) + '-' + dayTime.getDate() +
                                    '&time=' + dayTime.getHours() + '-' + dayTime.getMinutes() + '-' + dayTime.getSeconds() +
                                    '&amount=' + order.amount;
    });
    orderElement.appendChild(goToOrderButton);
    container.appendChild(orderElement);
});

// Add container to document
const article = document.querySelector('article');
article.appendChild(container);
