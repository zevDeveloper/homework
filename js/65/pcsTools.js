function getElement(selector) {
  return document.querySelector(selector);
}

function setCss(element, property, value) {
  // element.style.property = value;
  element.style[property] = value;
}

function getCss(element, property) {
  // return element.style[property];
  return getComputedStyle(element)[property];
}

function on(element, eventType, callback) {
  element.addEventListener(eventType, callback);
}

function click(element, callback) {
  on(element, "click", callback);
}

function hide(element) {
  setCss(element, "display", "none");
}

function show(element) {
  setCss(element, "display", "inline-block");
}
////
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777217)
    .toString("16")
    .padStart(6, "0")}`;
}
////
function sparkle(element, duration, speed) {
  const intrvl = setInterval(() => {
    setCss(element, "color", getRandomColor());
  }, speed);

  setTimeout(() => clearInterval(intrvl), duration);
}
function Text(element, string){
 if (arguments.length < 2) {
        return element.innerText;
      } else {
        element.innerText = string;
      }
}
const p = getElement('#potus');
console.log(Text(p)); 
Text(p,'Barak Obama');
///////
export default function (selector) {
  const element = getElement(selector);

  return {
    css: function (property, value) {
      console.log(arguments);

      if (arguments.length < 2) {
        return getCss(element, property);
      } else {
        setCss(element, property, value);
      }
    },
    on: (eventType, callback) => on(element, eventType, callback),
    click: (callback) => click(element, callback),
  };
}
