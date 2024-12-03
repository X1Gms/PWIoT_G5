import { validator } from "../utils/validation.js";
import { FormError } from "../utils/errors.js";

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
const form = document.querySelector("body > main > div.login-form > form");
const errorElement = document.querySelector(".validation-error");
const error = FormError(errorElement);

form?.addEventListener("submit", function (event) {
  event.preventDefault();
  error.hide();

  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const passwd = formData.get("password");
  const newpasswd = formData.get("new-password");
  const newPwdHasError = validator.password(newpasswd);
  let pessoa ={
    name: name,
    email: email,
    password: passwd
  }
  if (!validator.name(name)) {
    error.show("Invalid Name");
    return;
  }
  if (!validator.email(email)) {
    error.show("Invalid Email");
    return;
  }
  if (!validator.required(passwd)) {
    error.show("Password is required");
    return;
  }
  if (newpasswd && newPwdHasError) {
      error.show("New password doesnt meet the criteria");
      return;
  }
  if(newpasswd) pessoa.new_password = newpasswd;
  console.log(pessoa);

});

function showError(isError = false) {
  const svg = document.getElementById("error-context");
  const form = document.getElementById("form-holder");
  form.style.display = "none";
  const p = document.getElementById("title-error-box");
  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  const error_box = document.getElementById("error-box");
  error_box.style.display = "flex";

  const svgError = "../../../../public/imgs/others/error.svg";
  const svgSuccess = "../../../../public/imgs/others/success.svg";

  p.innerHTML =
    isError === false ? "Change made sucessfuly!" : "Change got errrors!";
  svg.setAttribute("src", isError === false ? svgSuccess : svgError);
}

/* Validate clothes Form */
const clothesForm = document.querySelector("#clothForm");

clothesForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(clothesForm);

  const clothName = formData.get("jacket-name");
  const weather = formData.get("weather-type");

  if (!isNameValid(clothName)) {
    showError(true);
    clothesForm.reset();
    return;
  }

  showError();
  document.querySelector("#clothForm").submit();
});

function ChangeClothes() {
  let fileH = document.getElementById("fileH");
  fileH.click();
  const formimgcloth = document.getElementById("form-cloth-img");

  fileH.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader = new FileReader();

      reader.onload = function (e) {
        formimgcloth.src = e.target.result;
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image.");
    }
  });
}
