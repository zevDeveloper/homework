function Vehicle(clr) {
  this.color = clr;
}
Vehicle.prototype.go = function (spd) {
  this.speed = spd;
  console.log(`the vehicle is going ${this.speed} miles per hour `);
};
Vehicle.prototype.print = function () {
  console.log(`the vehicle is ${this.color}.`);
};

const car = new Vehicle("red");
car.print();
car.go(60);

function Plane(color) {
  //const pln = Object.create(Vehicle);
  //this.speed = spd;
  this.color = color;
}
Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;
Plane.prototype.go = function (spd) {
  this.speed = spd;
  console.log(`the vehicle is flying ${this.speed} miles per hour `);
};

const plane1 = new Plane("White");

plane1.print();
plane1.go(360);
console.log(plane1);
//////
// class Vehicle  {
//   constructor(clr){
//     this.color = clr;
// }

// };
