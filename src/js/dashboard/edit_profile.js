// Validate formulary based on user input and default criteria.
const form = document.querySelector("body > main > div.login-form > form");

form?.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const passwd = document.getElementById("password").value;
  const newpasswd = document.getElementById("new-password").value;

  if (!isNameValid(name)) {
    triggerError();
  } else if (!isEmailValid(email)) {
    triggerError();
  } else if (!isPassowrdValid(passwd)) {
    triggerError();
  } else if (newpasswd) {
    if (!isNewPasswordValid(passwd, newpasswd)) triggerError();
    else {
      let pessoa = {
        name: name,
        email: email,
        passwd: passwd,
        newpasswd: newpasswd,
      };
      triggerSuccess(pessoa, form);
    }
  } else if (!newpasswd) {
    let pessoa = { name: name, email: email, passwd: passwd };
    triggerSuccess(pessoa, form);
  }
});

function isNameValid(someoneName) {
  const regex = /^[A-Z].*/;
  return regex.test(someoneName);
}

function isEmailValid(email) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}

function isPassowrdValid(password) {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return regex.test(password);
}

function isNewPasswordValid(oldPassword, newPassword) {
  if (!isPassowrdValid(newPassword)) return false;
  if (!isPassowrdValid(oldPassword)) return false;
  if (oldPassword === newPassword) return false;
  return true;
}

function triggerError() {
  let k = document.getElementById("error");
  k.style.display = "flex";
  k.className = "red";
}

function triggerSuccess(pessoa, form) {
  let k = document.getElementById("error");
  k.style.display = "flex";
  k.className = "green";
  let l = document.getElementById("error-paragraph");
  l.innerHTML = "Dados válidos, atualizações feitas";
  console.log(pessoa);
  form.submit();
}

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

function ShowForm() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
}

/* Validate clothes Form */
const clothesForm = document.querySelector("#clothForm");

clothesForm.addEventListener("submit", (e) => {
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

document.addEventListener("DOMContentLoaded", function () {
  fetch("localhostsession_data.php")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("name").value = data.username || "";
      document.getElementById("email").value = data.email || "";
      document.getElementById("password").value = ""; // Não preencher password por segurança
    })
    .catch((error) => {
      console.error("Erro ao obter dados de sessão:", error);
    });
});

// Enviar os dados atualizados ao servidor via fetch
document
  .getElementById("edit-user-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const newPassword = document.getElementById("new-password").value;
    const currentPassword = document.getElementById("password").value;

    const formData = {
      id: data.id, // ID do utilizador da sessão
      username: name,
      email: email,
      newpassword: newPassword,
      password: currentPassword,
    };

    fetch("update_user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        const message = document.getElementById("response-message");
        message.style.display = "block";
        if (data.success) {
          message.innerHTML = "Update successful!";
          message.style.color = "green";
        } else {
          message.innerHTML = data.message || "Update failed!";
          message.style.color = "red";
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar:", error);
        document.getElementById("response-message").innerHTML =
          "Ocorreu um erro!";
      });
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
