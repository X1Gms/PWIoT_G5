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
        <a href="/index.html">Sign Out</a>
        <p class="nav-copyright">&copy; Group 5 PWDAM 2024/2026</p>
      </div>
    </div>`;
}

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

function RenderEverything() {
  const role = [true, false];

  const isAdmin =
    role[JSON.parse(sessionStorage.getItem("session")).value.role - 1];
  isAdmin && navbarArray.push(Settings);
  renderNavbar();
}

RenderEverything();
