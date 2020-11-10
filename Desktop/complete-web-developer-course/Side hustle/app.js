var passwordCheck = document.getElementById('password').value;

if (passwordCheck < 8) {
   passwordCheck.classList.add('error')
}