function showNavbar() {
  /* DEFAULT BODY MARGIN AND PADDING
            margin: 0 auto;
            padding: 2rem; 
        */
  // If we don't have hidden class it's because there is navbar. Otherwise navbar it's closed.
  // const bmw = true;
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
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os botões para abrir e fechar pop-ups
  const openPopupBtns = document.querySelectorAll(".openPopup");
  const openDeletePopupBtns = document.querySelectorAll(".openDeletePopup");
  const overlay = document.querySelector(".overlay");
  const popup = document.querySelector(".popup");
  const closePopupBtn = document.querySelector(".close-btn");

  const overlayDelete = document.querySelector(".overlayDelete");
  const deletePopup = document.querySelector(".deletePopup");
  const closeDeletePopupBtn = document.querySelector(".close-btnn");
  const confirmDeleteBtn = document.querySelector(".confirm-btn");
  const cancelDeleteBtn = document.querySelector(".cancel-btn");

  // Função para mostrar o pop-up de edição
  openPopupBtns.forEach((button) => {
    button.addEventListener("click", () => {
      popup.style.display = "none";
      overlay.style.display = "flex";
    });
  });

  // Função para fechar o pop-up de edição
  closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", () => {
    popup.style.display = "none";
    // overlay.style.display = "none";
  });

  // Função para mostrar o pop-up de exclusão
  openDeletePopupBtns.forEach((button) => {
    button.addEventListener("click", () => {
      deletePopup.style.display = "block";
      overlayDelete.style.display = "block";
    });
  });

  // Função para fechar o pop-up de exclusão
  closeDeletePopupBtn.addEventListener("click", () => {
    deletePopup.style.display = "none";
    overlayDelete.style.display = "none";
  });

  cancelDeleteBtn.addEventListener("click", () => {
    deletePopup.style.display = "none";
    overlayDelete.style.display = "none";
  });

  // Ação ao clicar no botão "Sim" para deletar
  confirmDeleteBtn.addEventListener("click", () => {
    alert("Deleted Clothes Successfully");
    deletePopup.style.display = "none";
    overlayDelete.style.display = "none";
  });

  overlayDelete.addEventListener("click", () => {
    deletePopup.style.display = "none";
    overlayDelete.style.display = "none";
  });
});

function ChangeClothes(){
  let fileH = document.getElementById("fileH");
  fileH.click();
  const formimgcloth = document.getElementById("form-cloth-img");

  fileH.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();

      reader.onload = function(e) {
        formimgcloth.src = e.target.result;
      };

      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image.');
    }
  });




}

function isNameValid(someoneName) {
  const regex = /^[A-Z].*/;
  return regex.test(someoneName);
}

function ShowForm(){
  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  
}

  const close_form = document.getElementById('close-form');
  close_form.addEventListener('click', function (event) {
    const x = document.getElementById('overlay');
    x.style.display = 'none';
  })

/* Validate clothes Form */
const clothesForm = document.querySelector("#clothForm");

clothesForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(clothesForm)

  const clothName = formData.get("jacket-name") 
  const weather = formData.get("weather-type")

   if (!isNameValid(clothName)) {
    // Display Error
    clothesForm.reset();
    return;
  }
    // Display Success
  document.querySelector("#clothForm").submit();
})


/* Code WoW */
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
    <span class="material-symbols-outlined arrow multiple" id="${arrow}" onclick="arrow_click('${dropdown}','${arrow}');">
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
        <p>${item.name}</p>
      </div>`
      )
      .join("")}
  </div>
</div>
`;

const input = ({ placeholder, id, from, name }) => `
  <input type="text" placeholder="${placeholder}" id="${id}" oninput="syncInput('${id}', '${from}')" value="${name}" />
`;

/* DropDown codes */

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
      "Business",
      "Walking",
      "Academic",
      "Running"
    ],
    arrow: "t-br",
    dropdown: "T-Events",
    name: "Events",
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
// 

const SelClothes = () => {
  const selClothes = `
   ${generateDropdownHTML(clothes_attributes)}`;
  document.querySelector("#customDiv").innerHTML = selClothes;
};

SelClothes();

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



/*

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

*/

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
  src: "",
  type: "",
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

  create_clothes.name = "";
  create_clothes.brand = "";
  create_clothes.events = [];
  create_clothes.weather = "";
  create_clothes.tempRange = "";
  create_clothes.src = "";
  create_clothes.type = "";
};

const SelEditClothes = (id) => {
  const selClothes = `
<span class="material-symbols-outlined close" onclick="changeSchema();" >
close
</span><h2>Add Your Preferences</h2>
  <div class="img_clothes">
    <img src="/public/imgs/clothes/coat.png" alt="Coat Image"/>
   
  </div>
   ${generateDropdownHTML(clothes_attributes)}
 
  <a onclick="submitClothe('edit',${id});" class="submit" style="margin-bottom:20px;">Submit Clothes</a>
  <a onclick="submitClothe('delete',${id});" class="submit">Delete Clothes</a>`;

  document.querySelector("#Set_Clothes").innerHTML = selClothes;
};


AllClothes();
SelClothes();


const arrow_click = (dropdownId, arrowId) => {
  const dropdown = document.querySelector(`#${dropdownId} .dropbox`);
  const arrow = document.querySelector(`#${dropdownId} .arrow`);
  const dropdownList = document.querySelector(`#${dropdownId} .list`);

  console.log(arrowId);
  

  arrow.classList.toggle("rotate");
  dropdown.classList.toggle("enable");
  dropdownList.classList.toggle("block");
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
      dropdownList.classList.toggle("block");
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
