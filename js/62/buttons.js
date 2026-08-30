"use strict";
const parent = document.querySelector(".buttons");
const button = document.querySelector("button");

// button.addEventListener("click", function (e) {
//   createNew(e.target.innerText);
// });

// function createNew(num){
//  const newButton = document.createElement("button");
//  newButton.innerText = parseInt(num) + 1;
//   parent.appendChild(newButton);
//   newButton.addEventListener("click", function (e) {
//   createNew(e.target.innerText);
// });
// };

parent.addEventListener("click", (e) => {
  console.log(e.target.innerText);
  createNew(e.target.innerText);
});

function createNew(x) {
  const newButton = document.createElement("button");
  newButton.innerText = parseInt(x) + 1;
  parent.appendChild(newButton);
}
