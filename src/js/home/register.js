import { validator } from "../utils/validation.js";
import { FormError } from "../utils/errors.js";

const form = document.querySelector("#register-form");

const errorElement = document.querySelector(".validation-error");

const error = FormError(errorElement);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  error.hide();

  const formData = new FormData(form);

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");
  const confirmTerms = formData.get("terms") === "on" ? true : false;

  const isValidPassword = validator.password(password);

  if (!validator.name(name)) {
    error.show("Invalid Name");
    return;
  }

  if (!validator.email(email)) {
    error.show("Invalid Email");
    return;
  }

  if (!validator.required(password)) {
    error.show("Password is required");
    return;
  }

  if (!validator.required(confirmPassword)) {
    error.show("Confirm Password is required");
    return;
  }

  if (!confirmTerms) {
    error.show("Please accept the terms!");
    return;
  }

  if (isValidPassword === "string") {
    error.show(isValidPassword);
    return;
  }

  if (password !== confirmPassword) {
    error.show("Confirm password must be equal to password");
    return;
  }

  error.hide();

  window.location.href = "/src/pages/home/welcome.html";
});
