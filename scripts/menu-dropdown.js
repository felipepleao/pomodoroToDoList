export default function menuDropdown() {
  const menuDrop = document.querySelector(".todolist__title-menu");

  menuDrop.addEventListener("click", handleClick);

  function handleClick() {
    this.classList.add("active");
    outsideClick(this, () => {
      this.classList.remove("active");
    });
  }

  function outsideClick(element, callback) {
    const html = document.documentElement;
    const outside = "data-outside";

    if (!element.hasAttribute(outside)) {
      html.addEventListener("click", handleOutsideClick);
      element.setAttribute(outside, "");
    }

    function handleOutsideClick(event) {
      if (!element.contains(event.target)) {
        element.removeAttribute(outside);
        html.removeEventListener("click", handleOutsideClick);
        callback();
      }
    }
  }
}
