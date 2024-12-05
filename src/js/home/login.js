import { validator } from "../utils/validation.js";
import { FormError } from "../utils/errors.js";

const form = document.querySelector("#login-form");
const errorElement = document.querySelector(".validation-error");
const error = FormError(errorElement);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  error.hide();

  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");

  // Validação dos campos de email e password
  if (!validator.email(email)) {
    error.show("Invalid Email");
    return;
  }

  if (!validator.required(password)) {
    error.show("Password is required");
    return;
  }

  // Enviar os dados para o servidor para verificação
  const data = {
    email: email,
    password: password,
  };

  fetch("http://localhost/login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Enviar dados como JSON
    },
    body: JSON.stringify(data), // Converter objeto para JSON string
  })
    .then((response) => response.json()) // Parse JSON da resposta do servidor
    .then((data) => {
      if (data.success === "1") {
        // Login bem-sucedido, redireciona para a página apropriada
        window.location.href = data.redirect;
      } else {
        // Mostrar mensagem de erro retornada pelo servidor
        error.show(data.message || "Invalid Credentials");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      error.show("Something went wrong. Please try again later.");
    });
});
