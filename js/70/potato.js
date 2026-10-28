const refresh = document.querySelector(".newBtn");
const pics = document.querySelectorAll(".parts");
const sidebar = document.querySelector(".side");
const music = document.querySelector("audio");

//music.play();
let draggee = null;
let offset;
let part;
let z = 0;
window.addEventListener("mousedown", (e) => {
  if (e.target.closest(".parts")) {
    console.log("mouse down", e);

    z++;
    e.target.style.position = "absolute";
    e.target.style.zIndex = z.toString();
    offset = { x: e.offsetX, y: e.offsetY };

    window.addEventListener("mousemove", handleMouseMove);

    document.addEventListener("pointerup", handleMouseUp);

    // added after class, save draggee
    draggee = e.target;
  }
});

function handleMouseMove(e) {
  console.log("mouse move", e);

  /*e.target.style.top = `${e.clientY - offset.y}px`;
  e.target.style.left = `${e.clientX - offset.x}px`;*/

  // added after class, use save draggee not e.target. Can get mixed up when mouse crosses other boxes. Mentioned this approach in class but we already had e.target in place from step before.
  draggee.style.top = `${e.clientY - offset.y}px`;
  draggee.style.left = `${e.clientX - offset.x}px`;
}

function handleMouseUp(e) {
  console.log("mouse up");

  window.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("pointerup", handleMouseUp);
}
