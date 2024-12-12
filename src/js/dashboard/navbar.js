const navbarArray = [
  {
    name: "Home",
    icon: "clear_day",
    url: "/src/pages/dashboard/home.html",
  },
  {
    name: "Edit Profile",
    icon: "person",
    url: "/src/pages/dashboard/settings/edit_profile.html",
  },
  {
    name: "Clothes",
    icon: "apparel",
    url: "/src/pages/dashboard/settings/choose_clothes.html",
  },
];

const Settings = {
  name: "Settings",
  icon: "settings",
  url: "/src/pages/dashboard/settings/account.html",
  alternate: "/src/pages/dashboard/settings/clothes.html",
};

function renderNavbar() {
  const navbar = document.getElementById("navbar");
  const currentPath = window.location.pathname; // Get the current path

  navbar.innerHTML = `
    <span class="material-symbols-outlined equis" onclick="showNavbar();">
      close
    </span>
    <h2>WearWeather</h2>
    <hr />
    <div class="list-container">
      <ul>
        ${navbarArray
          .map(({ name, icon, url, alternate }) => {
            // Check if the current item's URL matches the current path
            const isActive = currentPath === url || currentPath === alternate;
            return `
              <li>
                <a href="${url}">
                  <div class="list-bar ${isActive ? "enable" : ""}">
                    <span class="material-symbols-filled">${icon}</span>
                  </div>
                  ${name}
                </a>
              </li>`;
          })
          .join("")}
      </ul>
      <div>
        <a  id="logout" href="/index.html" onclick="EndSession();">Sign Out</a>
        <p class="nav-copyright">&copy; Group 5 PWDAM 2024/2026</p>
        <a href="../../documentation/documentation.html" target="_blank"><p class="nav-doc">Documentation</p></a>
      </div>
    </div>`;
}

function showNavbar() {
  className =
    document.querySelectorAll(".hidden").length == 0 ? "nav-context" : "hidden";
  const [myBody] = document.getElementsByTagName("body");
  if (className === "hidden") {
    document.getElementsByClassName("hidden")[0].className = "nav-context";
    document.getElementsByClassName("night")[0].className = "night enable";
  } else {
    document.getElementsByClassName("nav-context")[0].className = "hidden";
    document.getElementsByClassName("night")[0].className = "night";
  }
}

function EndSession() {
  sessionStorage.removeItem("session");
  window.location.replace("http://127.0.0.1:3000/");
}

function RenderEverything() {
  const role = [true, false];

  const isAdmin =
    role[JSON.parse(sessionStorage.getItem("session")).value.role - 1];
  isAdmin && navbarArray.push(Settings);
  renderNavbar();
}

RenderEverything();
