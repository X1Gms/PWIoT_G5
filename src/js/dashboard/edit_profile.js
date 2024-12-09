import { G5Fetch } from "../../../index.js";
import { validator } from "../utils/validation.js";

// Validate formulary based on user input and default criteria.
const form = document.querySelector("body > main > div.login-form > form");

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

form?.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = [
    {
      value: document.getElementById("name").value,
      type: document.getElementById("name").type,
      message: "Name is not Filled Properly",
    },
    {
      value: document.getElementById("email").value,
      type: document.getElementById("email").type,
      message: "Email is not Filled Properly",
    },
    {
      value: document.getElementById("password").value,
      type: document.getElementById("password").type,
      message: "Password is not Filled",
    },
  ];

  function isNewPasswordValid(oldPassword, newPassword) {
    return oldPassword !== newPassword;
  }

  function validateField(field, type) {
    switch (type) {
      case "text":
        return validator.name(field);
      case "email":
        return validator.email(field);
      case "password":
        return validator.required(field);
      case "new-password":
        return isNewPasswordValid(formData[2].value, field);
      case "password_check":
        return passwordRegex.test(field);
      default:
        return false; // Invalid type
    }
  }

  function error() {
    const checkForm = Array.isArray(formData) ? [...formData] : [];

    if (document.getElementById("new-password").value.length > 0) {
      checkForm.push(
        {
          value: document.getElementById("new-password").value,
          type: "new-password",
          message: "Passwords Can't Match",
        },
        {
          value: document.getElementById("new-password").value,
          type: "password_check",
          message: "Password is not Filled Properly",
        }
      );
    }

    return checkForm
      .map((item) => {
        if (!validateField(item.value, item.type)) {
          return item;
        }
      })
      .filter((item) => item);
  }

  if (!(error().length > 0)) {
    SubmitData();
  } else {
    displayMessage(error()[0].message);
  }
});

var ex_meaning = "";

function displayMessage(message, meaning = "error") {
  const cmessage = document.getElementById("message");

  if (cmessage && ex_meaning != "") {
    cmessage.classList.toggle(ex_meaning);
  }

  if (cmessage) {
    cmessage.classList.toggle(meaning);
    cmessage.textContent = message;
  }

  ex_meaning = meaning;
}

document.addEventListener("DOMContentLoaded", function () {
  G5Fetch(
    "http://localhost:80/getUserSpecs.php",
    "POST",
    {
      "Content-Type": "application/json",
    },
    { email: JSON.parse(sessionStorage.getItem("session")).value.email }
  )
    .then((data) => {
      if (data.success == "1") {
        document.getElementById("name").value = data.user.username || "";
        document.getElementById("email").value = data.user.email || "";
      } else {
        console.error(data.message);
      }
    })
    .catch((e) => {
      console.error("Error:", e);
    });
});

// Enviar os dados atualizados ao servidor via fetch
function SubmitData() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const newPassword = document.getElementById("new-password").value;
  const currentPassword = document.getElementById("password").value;

  const formData = {
    id: JSON.parse(sessionStorage.getItem("session")).value.id, // ID do utilizador da sessão
    username: name,
    email: email,
    newpassword: newPassword,
    password: currentPassword,
  };

  G5Fetch(
    "http://localhost:80/edit_user.php",
    "POST",
    {
      "Content-Type": "application/json",
    },
    formData
  )
    .then((data) => {
      if (data.success == "1") {
        displayMessage(data.message, "success");
      } else {
        displayMessage(data.message || "Update failed!");
      }
    })
    .catch((error) => {
      console.error("Erro ao atualizar:", error);
      displayMessage(data.message || "Error Occured");
    });
}
