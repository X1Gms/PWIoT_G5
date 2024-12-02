import { validator } from "../utils/validation.js";
import { FormError } from "../utils/errors.js";

const form = document.querySelector("#login-form");

const users = [
  {
    email: "flavio@gmail.com",
    password: "pass123",
  },
  {
    email: "gui@gmail.com",
    password: "amIGui",
  },
];

const errorElement = document.querySelector(".validation-error");

const error = FormError(errorElement);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  error.hide();

  const formData = new FormData(form);

  const email = formData.get("email");
  const password = formData.get("password");

  const isValidEmail = validator.email(email);
  const isValidPassword = validator.required(password);

  if (!isValidEmail) {
    error.show("Invalid Email");
    return;
  }

  if (!isValidPassword) {
    error.show("Required Password");
    return;
  }

  // const userExists = users.find(function (user) {
  //   return user.email === email;
  // });

  // if (!userExists || password !== userExists.password) {
  //   error.show("Invalid Credentials");
  //   return;
  // }

  error.hide();

  window.location.href = "/src/pages/dashboard/home.html";
});
