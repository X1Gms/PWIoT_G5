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

form?.addEventListener('submit', function(event) {

  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const passwd = document.getElementById("password").value;
  const newpasswd = document.getElementById("new-password").value;


  if(!isNameValid(name)) {triggerError();}
  else if(!isEmailValid(email)) {triggerError();}
  else if(!isPassowrdValid(passwd)) {triggerError();}
  else if(newpasswd) {if(!isNewPasswordValid(passwd, newpasswd)) triggerError(); else{
    let pessoa = { name : name, email : email, passwd : passwd,newpasswd : newpasswd }; triggerSuccess(pessoa,form);
  }}
  else if(!newpasswd){ let pessoa = { name : name, email : email, passwd : passwd }; triggerSuccess(pessoa,form);}
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

function triggerSuccess(pessoa,form){
  let k = document.getElementById("error");
  k.style.display = "flex";
  k.className = "green";
  let l = document.getElementById("error-paragraph");
  l.innerHTML = "Dados válidos, atualizações feitas";
  console.log(pessoa)
  form.submit();
}




function showError(isError = false){
  const svg = document.getElementById("error-context");
  const form = document.getElementById("form-holder");
  form.style.display = 'none';
  const p = document.getElementById("title-error-box");
  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  const error_box = document.getElementById("error-box");
  error_box.style.display = 'flex';

  const svgError = "../../../../public/imgs/others/error.svg"
  const svgSuccess = "../../../../public/imgs/others/success.svg";
  
  p.innerHTML = isError === false ? "Change made sucessfuly!" : "Change got errrors!";
  svg.setAttribute("src", isError === false ? svgSuccess : svgError);
}

function ShowForm(){
  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  
}

/* Validate clothes Form */
const clothesForm = document.querySelector("#clothForm");

clothesForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(clothesForm)

  const clothName = formData.get("jacket-name")
  const weather = formData.get("weather-type")

   if (!isNameValid(clothName)) {
    showError(true);
    clothesForm.reset();
    return;
  }

  showError();
  document.querySelector("#clothForm").submit();
})
// clothesForm.addEventListener('submit', function(event) {
//   event.preventDefault();

//   console.log(clothesForm)

//   const formData = new FormData(clothesForm)

//   const clothName = formData.get("jacket_name")

//   console.log(clothName)

//   if (!isNameValid(clothName)) {
//     showError(true);
//     event.reset();
//     return;
//   }

//   showError();
//   event.submit();
// });


function ChangeClothes(){
  let fileH = document.getElementById("fileH");
  fileH.click();
  const formimgcloth = document.getElementById("form-cloth-img");

  fileH.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();

      reader.onload = function(e) {
        formimgcloth.src = e.target.result;
      };

      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image.');
    }
  });

}