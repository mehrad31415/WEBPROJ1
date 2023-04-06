


const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
});


let isLoggedIn = false;
function canBuyTicket(isLoggedIn) {
  if (isLoggedIn) {
    return true;
  } else {
    return false;
  }
}
