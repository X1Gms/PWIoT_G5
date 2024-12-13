// Select all collapsible list items
const collapsibleLists = document.querySelectorAll(".collapse.list");

collapsibleLists.forEach((list) => {
  list.addEventListener("click", (event) => {
    // Check if the click is on the main button (not on sublist items)
    if (!event.target.closest(".button")) return;

    // Prevent the click from affecting subelements unnecessarily
    event.stopPropagation();

    // Select the corresponding sublist
    const sublist = list.querySelector(".sublist");

    // Close all other open sublists except the current one
    document.querySelectorAll(".sublist.open").forEach((openSublist) => {
      if (openSublist !== sublist) {
        openSublist.style.maxHeight = null; // Reset max-height to close the sublist
        openSublist.classList.remove("open"); // Remove the "open" class
      }
    });

    // Toggle the clicked sublist
    if (sublist.classList.contains("open")) {
      sublist.style.maxHeight = null; // Close the sublist
      sublist.classList.remove("open"); // Remove the "open" class
    } else {
      sublist.style.maxHeight = sublist.scrollHeight + "px"; // Open the sublist by setting its max-height
      sublist.classList.add("open"); // Add the "open" class
    }
  });
});

// Select all buttons
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Removes class "active" of the others buttons
    buttons.forEach((btn) => btn.classList.remove("active"));

    // Add class "active" to the clicked button
    button.classList.add("active");
  });
});

document.getElementById("nav-opener").addEventListener("click", () => {
  const neoNav = document.querySelector(".content aside");
  const night = document.querySelector(".night");

  neoNav.classList.toggle("enable");
  night.classList.toggle("enable");
});
