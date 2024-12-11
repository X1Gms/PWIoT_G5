import { G5Fetch } from "../../../index.js";

const get_Clothes = async () => {
  try {
    const data = await G5Fetch("http://localhost:80/getClothes.php");
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

//Variables

//This variable is to render the form.
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
    arrow: "e",
    dropdown: "EventType",
    name: "Event",
    type: "mdropdown",
  },
  {
    values: [
      { name: "Windy", isChecked: false },
      { name: "Rainy", isChecked: false },
      { name: "Sunny", isChecked: false },
      { name: "Cloudy", isChecked: false },
      { name: "Snowing", isChecked: false },
    ],
    arrow: "wth",
    dropdown: "Weather",
    name: "Weather",
    type: "mdropdown",
  },
  {
    values: [
      { name: "-40 – -30ºC", isChecked: false },
      { name: "-29 – -20ºC", isChecked: false },
      { name: "-19 – -10ºC", isChecked: false },
      { name: "-9 – 0ºC", isChecked: false },
      { name: "1 – 10ºC", isChecked: false },
      { name: "11 – 20ºC", isChecked: false },
      { name: "21 – 30ºC", isChecked: false },
      { name: "31 – 40ºC", isChecked: false },
      { name: "41 – 50ºC", isChecked: false },
      { name: "51 – 60ºC", isChecked: false },
      { name: "61 – 70ºC", isChecked: false },
    ],
    arrow: "temp",
    dropdown: "TempRange",
    name: "Temperature Range",
    type: "mdropdown",
  },
  {
    values: ["Type", "Top", "Bottom", "Shoes", "Outerwear", "Accessory"],
    arrow: "ty",
    dropdown: "Type",
    name: "Type",
    type: "dropdown",
  },
];

const clothesBackup = [...clothes_attributes];

//The values chosen in clothes_attributes
const create_clothes = {
  name: "",
  EventType: [],
  Weather: [],
  TempRange: [],
  type: "",
  image: "",
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
const RenderShowClothe = (path, id) => {
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
        <img src="${
          create_clothes.image.length > 0
            ? create_clothes.image
            : "/public/imgs/clothes/coat.png"
        }" id="imagePreview" alt="Selected Image" />
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
        ? `<a onclick="submitClothe('edit', ${id});" class="submit">Edit Clothes</a>`
        : `<a onclick="submitClothe();" class="submit">Submit Clothes</a>`
    }
  </div>`;
};

let clothesData = []; // Declare a global array to hold the data

const RenderTable = async () => {
  const table = document.getElementsByTagName("tbody")[0];
  clothesData = await get_Clothes(); // Store fetched data globally

  table.innerHTML = "";

  if (!clothesData || clothesData.length === 0) {
    table.innerHTML = "<tr><td colspan='5'>No data available</td></tr>";
    return;
  }

  table.innerHTML = clothesData
    .map((item, index, id) => {
      return `
      <tr class="linha-clara">
        <td style="font-weight: 800">${index + 1}</td>
        <td style="background-color: transparent">
          <img
            src="${item.image}"
            alt="${item.name} Image"
            style="width: 50px; height: 50px"
          />
        </td>
        <td>${item.name}</td>
        <td>${item.created_date}</td>
        <td>
          <button
            class="openPopup"
            style="background: none; border: none; cursor: pointer; margin-right: 30px;"
            onclick="RenderEditClothe(${index + 1})"
          >
            <span class="material-symbols-outlined" style="color: #979797; font-size: 20px">
              border_color
            </span>
          </button>
          <button
            class="openDeletePopup"
            style="background: none; border: none; cursor: pointer; margin-left: 8px;"
            onclick="Toggle('YON', ${index + 1});"
          >
          
            <span class="material-symbols-outlined" style="font-size: 20px; color: #960202">
              delete
            </span>
          </button>
        </td>
      </tr>`;
    })
    .join("");
};

const RenderCreateClothe = () => {
  Toggle("AddClothe");
  resetNames(clothes_attributes);
  RenderShowClothe();
  uploadImage();
};

const RenderEditClothe = (id) => {
  Toggle("AddClothe");
  attributeNames(clothes_attributes, clothesData[id - 1]);
  RenderShowClothe("edit", id);
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

const RenderYN = (id) => {
  document.getElementById("YON").innerHTML = `
  <h2>Would you like to delete this item?</h2>
  <div class="btns">
  <div class="YON" onclick="DeleteClothe(${id});">
    Yes
  </div>
  <div class="YON negative" onclick="Toggle('YON');">No</div>
  </div>
  `;
};

/*

Functions

 */

//Resets All Values From the Form
const resetNames = (attributes) => {
  attributes.forEach((attr, index) => {
    if (attr.type === "search") {
      attr.name = "";
    } else if (attr.type === "dropdown") {
      attr.name = attr.values[0];
    } else if (attr.type === "mdropdown") {
      attr.name = clothesBackup[index].name;

      attr.values.forEach((item) => {
        if (item.isChecked !== undefined) {
          item.isChecked = false;
        }
      });
    }
  });

  create_clothes.name = "";
  create_clothes.EventType = [];
  create_clothes.Weather = [];
  create_clothes.TempRange = [];
  create_clothes.image = "";
  create_clothes.type = "";
};

const attributeNames = (attributes, item) => {
  attributes.forEach((attr) => {
    // Handle search input for item name
    if (attr.type === "search") {
      attr.name = item.name;
    }
    // Handle multiple dropdowns (mdropdown)
    else if (attr.type === "mdropdown") {
      // Determine which field to match based on the attribute's dropdown name
      const itemField = item[attr.dropdown];
      attr.values.forEach((value) => {
        value.isChecked = itemField.includes(
          attr.values.findIndex((v) => v.name === value.name) + 1 // Adjust index for TempRange matching
        );
      });
    }
    // Handle single dropdown fields like Type
    else if (attr.type === "dropdown") {
      attr.name = attr.values[item.type];
    }
  });

  create_clothes.name = item.name;
  create_clothes.EventType = item.EventType.map(
    (i) => clothes_attributes[1].values[i - 1].name
  );
  create_clothes.Weather = item.Weather.map(
    (i) => clothes_attributes[2].values[i - 1].name
  );
  create_clothes.TempRange = item.TempRange.map(
    (i) => clothes_attributes[3].values[i - 1].name
  );
  create_clothes.image = item.image;
  create_clothes.type = clothes_attributes[4].values[item.type];

  console.log(create_clothes);
};
//Function to Toggle the Form
const Toggle = (id, idObj) => {
  console.log(idObj);

  if (id == "YON" && idObj) {
    RenderYN(idObj);
  }
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
  RenderTable();
  setupDropdownListeners();
  RenderYN();
};

const DropdownName = (dropdown, value) => {
  document
    .getElementById(dropdown)
    .querySelector(".dropdown-box p").textContent = value;

  const searchItem = clothes_attributes.find(
    (item) => item.dropdown === dropdown
  );

  if (searchItem) searchItem.name = value;

  const filterMappings = {
    Type: { createKey: "type", defaultValue: "Type" },
  };

  const { createKey, defaultValue } = filterMappings[dropdown] || {};

  create_clothes[createKey] =
    searchItem.name === defaultValue ? "" : searchItem.name;
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

  create_clothes[dropdown] = checkbox.checked
    ? Array.from(new Set([...create_clothes[dropdown], eventName])) // Ensure no duplicates using Set
    : create_clothes[dropdown].filter((event) => event !== eventName);
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

  const ClothesToSend = {
    ...backup,
    EventType: backup.EventType.map(
      (event) =>
        clothes_attributes[1].values.findIndex((e) => e.name === event) + 1
    ),
    Weather: backup.Weather.map(
      (item) =>
        clothes_attributes[2].values.findIndex((e) => e.name === item) + 1
    ),
    TempRange: backup.TempRange.map(
      (item) =>
        clothes_attributes[3].values.findIndex((e) => e.name === item) + 1
    ),
    type: clothes_attributes[4].values.indexOf(backup.type),
  };

  console.log(ClothesToSend);

  if (checkEmpty?.length == 0 || checkEmpty == undefined) {
    if (path == "edit") {
      EditClothes(ClothesToSend, id);
      console.log({ ClothesToSend, id });
    } else {
      AddClothes(ClothesToSend);
    }
    resetNames(clothes_attributes);
  } else {
    displayError(`Field ${checkEmpty[0]} is not filled`);
  }
};

const displayError = (message) => {
  const error = document.querySelector("#validation_all_clothes");
  const message_el = document.querySelector("#validation_all_clothes .message");

  error.style.display = "flex";
  message_el.textContent = message;
};

const DeleteClothe = (id) => {
  G5Fetch(
    "http://localhost:80/delete_clothe.php",
    "POST",
    { "Content-Type": "application/json" },
    { id }
  )
    .then((data) => {
      if (data.success) {
        Toggle("YON");
        RenderMessage(true, "Clothing successfully deleted");
        RenderTable();
      } else {
        RenderMessage(false, data.message || "Failed to delete clothing");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      RenderMessage(false, "An error occurred while deleting clothing");
    });
};

document.addEventListener("DOMContentLoaded", () => {
  refreshFilter();
});

const AddClothes = (obj) => {
  G5Fetch(
    "http://localhost:80/addClothe.php",
    "POST",
    { "Content-Type": "application/json" },
    obj
  )
    .then((data) => {
      Toggle("AddClothe");
      RenderMessage(true, data.message);
      RenderTable();
    })
    .catch((error) => {
      console.error("Error:", error); // Handle errors
    });
};

const EditClothes = (obj, id) => {
  G5Fetch(
    "http://localhost:80/edit_clothes.php",
    "POST",
    { "Content-Type": "application/json" },
    { ...obj, id } // Enviar dados da roupa e o ID para o PHP
  )
    .then((data) => {
      if (data.success) {
        Toggle("AddClothe");
        RenderMessage(true, "Clothing successfully updated!");
        RenderTable(); // Atualiza a tabela após a edição
      } else {
        RenderMessage(false, data.message || "Failed to update clothing.");
      }
    })
    .catch((error) => {
      console.error("Error:", error); // Handle errors
      RenderMessage(false, "An error occurred while updating clothing.");
    });
};

window.check = check;
window.submitClothe = submitClothe;
window.syncInput = syncInput;
window.Toggle = Toggle;
window.RenderCreateClothe = RenderCreateClothe;
window.RenderEditClothe = RenderEditClothe;
window.RenderTable = RenderTable;
window.DeleteClothe = DeleteClothe;
window.RenderYN = RenderYN;
