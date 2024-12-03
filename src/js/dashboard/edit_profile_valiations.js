import { validator } from "../utils/validation.js";
import { FormError } from "../utils/errors.js";

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
      error.show(newPwdHasError);
      return;
  }
  if(newpasswd) pessoa.new_password = newpasswd;
  console.log(pessoa);

});