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
      "-10 – 10ºC",
      "10 – 20ºC",
      "20 – 30ºC",
      "30 – 40ºC",
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
      "-10 – 0ºC",
      "0 – 10ºC",
      "10 – 20ºC",
      "20 – 30ºC",
      "30 – 40ºC",
    ],
    arrow: "t_temp",
    dropdown: "T-TempRange",
    name: "Temperature Range",
    type: "dropdown",
  },
  {
    values: [
      "Type",
      "Cotton",
      "Linen",
      "Silk",
      "Wool",
      "Hemp",
      "Rayon",
      "Polyester",
    ],
    arrow: "t_type",
    dropdown: "T-Type",
    name: "Type",
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
      tempRange: ["-10 – 10ºC"],
    },
  },
  {
    name: "Jacket",
    src: "/public/imgs/clothes/jacket.png",
    properties: {
      event: ["Sports", "Walk"],
      weather: ["Windy", "Snowing", "Cloudy", "Rainy"],
      tempRange: ["-10 – 10ºC", "10 – 20ºC"],
    },
  },
  {
    name: "Scarf",
    src: "/public/imgs/clothes/scarf.png",
    properties: {
      event: ["Walk"],
      weather: ["Snowing", "Windy"],
      tempRange: ["-10 – 10ºC"],
    },
  },
  {
    name: "Beanie",
    src: "/public/imgs/clothes/beanie.png",
    properties: {
      event: ["Sports", "Walk"],
      weather: ["Snowing", "Windy"],
      tempRange: ["-10 – 10ºC", "10 – 20ºC"],
    },
  },
  {
    name: "Gloves",
    src: "/public/imgs/clothes/gloves.png",
    properties: {
      event: ["Sports", "Walk"],
      weather: ["Snowing", "Windy"],
      tempRange: ["-10 – 10ºC", "10 – 20ºC"],
    },
  },
  {
    name: "Boots",
    src: "/public/imgs/clothes/boots.png",
    properties: {
      event: ["Walk", "Business", "Academic"],
      weather: ["Snowing", "Windy", "Cloudy", "Rainy"],
      tempRange: ["-10 – 10ºC", "10 – 20ºC", "20 – 30ºC"],
    },
  },
  {
    name: "T-Shirt",
    src: "/public/imgs/clothes/t-shirt.png",
    properties: {
      event: ["Sports", "Walk", "Beach", "Academic"],
      weather: ["Sunny", "Cloudy"],
      tempRange: ["10 – 20ºC", "20 – 30ºC", "30 – 40ºC"],
    },
  },
  {
    name: "Ear Muffs",
    src: "/public/imgs/clothes/ear_murfs.png",
    properties: {
      event: ["Sports", "Walk", "Academic"],
      weather: ["Snowing", "Windy", "Cloudy"],
      tempRange: ["-10 – 10ºC", "10 – 20ºC"],
    },
  },
  {
    name: "Long Sleeve Shirt",
    src: "/public/imgs/clothes/long_sleeve_shirt.png",
    properties: {
      event: ["Walk", "Business", "Academic"],
      weather: ["Windy", "Rainy", "Sunny", "Cloudy", "Snowing"],
      tempRange: ["-10 – 10ºC", "10 – 20ºC", "20 – 30ºC"],
    },
  },
];

const filters = {
  name: "",
  event: "",
  temperature: "",
  weather: "",
};

var created_clothes = [];

const create_clothes = {
  name: "",
  brand: "",
  events: [],
  weather: "",
  tempRange: "",
  index: 0,
  type: "",
};

const CleanClothe = () => {
  create_clothes.name = "";
  create_clothes.brand = "";
  create_clothes.events = [];
  create_clothes.weather = "";
  create_clothes.tempRange = "";
  create_clothes.src = "";
  create_clothes.index = 0;
  create_clothes.type = "";
};

const resetNames = (attributes) => {
  attributes.forEach((attr) => {
    if (attr.type === "search") {
      attr.name = "";
    } else if (attr.type === "dropdown") {
      attr.name = attr.values[0];
    } else if (attr.type === "mdropdown") {
      attr.name = "Event";

      attr.values.forEach((item) => {
        if (item.isChecked !== undefined) {
          item.isChecked = false;
        }
      });
    }
  });

  CleanClothe();
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
  <div class="mdropdown-box dropbox">
    <p>${name}</p>
    <span class="material-symbols-outlined arrow multiple" id="${arrow}">
      keyboard_arrow_up
    </span>
  </div>
  <div class="dropdown-list list">
    ${values
      .map(
        (item, index) => `
      <div class="m-item">
        <input type="checkbox" id="${dropdown + "_check_" + index}" 
          ${item.isChecked ? "checked" : ""} 
          onclick="check(${index}, '${
          dropdown + "_check_" + index
        }', '${dropdown}')"
        />
          <label for="${dropdown + "_check_" + index}"><p>${
          item.name
        }</p></label>
      </div>`
      )
      .join("")}
  </div>
</div>
`;

const input = ({ placeholder, id, from, name }) => `
  <input type="text" placeholder="${placeholder}" id="${id}" oninput="syncInput('${id}', '${from}')" value="${name}" />
`;

const AllClothes = () => {
  const types = {
    type: "cloth_",
    arrow: "clarr_",
  };

  const selClothes = created_clothes
    .map(
      (item, index) => `
      <div class="dpt" id="${types.type + index}">
        <div class="dpt_name dropdown-box">
          <p>${
            item.name.length < 16 ? item.name : item.name.slice(0, 13) + "..."
          }</p>
          <span class="material-symbols-outlined arrow" id="${
            types.arrow + index
          }">
            keyboard_arrow_up
          </span>
        </div>
        <div class="dpt_desc list">
          <p>
            Name: ${item.name}<br/>
            Event: ${item.events.join(", ")}<br/>
            Temperature Range: ${item.tempRange}<br/>
            Brand: ${item.brand}<br/>
            Type: ${item.type}
          </p>
          <div class="dpt_desc_edit" onclick="onEdit(${index})">        
            <span class="material-symbols-outlined">border_color</span>
            <p>Edit</p>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  document.getElementById("All_Clothes").innerHTML = `
          <h2>Selected Clothes</h2>
          <div class="error" id="validation_all_clothes">
            <span class="material-symbols-outlined"> cancel </span>
            <div class="message">Lorem Ipsum</div>
          </div>
          <div class="clothes_list" id="T-Dropdown">${
            selClothes !== ""
              ? selClothes
              : "<h2 style='color: #a3a3a3; margin-top: 50%;'>Select clothes to continue</h2>"
          }</div>
          <div class="submit" onclick="SubmitAllClothes();">
            Submit All Clothes
          </div>`;
};

const SelClothes = () => {
  const selClothes = `
<span class="material-symbols-outlined close" onclick="changeSchema();" >
close
</span><h2>Add Your Preferences</h2>
  <div class="error" id="validation-clothe">
      <span class="material-symbols-outlined"> cancel </span>
      <div class="message">Lorem Ipsum</div>
  </div>
  <div class="img_clothes">
    <img src="/public/imgs/clothes/coat.png" alt="Coat Image"/>
   
  </div>
   ${generateDropdownHTML(clothes_attributes)}
 
  <a onclick="submitClothe();" class="submit">Submit Clothes</a>`;

  document.querySelector("#Set_Clothes").innerHTML = selClothes;
};

const SelEditClothes = (id) => {
  const selClothes = `
<span class="material-symbols-outlined close" onclick="changeSchema();" >
close
</span><h2>Add Your Preferences</h2>
  <div class="error">
      <span class="material-symbols-outlined"> cancel </span>
      <div class="message">Lorem Ipsum</div>
  </div>
  <div class="img_clothes">
    <img src="/public/imgs/clothes/coat.png" alt="Coat Image"/>
   
  </div>
   ${generateDropdownHTML(clothes_attributes)}
 
  <a onclick="submitClothe('edit',${id});" class="submit" style="margin-bottom:20px;">Submit Clothes</a>
  <a onclick="submitClothe('delete',${id});" class="submit">Delete Clothes</a>`;

  document.querySelector("#Set_Clothes").innerHTML = selClothes;
};

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
    .map(({ name, src }, index) => {
      const matchesFilter =
        !filters.name ||
        (filters.name !== "" &&
          name.toLowerCase().includes(filters.name.toLowerCase().trim()));

      if (matchesFilter) {
        return `
                <div class="clothes-item">
                  <div class="img-background" id="${name + "_" + index}"
                   onclick="CreateClothe('${src}','${
          name + "_" + index
        }','${index}')">
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

AllClothes();
SelClothes();

const refreshFilter = () => {
  document.getElementById("S_Dropdowns").innerHTML =
    generateDropdownHTML(search);
  generateClothes();

  setupDropdownListeners();
};

const setupDropdownListeners = () => {
  const dropdown_function = (id, event) => {
    const arrowElement = event.target.closest(".arrow");
    const dropdownItem = event.target.closest(".dl-item");

    if (arrowElement) {
      if (!arrowElement.classList.contains("multiple")) {
        const dropdownBox = arrowElement.closest(".dropdown-box");
        const dropdownList = dropdownBox.nextElementSibling;

        arrowElement.classList.toggle("rotate");
        dropdownBox.classList.toggle("enable");
        dropdownList.classList.toggle("block");
      } else if (arrowElement.classList.contains("multiple")) {
        const dropdownBox = arrowElement.closest(".dropbox");
        const dropdownList = dropdownBox.nextElementSibling;

        arrowElement.classList.toggle("rotate");
        dropdownBox.classList.toggle("enable");
        dropdownList.classList.toggle("block");
      }
    }
    if (dropdownItem) {
      const { dropdown, value } = dropdownItem.dataset;

      const dropdownElement = document.getElementById(dropdown);

      const dropdownBox = dropdownElement.querySelector(".dropdown-box");
      const dropdownList = dropdownElement.querySelector(".dropdown-list");
      const arrowElement = dropdownBox.querySelector(".arrow");

      arrowElement.classList.remove("rotate");
      dropdownBox.classList.remove("enable");
      dropdownList.classList.remove("block");

      DropdownName(dropdown, value);

      if (id == "S_Dropdowns") {
        generateClothes();
      }
    }
  };

  document.getElementById("S_Dropdowns").addEventListener("click", (event) => {
    dropdown_function("S_Dropdowns", event);
  });

  document.getElementById("Set_Clothes").addEventListener("click", (event) => {
    dropdown_function("Set_Clothes", event);
  });

  document.getElementById("All_Clothes").addEventListener("click", (event) => {
    dropdown_function("All_Clothes", event);
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
    case "T-Type":
      if (searchItem.name == "Type") {
        create_clothes.type = "";
      } else {
        create_clothes.type = searchItem.name;
      }
      break;
  }
};

const syncInput = (id, from) => {
  if (from == "Search") {
    attribute_object(search, filters, id);
    generateClothes();
  } else if (from == "Create") {
    attribute_object(clothes_attributes, create_clothes, id);
  }
};

const attribute_object = (object, attribute, id) => {
  const searchInput = object.find((item) => item.id == id);
  searchInput.name = document.getElementById(id).value;
  attribute.name = searchInput.name;
};

const generateClothes = () => {
  document.getElementById("ChosenClothes").innerHTML = generateClothesHTML(
    ChosenClothes,
    filters
  );
};

refreshFilter();

const check = (index, checkboxId, dropdown) => {
  const checkbox = document.getElementById(checkboxId);
  const attribute = clothes_attributes.find(
    (attr) => attr.dropdown === dropdown
  );

  if (!attribute || attribute.type !== "mdropdown") return;

  const { name: eventName } = attribute.values[index];
  attribute.values[index].isChecked = checkbox.checked;

  create_clothes.events = checkbox.checked
    ? Array.from(new Set([...create_clothes.events, eventName])) // Ensure no duplicates using Set
    : create_clothes.events.filter((event) => event !== eventName);
};

var SelectedClothes = null;

const submitClothe = (path, id) => {
  const backup = { ...create_clothes };

  const checkEmpty = Object.entries(create_clothes).find(([key, value]) => {
    return value === "" || (Array.isArray(value) && value.length === 0);
  });

  if (checkEmpty?.length == 0 || checkEmpty == undefined) {
    if (path == "edit") {
      created_clothes[id] = backup;
    } else if (path == "delete") {
      created_clothes.splice(id, 1);
    } else {
      created_clothes.push(backup);
    }

    CleanClothe();

    if (SelectedClothes != null) {
      SelectedClothes.classList.toggle("enable");
    }

    SelectedClothes = null;
    document.querySelector(".set_clothes").style.display = "none";
    document.querySelector(".my_clothes").style.display = "block";
    AllClothes();
  } else {
    const error = document.querySelector("#validation-clothe");
    const message = document.querySelector("#validation-clothe .message");

    error.style.display = "flex";
    message.textContent = `Field ${checkEmpty[0]} is not filled`;
  }
};

var show_class = "";

const CreateClothe = (src, id, index) => {
  resetNames(clothes_attributes);
  SelClothes();

  if (window.innerWidth < 1201) {
    const aside = document.querySelector(`.all_clothes`);
    const night = document.querySelector(".night");
    const neonav = document.querySelector(".neo-nav");

    neonav.classList.add("enable");
    night.classList.toggle("enable");
    aside.classList.toggle("enable");

    show_class = "all_clothes";
  }

  const backup = SelectedClothes;

  SelectedClothes = document.getElementById(id);

  if (backup !== null) {
    backup.classList.toggle("enable");
  }
  SelectedClothes.classList.toggle("enable");
  document.querySelector(".my_clothes").style.display = "none";
  document.querySelector(".set_clothes").style.display = "flex";

  create_clothes.src = src;
  create_clothes.index = index;

  document.querySelector(".img_clothes > img").src = src;
};

const onEdit = (id) => {
  const item = created_clothes[id];

  create_clothes.name = item.name;
  create_clothes.brand = item.brand;
  create_clothes.events = item.events;
  create_clothes.weather = item.weather;
  create_clothes.tempRange = item.tempRange;
  create_clothes.src = item.src;
  create_clothes.type = item.type;

  const lookup = {
    "": item.name,
    Brand: item.brand,
    Weather: item.weather,
    "Temperature Range": item.tempRange,
    Type: item.type,
  };

  // Update the existing clothes_attributes array
  clothes_attributes.forEach((attr) => {
    if (lookup[attr.name] !== undefined) {
      attr.name = lookup[attr.name];
    }
  });

  SelEditClothes(id);
  document.querySelector(".my_clothes").style.display = "none";
  document.querySelector(".set_clothes").style.display = "flex";
  document.querySelector(".img_clothes > img").src = item.src;
};

const changeSchema = () => {
  CleanClothe();

  if (SelectedClothes != null) {
    SelectedClothes.classList.toggle("enable");
  }

  SelectedClothes = null;
  document.querySelector(".set_clothes").style.display = "none";
  document.querySelector(".my_clothes").style.display = "block";
  AllClothes();
};

const showNavbar = () => {
  const neoNav = document.querySelector(".neo-nav");

  neoNav.classList.toggle("enable");
};

const showAside = (aside) => {
  const aside01 = document.querySelector(`.${aside}`);
  const night = document.querySelector(".night");

  // Ensure elements exist before proceeding
  if (!aside01 || !night) {
    console.error("One or more required elements not found!");
    return;
  }

  if (show_class === "") {
    // No currently shown element
    aside01.classList.toggle("enable");
    night.classList.toggle("enable");
    show_class = aside;
  } else if (show_class === aside) {
    // Clicked the same element again
    aside01.classList.toggle("enable");
    night.classList.toggle("enable");
    show_class = ""; // Reset to empty string
  } else {
    // Switching to a different element
    const aside02 = document.querySelector(`.${show_class}`);

    if (aside02) {
      aside02.classList.toggle("enable");
    }

    aside01.classList.toggle("enable");
    show_class = aside;
  }
};

const SubmitAllClothes = () => {
  const maps = clothes_attributes.reduce((acc, attr) => {
    if (attr.values)
      acc[attr.name.toLowerCase()] = attr.values.map((v) => v.name || v);
    return acc;
  }, {});

  // Transform objects using the maps
  const mappedObjects = created_clothes.map((item) => ({
    ...item,
    brand: maps.brand.indexOf(item.brand),
    events: item.events.map((event) => maps.event.indexOf(event)),
    weather: maps.weather.indexOf(item.weather),
    tempRange: maps["temperature range"].indexOf(item.tempRange),
    type: maps.type.indexOf(item.type),
  }));

  console.log(mappedObjects);

  // if (transformedClothes.length > 3) {
  //   fetch("http://localhost/addUserPreferences.php", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(transformedClothes),
  //   });
  //   // window.location.href = "/src/pages/home/get-started.html";
  // } else {
  //   const error = document.querySelector("#validation_all_clothes.error");
  //   const message = document.querySelector("#validation_all_clothes .message");
  //   error.style.display = "flex";
  //   message.textContent = "Select at least 4 clothes";
  // }
};
