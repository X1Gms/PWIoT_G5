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
      popup.style.display = "block";
      overlay.style.display = "block";
    });
  });

  // Função para fechar o pop-up de edição
  closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
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
