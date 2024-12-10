/**
 * @param {HTMLDivElement} element
 */
export function FormError(element) {
  function show(message) {
    element.style.display = "flex";
    element.innerText = message;
  }

  function hide() {
    element.style.display = "none";
    element.innerText = undefined;
  }

  return {
    show,
    hide,
  };
}
