import { G5Fetch } from "../../../index.js";

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
      "-40 – -30ºC",
      "-29 – -20ºC",
      "-10 – 0ºC",
      "-19 – -10ºC",
      "-9 – 0ºC",
      "1 – 10ºC",
      "11 – 20ºC",
      "21 – 30ºC",
      "31 – 40ºC",
      "41 – 50ºC",
      "51 – 60ºC",
      "61 – 70ºC",
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
      "-40 – -30ºC",
      "-29 – -20ºC",
      "-10 – 0ºC",
      "-19 – -10ºC",
      "-9 – 0ºC",
      "1 – 10ºC",
      "11 – 20ºC",
      "21 – 30ºC",
      "31 – 40ºC",
      "41 – 50ºC",
      "51 – 60ºC",
      "61 – 70ºC",
    ],
    arrow: "t_temp",
    dropdown: "T-TempRange",
    name: "Temperature Range",
    type: "dropdown",
  },
  {
    values: ["Material", "Cotton", "Linen", "Wool", "Polyester"],
    arrow: "t_mat",
    dropdown: "T-Material",
    name: "Material",
    type: "dropdown",
  },
];

const TypeOfClothes = [
  "Type",
  "Top",
  "Bottom",
  "Shoes",
  "Outerwear",
  "Accessory",
];

let ChosenClothes = [];

const filters = {
  name: "",
  event: "",
  temperature: "",
  weather: "",
};

var created_clothes = [];

const create_clothes = {
  name: "",
  events: [],
  weather: "",
  tempRange: "",
  index: 0,
  material: "",
  type: "",
};

const CleanClothe = () => {
  create_clothes.name = "";
  create_clothes.events = [];
  create_clothes.weather = "";
  create_clothes.tempRange = "";
  create_clothes.src = "";
  create_clothes.index = 0;
  create_clothes.material = "";
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

const multipleDropdown = ({ values, dropdown, name, arrow }) => {
  return `
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
};

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
            Weather: ${item.weather}<br/>
            Temperature Range: ${item.tempRange}<br/>
            Material: ${item.material}<br/>
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
  <div class="error" id="validation-clothe">
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
      if (!properties) return false;

      const { event, tempRange, weather } = properties;

      const matchesEvent = !filters.event || event.includes(filters.event);
      const matchesWeather =
        !filters.weather || weather.includes(filters.weather);
      const matchesTemperature =
        !filters.temperature || tempRange.includes(filters.temperature);

      return matchesEvent && matchesWeather && matchesTemperature;
    })
    .map(({ name, src, type }, index) => {
      const matchesFilter =
        !filters.name ||
        (filters.name !== "" &&
          name.toLowerCase().includes(filters.name.toLowerCase().trim()));

      if (matchesFilter) {
        return `
                <div class="clothes-item">
                  <div class="img-background" id="${name + "_" + index}"
                   onclick="CreateClothe('${src}','${name + "_" + index}',${
          index + 1
        },'${type}')">
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

const refreshFilter = async () => {
  const retrieveClothes = async () => {
    try {
      const data = await G5Fetch("http://localhost:80/getClothes.php");
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const retrieveUserClothes = async () => {
    try {
      const data = await G5Fetch(
        "http://localhost:80/getUsrClothes.php",
        "POST",
        {
          "Content-Type": "application/json",
        },
        { id: JSON.parse(sessionStorage.getItem("session")).value.id }
      );
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const chosenClothes = await retrieveClothes();
  const UsrClothes = await retrieveUserClothes();

  if (!chosenClothes && !UsrClothes) return;

  const indexClothes = () => {
    return chosenClothes.map((item) => {
      return {
        name: item.name,
        src: item.image,
        properties: {
          event: item.EventType.map(
            (i) => clothes_attributes[1].values[i - 1].name
          ),
          weather: item.Weather.map((i) => clothes_attributes[2].values[i]),
          tempRange: item.TempRange.map((i) => clothes_attributes[3].values[i]),
        },
        type: TypeOfClothes[item.type],
      };
    });
  };

  const indexUsrClothes = () => {
    return UsrClothes.map((item) => {
      return {
        name: item.name,
        src: item.src,
        events: item.events.map(
          (i) => clothes_attributes[1].values[i - 1].name
        ),
        weather: clothes_attributes[2].values[item.weather],
        tempRange: clothes_attributes[3].values[item.tempRange],
        material: clothes_attributes[4].values[item.material],
        type: TypeOfClothes[item.type],
      };
    });
  };

  created_clothes = indexUsrClothes();

  ChosenClothes = indexClothes();

  document.getElementById("S_Dropdowns").innerHTML =
    generateDropdownHTML(search);
  generateClothes();
  AllClothes();

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
  document
    .getElementById(dropdown)
    .querySelector(".dropdown-box p").textContent = value;

  const searchItem = (
    dropdown.includes("T-") ? clothes_attributes : search
  ).find((item) => item.dropdown === dropdown);

  if (searchItem) searchItem.name = value;

  const filterMappings = {
    EventType: { filterKey: "event", defaultValue: "Event" },
    Weather: { filterKey: "weather", defaultValue: "Weather" },
    TempRange: { filterKey: "temperature", defaultValue: "Temperature Range" },
    "T-Weather": { createKey: "weather", defaultValue: "Weather" },
    "T-TempRange": {
      createKey: "tempRange",
      defaultValue: "Temperature Range",
    },
    "T-Material": { createKey: "material", defaultValue: "Material" },
  };

  const { filterKey, createKey, defaultValue } = filterMappings[dropdown] || {};

  if (filterKey) {
    filters[filterKey] =
      searchItem.name === defaultValue ? "" : searchItem.name;
  } else if (createKey) {
    create_clothes[createKey] =
      searchItem.name === defaultValue ? "" : searchItem.name;
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

const CreateClothe = (src, id, index, type) => {
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
  create_clothes.type = type;

  document.querySelector(".img_clothes > img").src = src;
};

const onEdit = (id) => {
  const item = created_clothes[id];

  create_clothes.name = item.name;
  create_clothes.events = item.events;
  create_clothes.weather = item.weather;
  create_clothes.tempRange = item.tempRange;
  create_clothes.src = item.src;
  create_clothes.material = item.material;
  create_clothes.type = item.type;

  const lookup = {
    "": item.name,
    Event: item.events,
    Weather: item.weather,
    "Temperature Range": item.tempRange,
    Material: item.material,
  };

  clothes_attributes.forEach((attr) => {
    if (attr.name === "Event" && Array.isArray(attr.values)) {
      attr.values.forEach((event) => {
        event.isChecked = item.events.includes(event.name);
      });
    } else if (lookup[attr.name] !== undefined) {
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
  const transformed_clothes = created_clothes.map((cloth) => ({
    ...cloth,
    events: cloth.events.map(
      (event) =>
        clothes_attributes[1].values.findIndex((e) => e.name === event) + 1
    ),
    weather: clothes_attributes[2].values.indexOf(cloth.weather),
    tempRange: clothes_attributes[3].values.indexOf(cloth.tempRange), // Skip "Temperature Range" label
    material: clothes_attributes[4].values.indexOf(cloth.material), // Skip "Material" label
    type: TypeOfClothes.indexOf(cloth.type),
  }));

  if (transformed_clothes.length > 3) {
    console.log({
      transformed_clothes,
      id: JSON.parse(sessionStorage.getItem("session")).value.id,
    });

    G5Fetch(
      "http://localhost:80/editUserPreferences.php",
      "POST",
      {
        "Content-Type": "application/json",
      },
      {
        transformed_clothes,
        id: JSON.parse(sessionStorage.getItem("session")).value.id,
      }
    )
      .then((data) => {
        if (data.success == "1") {
          window.location.href = "/src/pages/dashboard/home.html";
        } else {
          console.error(data.message);
        }
      })
      .catch((e) => {
        console.error("Error:", e);
      });
  } else {
    const error = document.querySelector("#validation_all_clothes.error");
    const message = document.querySelector("#validation_all_clothes .message");
    error.style.display = "flex";
    message.textContent = "Select at least 4 clothes";
  }
};

// At the end of your file:
window.refreshFilter = refreshFilter;
window.check = check;
window.CreateClothe = CreateClothe;
window.submitClothe = submitClothe;
window.onEdit = onEdit;
window.changeSchema = changeSchema;
window.showNavbar = showNavbar;
window.showAside = showAside;
window.SubmitAllClothes = SubmitAllClothes;
window.syncInput = syncInput;
