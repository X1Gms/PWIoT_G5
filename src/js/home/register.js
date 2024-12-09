import { validator } from "../utils/validation.js";
import { FormError } from "../utils/errors.js";
import { G5Fetch, setSessionWithExpiry } from "../../../index.js";

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

  const passwordHasError = validator.password(password);

  if (!validator.name(name)) {
    error.show("Invalid Name");
    return;
  } else if (!validator.email(email)) {
    error.show("Invalid Email");
    return;
  } else if (!validator.required(password)) {
    error.show("Password is required");
    return;
  } else if (!validator.required(confirmPassword)) {
    error.show("Confirm Password is required");
    return;
  } else if (!confirmTerms) {
    error.show("Please accept the terms!");
    return;
  } else if (passwordHasError) {
    error.show(passwordHasError);
    return;
  } else if (password !== confirmPassword) {
    error.show("Confirm password must be equal to password");
    return;
  } else {
    // Prepare data for the request as a JavaScript object
    const obj = {
      name: name,
      email: email,
      password: password,
    };

    G5Fetch(
      "http://localhost:80/register.php",
      "POST",
      {
        "Content-Type": "application/json",
      },
      obj
    )
      .then((data) => {
        if (data.success === "1") {
          setSessionWithExpiry({
            email: obj.email,
            password: obj.password,
            role: data.role,
            id: data.id,
          });
          window.location.href = "/src/pages/home/welcome.html";
        } else {
          error.show(data.message || "An error occurred. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        error.show("Something went wrong. Please try again later.");
      });
  }
});
