export default function varietyBackground() {
  const html = document.querySelector("html");
  const modes = document.querySelectorAll(
    ".main__container-backgrounds button"
  );
  const btnBackground1 = document.querySelector(".btnBackground1");
  const btnBackground2 = document.querySelector(".btnBackground2");
  const btnBackground3 = document.querySelector(".btnBackground3");

  function removeActive() {
    modes.forEach((mode) => {
      mode.classList.remove("active");
    });
    this.classList.add("active");

    let modeSelect = this.textContent;

    switch (modeSelect) {
      case "Modo1":
        html.setAttribute("data-background", "lofiOne");
        break;
      case "Modo2":
        html.setAttribute("data-background", "lofiTwo");
        break;
      case "Modo3":
        html.setAttribute("data-background", "lofiThree");
        break;
      default:
        console.log("nenhum modo");
    }
  }

  btnBackground1.addEventListener("click", removeActive);
  btnBackground2.addEventListener("click", removeActive);
  btnBackground3.addEventListener("click", removeActive);
}
