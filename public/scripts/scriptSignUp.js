
if (swtch == 1){
  setTimeout(function () {
    alert('this account already exists');
  }, 10);
}

document.querySelector('.sign-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const pass = document.querySelector('#password').value;
  const confirm = document.querySelector('#confirmation').value;
  // console.log(pass)
  // console.log(confirm)
  if (pass === confirm) {
    event.target.submit();
  } else {
    alert("your passwords should match!");
  }
});