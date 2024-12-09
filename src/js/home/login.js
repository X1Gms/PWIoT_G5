import { validator } from "../utils/validation.js";
import { FormError } from "../utils/errors.js";
import { G5Fetch, setSessionWithExpiry } from "../../../index.js";

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
  const obj = {
    email: email,
    password: password,
  };

  G5Fetch(
    "http://localhost:80/login.php",
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
        // Login bem-sucedido, redireciona para a página apropriada
        window.location.href = "/src/pages/dashboard/home.html";
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
