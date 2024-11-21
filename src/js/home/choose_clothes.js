const search = [
  {
    name: "",
    placeholder: "Search...",
    type: "search",
    id: "SInput",
    from: "Search",
  },
  {
    values: ["Event", "Sports", "Walk", "Beach", "Business", "Academic"],
    arrow: "s_ear",
    dropdown: "EventType",
    name: "Event",
    type: "dropdown",
  },
  {
    values: ["Weather", "Windy", "Rainy", "Sunny", "Cloudy", "Snowing"],
    arrow: "s_wth",
    dropdown: "Weather",
    name: "Weather",
    type: "dropdown",
  },
  {
    values: [
      "Temperature Range",
      "-10 - 10ºC",
      "10 - 20ºC",
      "20 - 30ºC",
      "30 - 40ºC",
    ],
    arrow: "s_temp",
    dropdown: "TempRange",
    name: "Temperature Range",
    type: "dropdown",
  },
];

const clothes_attributes = [
  {
    name: "",
    placeholder: "Name Your Clothes",
    type: "search",
    id: "TInput",
    from: "Create",
  },
  {
    values: [
      "Brand",
      "Gucci",
      "Chanel",
      "Nike",
      "Adidas",
      "Puma",
      "Reebok",
      "Zara",
      "H&H",
      "Shein",
      "Jordan",
    ],
    arrow: "t-br",
    dropdown: "T-Brand",
    name: "Brand",
    type: "dropdown",
  },
  {
    values: [
      { name: "Sports", isChecked: false },
      { name: "Walk", isChecked: false },
      { name: "Beach", isChecked: false },
      { name: "Business", isChecked: false },
      { name: "Academic", isChecked: false },
    ],
    arrow: "t-e",
    dropdown: "T-EventType",
    name: "Event",
    type: "mdropdown",
  },
  {
    values: ["Weather", "Windy", "Rainy", "Sunny", "Cloudy", "Snowing"],
    arrow: "t_wth",
    dropdown: "T-Weather",
    name: "Weather",
    type: "dropdown",
  },
  {
    values: [
      "Temperature Range",
      "-10 - 10ºC",
      "10 - 20ºC",
      "20 - 30ºC",
      "30 - 40ºC",
    ],
    arrow: "t_temp",
    dropdown: "T-TempRange",
    name: "Temperature Range",
    type: "dropdown",
  },
];

const ChosenClothes = [
  {
    name: "Coat",
    src: "/public/imgs/clothes/coat.png",
    properties: {
      event: ["Sports", "Walk", "Academic", "Rainy"],
      weather: ["Snowing"],
      tempRange: ["-10 - 0ºC"],
    },
  },
  {
    name: "Jacket",
    src: "/public/imgs/clothes/jacket.png",
    properties: {
      event: ["Sports", "Walk"],
      weather: ["Windy", "Snowing", "Cloudy", "Rainy"],
      tempRange: ["-10 - 0ºC", "10 - 20ºC"],
    },
  },
  {
    name: "Scarf",
    src: "/public/imgs/clothes/scarf.png",
    properties: {
      event: ["Walk"],
      weather: ["Snowing", "Windy"],
      tempRange: ["-10 - 10ºC"],
    },
  },
  {
    name: "Beanie",
    src: "/public/imgs/clothes/beanie.png",
    properties: {
      event: ["Sports", "Walk"],
      weather: ["Snowing", "Windy"],
      tempRange: ["-10 - 10ºC", "10 - 20ºC"],
    },
  },
  {
    name: "Gloves",
    src: "/public/imgs/clothes/gloves.png",
    properties: {
      event: ["Sports", "Walk"],
      weather: ["Snowing", "Windy"],
      tempRange: ["-10 - 10ºC", "10 - 20ºC"],
    },
  },
  {
    name: "Boots",
    src: "/public/imgs/clothes/boots.png",
    properties: {
      event: ["Walk", "Business", "Academic"],
      weather: ["Snowing", "Windy", "Cloudy", "Rainy"],
      tempRange: ["-10 - 10ºC", "10 - 20ºC", "20 - 30ºC"],
    },
  },
  {
    name: "T-Shirt",
    src: "/public/imgs/clothes/t-shirt.png",
    properties: {
      event: ["Sports", "Walk", "Beach", "Academic"],
      weather: ["Sunny", "Cloudy"],
      tempRange: ["10 - 20ºC", "20 - 30ºC", "30 - 40ºC"],
    },
  },
  {
    name: "Ear Muffs",
    src: "/public/imgs/clothes/ear_murfs.png",
    properties: {
      event: ["Sports", "Walk", "Academic"],
      weather: ["Snowing", "Windy", "Cloudy"],
      tempRange: ["-10 - 10ºC", "10 - 20ºC"],
    },
  },
  {
    name: "Long Sleeve Shirt",
    src: "/public/imgs/clothes/long_sleeve_shirt.png",
    properties: {
      event: ["Walk", "Business", "Academic"],
      weather: ["Windy", "Rainy", "Sunny", "Cloudy", "Snowing"],
      tempRange: ["-10 - 10ºC", "10 - 20ºC", "20 - 30ºC"],
    },
  },
];

const filters = {
  name: "",
  event: "",
  temperature: "",
  weather: "",
};

const created_clothes = [];

const create_clothes = {
  name: "",
  brand: "",
  events: [],
  weather: "",
  tempRange: "",
};

/*Search */

const dropdown = ({ values, dropdown, name, arrow }) => `
  <div class="dropdown" id="${dropdown}">
    <div class="dropdown-box">
      <p>${name}</p>
      <span class="material-symbols-outlined arrow" id="${arrow}">
        keyboard_arrow_up
      </span>
    </div>
    <div class="dropdown-list">
      ${values
        .map(
          (value) => `
        <div class="dl-item" data-dropdown="${dropdown}" data-value="${value}">
          <p>${value}</p>
        </div>`
        )
        .join("")}
    </div>
  </div>
`;

const multipleDropdown = ({ values, dropdown, name, arrow }) => `
<div class="dropdown" id="${dropdown}">
  <div class="mdropdown-box">
    <p>${name}</p>
    <span class="material-symbols-outlined arrow multiple" id="${arrow}" onclick="arrow('${dropdown}','${arrow}');">
      keyboard_arrow_up
    </span>
  </div>
  <div class="dropdown-list">
    ${values
      .map(
        (item, index) => `
      <div class="dl-item">
        <input type="checkbox" id="${dropdown + "_check_" + index}" 
          ${item.isChecked ? "checked" : ""} 
          onclick="check(${index}, '${
          dropdown + "_check_" + index
        }', '${dropdown}')"
        />
        <p>${item.name}</p>
      </div>`
      )
      .join("")}
  </div>
</div>
`;

const input = ({ placeholder, id, from }) => `
  <input type="text" placeholder="${placeholder}" id="${id}" oninput="syncInput('${id}', '${from}')" />
`;

const generateDropdownHTML = (data) =>
  data
    .map((item) => {
      switch (item.type) {
        case "dropdown":
          return dropdown(item);
        case "search":
          return input(item);

        case "mdropdown":
          return multipleDropdown(item);
      }
    })
    .join("");

const generateClothesHTML = (clothes, filters) => {
  const Clothes = clothes
    .filter(({ properties }) => {
      // Ensure that the 'properties' object exists
      if (!properties) return false;

      const { event, tempRange, weather } = properties;

      // Check if the clothing matches the event, weather, and temperature filter
      const matchesEvent = !filters.event || event.includes(filters.event);
      const matchesWeather =
        !filters.weather || weather.includes(filters.weather);
      const matchesTemperature =
        !filters.temperature || tempRange.includes(filters.temperature);

      return matchesEvent && matchesWeather && matchesTemperature;
    })
    .map(({ name, src }) => {
      const matchesFilter =
        !filters.name ||
        (filters.name !== "" &&
          name.toLowerCase().includes(filters.name.toLowerCase().trim()));

      if (matchesFilter) {
        return `
                <div class="clothes-item">
                  <div class="img-background">
                    <img src="${src}" alt="${name} Image" width="60" height="60" />
                  </div>
                  <h4>${name}</h4>
                </div>`;
      }

      return "";
    })
    .join("");

  if (Clothes != "") {
    return Clothes;
  } else {
    return "<h1 style='max-width:340px'>Non-Existent Piece of Clothing 😓</h1>";
  }
};

/*Create My Clothes */

const AllClothes = () => {
  const selClothes = `
    <div class="dpt">
      <div class="dpt_name enable">
        <p>Name</p>
        <span class="material-symbols-outlined arrow">keyboard_arrow_up</span>
      </div>
      <div class="dpt_desc">
        <p>
          Event: Any<br/>
          Temperature Range: 10º - 20ºC<br/>
          Brand: Puma<br/>
          Type: Cotton<br/>
        </p>

        <div class="dpt_desc_edit">        
          <span class="material-symbols-outlined">
          border_color</span>
          <p>Edit</p>
        </div>
      </div>
    </div>
  `;

  document.querySelector("#T-Dropdown").innerHTML = selClothes;
};

const SelClothes = () => {
  const selClothes = `<h2>Add Your Preferences</h2>
  <div class="img_clothes">
    <img src="/public/imgs/clothes/coat.png" alt="Coat Image"/>
   
  </div>
   ${generateDropdownHTML(clothes_attributes)}
  <a onclick="submitClothe();" class="submit">Submit All Clothes</a>`;

  document.querySelector("#Set_Clothes").innerHTML = selClothes;
};

AllClothes();
SelClothes();

const refreshFilter = () => {
  document.getElementById("S_Dropdowns").innerHTML =
    generateDropdownHTML(search);
  document.getElementById("ChosenClothes").innerHTML = generateClothesHTML(
    ChosenClothes,
    filters
  );

  setupDropdownListeners();
};

const setupDropdownListeners = () => {
  const dropdown_function = (id, event) => {
    const arrowElement = event.target.closest(".arrow");
    const dropdownItem = event.target.closest(".dl-item");

    if (arrowElement && !arrowElement.classList.contains("multiple")) {
      const dropdownBox = arrowElement.closest(".dropdown-box");
      const dropdownList = dropdownBox.nextElementSibling;

      arrowElement.classList.toggle("rotate");
      dropdownBox.classList.toggle("enable");
      dropdownList.classList.toggle("enable");
    }

    if (dropdownItem) {
      const { dropdown, value } = dropdownItem.dataset;

      const dropdownElement = document.getElementById(dropdown);

      const dropdownBox = dropdownElement.querySelector(".dropdown-box");
      const dropdownList = dropdownElement.querySelector(".dropdown-list");
      const arrowElement = dropdownBox.querySelector(".arrow");

      arrowElement.classList.remove("rotate");
      dropdownBox.classList.remove("enable");
      dropdownList.classList.remove("enable");

      DropdownName(dropdown, value);

      if (id == "S_Dropdowns") {
        document.getElementById("ChosenClothes").innerHTML =
          generateClothesHTML(ChosenClothes, filters);
      }
    }
  };

  document.getElementById("S_Dropdowns").addEventListener("click", (event) => {
    dropdown_function("S_Dropdowns", event);
  });

  document.getElementById("Set_Clothes").addEventListener("click", (event) => {
    dropdown_function("Set_Clothes", event);
  });
};

const DropdownName = (dropdown, value) => {
  const dropdownElement = document
    .getElementById(dropdown)
    .querySelector(".dropdown-box p");
  dropdownElement.textContent = value;
  var searchItem;

  if (dropdown.includes("T-")) {
    searchItem = clothes_attributes.find((item) => item.dropdown === dropdown);
  } else {
    searchItem = search.find((item) => item.dropdown === dropdown);
  }

  if (searchItem) searchItem.name = value;

  switch (dropdown) {
    case "EventType":
      if (searchItem.name == "Event") {
        filters.event = "";
      } else {
        filters.event = searchItem.name;
      }
      break;
    case "Weather":
      if (searchItem.name == "Weather") {
        filters.weather = "";
      } else {
        filters.weather = searchItem.name;
      }
      break;
    case "TempRange":
      if (searchItem.name == "Temperature Range") {
        filters.temperature = "";
      } else {
        filters.temperature = searchItem.name;
      }
      break;
    case "T-Brand":
      if (searchItem.name == "Brand") {
        create_clothes.brand = "";
      } else {
        create_clothes.brand = searchItem.name;
      }
      break;
    case "T-Weather":
      if (searchItem.name == "Weather") {
        create_clothes.weather = "";
      } else {
        create_clothes.weather = searchItem.name;
      }
      break;
    case "T-TempRange":
      if (searchItem.name == "Temperature Range") {
        create_clothes.tempRange = "";
      } else {
        create_clothes.tempRange = searchItem.name;
      }
      break;
  }
};

const syncInput = (id, from) => {
  if (from == "Search") {
    const searchInput = search.find((item) => item.id == id);
    searchInput.name = document.getElementById(id).value;
    filters.name = searchInput.name;

    document.getElementById("ChosenClothes").innerHTML = generateClothesHTML(
      ChosenClothes,
      filters
    );
  } else if (from == "Create") {
    const searchInput = clothes_attributes.find((item) => item.id == id);
    searchInput.name = document.getElementById(id).value;
    create_clothes.name = searchInput.name;
  }
};

refreshFilter();

const arrow = (dpd, ar) => {
  const dropdown = document.querySelector(`#${dpd} .mdropdown-box`);
  const arrow = document.getElementById(ar);
  const dpdlist = document.querySelector(`#${dpd} .dropdown-list`);

  console.log(dpdlist);

  arrow.classList.toggle("rotate");
  dropdown.classList.toggle("enable");
  dpdlist.classList.toggle("enable");
};

const check = (index, checkboxId, dropdown) => {
  const checkbox = document.getElementById(checkboxId);
  const attribute = clothes_attributes.find(
    (attr) => attr.dropdown === dropdown
  );

  if (!attribute || attribute.type !== "mdropdown") return;

  const eventName = attribute.values[index].name;
  attribute.values[index].isChecked = checkbox.checked;

  create_clothes.events = checkbox.checked
    ? [...create_clothes.events, eventName].filter(
        (v, i, arr) => arr.indexOf(v) === i
      ) // Ensure no duplicates
    : create_clothes.events.filter((event) => event !== eventName);

  console.log(create_clothes); // For debugging
};

const submitClothe = () => {
  const backup = { ...create_clothes };

  created_clothes.push(backup);

  create_clothes.name = "";
  create_clothes.brand = "";
  create_clothes.events = [];
  create_clothes.weather = "";
  create_clothes.tempRange = "";

  console.log(created_clothes);
};
