function showNavbar() {
  /* DEFAULT BODY MARGIN AND PADDING
        margin: 0 auto;
        padding: 2rem; 
    */
  // If we don't have hidden class it's because there is navbar. Otherwise navbar it's closed.
  className =
    document.querySelectorAll(".hidden").length == 0 ? "nav-context" : "hidden";
  // If navbar is hidden keep margin/padding
  const [myBody] = document.getElementsByTagName("body");
  if (className === "hidden") {
    document.getElementsByClassName("hidden")[0].className = "nav-context";
    document.getElementsByClassName("night")[0].className = "night enable";
  } else {
    document.getElementsByClassName("nav-context")[0].className = "hidden";
    document.getElementsByClassName("night")[0].className = "night";
  }
}


// Validate formulary based on user input and default criteria.
const form = document.querySelector('body > main > div.login-form > form');

form.addEventListener('submit', function(event) {

  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const passwd = document.getElementById("password").value;
  const newpasswd = document.getElementById("new-password").value;


  if(!isNameValid(name)) {triggerError();}
  else if(!isEmailValid(email)) {triggerError();}
  else if(!isPassowrdValid(passwd)) {triggerError();}
  else if(newpasswd) {if(!isNewPasswordValid(passwd, newpasswd)) triggerError(); else{
    let pessoa = { name : name, email : email, passwd : passwd,newpasswd : newpasswd }; triggerSuccess(pessoa);
  }}
  else if(!newpasswd){ let pessoa = { name : name, email : email, passwd : passwd }; triggerSuccess(pessoa);}
})

function isNameValid(someoneName) {
  const regex = /^[A-Z].*/;
  return regex.test(someoneName);
}

function isEmailValid(email) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}

function isPassowrdValid(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
}

function isNewPasswordValid(oldPassword, newPassword){
  if(!isPassowrdValid(newPassword)) return false;
  if(!isPassowrdValid(oldPassword)) return false;
  if(oldPassword === newPassword)   return false;
  return true;
}

function triggerError(){
  let k = document.getElementById("error");
  k.style.display = "flex";
  k.className = "red"
}

function triggerSuccess(pessoa){
  let k = document.getElementById("error");
  k.style.display = "flex";
  k.className = "green"
  console.log(pessoa)
}