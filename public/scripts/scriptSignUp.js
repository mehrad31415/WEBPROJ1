document.querySelector('.submit-btn').addEventListener('submit', (event) => {
  event.preventDefault();
  const pass = document.querySelector('#password').value;
  const confirm = document.querySelector('#confirmation').value;
  console.log(pass)
  console.log(confirm)
  if (pass === confirm) {
    form.submit();
    //document.querySelector('.submit-btn').disabled = false;
  } else {
    alert("your passwords should match!");
  }
});