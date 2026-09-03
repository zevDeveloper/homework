import showMessage from "./messageBox.js";
let buttonsArr = ["yes", "no", "maybe"];
showMessage("is this enough homework?", buttonsArr, console.log(buttonsArr));

const msgInput = document.querySelector("#msg");

document.querySelector("#showMessage").addEventListener("submit", (e) => {
  e.preventDefault();
  showMessage(msgInput.value);
});
