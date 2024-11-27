//Variables

//This variable is to render the form.
const clothes_attributes = [
  {
    name: "",
    placeholder: "Name Your Clothes",
    type: "search",
    id: "Input",
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
    arrow: "br",
    dropdown: "Brand",
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
    arrow: "e",
    dropdown: "EventType",
    name: "Event",
    type: "mdropdown",
  },
  {
    values: ["Weather", "Windy", "Rainy", "Sunny", "Cloudy", "Snowing"],
    arrow: "wth",
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
    arrow: "temp",
    dropdown: "TempRange",
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
    arrow: "type",
    dropdown: "Type",
    name: "Type",
    type: "dropdown",
  },
];

//The values chosen in clothes_attributes
const create_clothes = {
  name: "",
  brand: "",
  events: [],
  weather: "",
  tempRange: "",
  image: "",
  type: "",
};

/*


Renders


*/

/*
  Arrow Functions

  Instead to use function Name(){} with ES6 update, became used to use
  Arrow Functions
*/
//Render a Normal Dropdown
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

//Render a Dropdown with Multiple Choice
const multipleDropdown = ({ values, dropdown, name, arrow }) => `
<div class="dropdown" id="${dropdown}">
  <div class="mdropdown-box dropbox">
    <p>${name}</p>
    <span class="material-symbols-outlined arrow multiple" id="${arrow}"">
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

//Renders a Normal Input Text
const input = ({ placeholder, id, from, name }) => `
  <input type="text" placeholder="${placeholder}" id="${id}" oninput="syncInput('${id}', '${from}')" value="${name}" />
`;

/*
Detects the id AddClothe in the code and 
then renders the following code between ``
(this is done in JavaScript, in order to be a dynamic pop-up)
*/
const RenderShowClothe = (path) => {
  const detectAddClothe = document.getElementById("AddClothe");

  //In order to make if statements in inline way, we use ? to say then and : to say else
  detectAddClothe.innerHTML = `
  <span class="material-symbols-outlined" id="close" onclick="Toggle('AddClothe');">
  close
</span>
  <div style="width:100%; max-width:230px; display:flex; flex-direction:column; align-items:center;">
    <div class="error" id="validation_all_clothes">
      <span class="material-symbols-outlined"> cancel </span>
      <div class="message">Lorem Ipsum</div>
    </div>
    <div class="img-clothe">
        <img src="/public/imgs/clothes/coat.png" id="imagePreview" alt="Selected Image" />
    </div>

        ${clothes_attributes
          .map((item) =>
            item.type == "dropdown"
              ? dropdown(item)
              : item.type == "mdropdown"
              ? multipleDropdown(item)
              : input(item)
          )
          .join("")}
    <input type="file" id="imageUpload" accept="image/*">
    <label id="fileLabel" for="imageUpload">Select Image</label>
    ${
      path == "edit"
        ? `<a onclick="submitClothe('edit');" class="submit">Edit Clothes</a>`
        : `<a onclick="submitClothe();" class="submit">Submit Clothes</a>`
    }
  </div>`;
};

const RenderCreateClothe = () => {
  Toggle("AddClothe");
  resetNames(clothes_attributes);
  RenderShowClothe();
  uploadImage();
};

const RenderEditClothe = () => {
  Toggle("AddClothe");
  resetNames(clothes_attributes);
  RenderShowClothe("edit");
  uploadImage();
};

const RenderMessage = (checking, message) => {
  const Message = document.getElementById("PopMessage");
  Toggle("PopMessage");

  Message.innerHTML = `
  <span class="material-symbols-outlined" id="close"
  onclick="Toggle('PopMessage');">
    close
  </span>
  <span class="material-symbols-outlined pop">
    ${checking ? "check_circle" : "cancel"}
  </span>
  <h1>${message}</h1>
  `;
};

const RenderYN = () => {
  document.getElementById("YON").innerHTML = `
  <h2>Would you like to delete this item?</h2>
  <div class="btns">
  <div class="YON" onclick="Toggle('YON');RenderMessage(true,'Deleted Successfully')">Yes</div>
  <div class="YON negative" onclick="Toggle('YON');">No</div>
  </div>
  `;
};

/*

Functions

 */

//Resets All Values From the Form
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

  create_clothes.name = "";
  create_clothes.brand = "";
  create_clothes.events = [];
  create_clothes.weather = "";
  create_clothes.tempRange = "";
  create_clothes.image = "";
  create_clothes.type = "";
};

//Function to Toggle the Form
const Toggle = (id) => {
  const Container = document.getElementById(id);
  const night = document.querySelector(".night");
  Container.classList.toggle("enable");
  night.classList.toggle("enable");
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
    }
  };

  document.getElementById("AddClothe").addEventListener("click", (event) => {
    dropdown_function("AddClothe", event);
  });
};

const refreshFilter = () => {
  setupDropdownListeners();
  RenderYN();
};

const DropdownName = (dropdown, value) => {
  const dropdownElement = document
    .getElementById(dropdown)
    .querySelector(".dropdown-box p");
  dropdownElement.textContent = value;
  var searchItem;

  searchItem = clothes_attributes.find((item) => item.dropdown === dropdown);

  if (searchItem) searchItem.name = value;

  switch (dropdown) {
    case "Brand":
      if (searchItem.name == "Brand") {
        create_clothes.brand = "";
      } else {
        create_clothes.brand = searchItem.name;
      }
      break;
    case "Weather":
      if (searchItem.name == "Weather") {
        create_clothes.weather = "";
      } else {
        create_clothes.weather = searchItem.name;
      }
      break;
    case "TempRange":
      if (searchItem.name == "Temperature Range") {
        create_clothes.tempRange = "";
      } else {
        create_clothes.tempRange = searchItem.name;
      }
      break;
    case "Type":
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

const uploadImage = () => {
  const imageUpload = document.getElementById("imageUpload");
  const imagePreview = document.getElementById("imagePreview");

  imageUpload.addEventListener("change", function (event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
        create_clothes.image = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  });
};

const submitClothe = (path, id) => {
  const backup = { ...create_clothes };

  const checkEmpty = Object.entries(create_clothes).find(([key, value]) => {
    return value === "" || (Array.isArray(value) && value.length === 0);
  });

  if (checkEmpty?.length == 0 || checkEmpty == undefined) {
    if (path == "edit") {
      //edit
      Toggle("AddClothe");
      RenderMessage(true, "Successful Clothing Modifications");
    } else if (path == "delete") {
      //delete
    } else {
      //create
      Toggle("AddClothe");
      RenderMessage(true, "Successful Clothing Creation");
    }
    resetNames(clothes_attributes);
  } else {
    const error = document.querySelector("#validation_all_clothes");
    const message = document.querySelector("#validation_all_clothes .message");

    error.style.display = "flex";
    message.textContent = `Field ${checkEmpty[0]} is not filled`;
  }
};

refreshFilter();
