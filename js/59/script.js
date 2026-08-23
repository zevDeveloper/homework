"use strict";

function multiply(a, b) {
  console.log(a * b);
}
multiply(3, 3);
////////

function gettMultiplier() {
  return function (a, b) {
    console.log(a * b);
  };
}
gettMultiplier()(2, 4);
//////

function getMultiplier(b) {
  return function (a) {
    return a * b;
  };
}
var multiplyByFive = getMultiplier(5);
console.log(multiplyByFive(2));
var multiplyBySix = getMultiplier(6);
console.log(multiplyBySix(2));

//////

function ourEvery(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i]) === false) {
      return console.log(false);
    }
  }
  return console.log(true);
}
///
const arr = ["a", "b", "c", "d"];
///
function isUpper(x) {
  const result = x === x.toUpperCase();
  return result;
}
function isLower(x) {
  const result = x === x.toLowerCase();
  return result;
}
///
ourEvery(arr, isUpper);
ourEvery(arr, isLower);
console.log(arr.every(isUpper));
console.log(arr.every(isLower));
/////
const arr2 = ["a", "B", "c", "d"];
function ourSome(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i]) === true) {
      return console.log(true);
    }
  }
  return console.log(false);
}

ourSome(arr2, isUpper);
ourSome(arr2, isLower);

console.log(arr2.some(isUpper));
console.log(arr2.some(isLower));
