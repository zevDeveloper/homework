const createBtn = document.querySelector(".create");
const colorInput = document.querySelector("#ballColor");
const radiusInput = document.querySelector("#ballRadius");

const theCanvas = document.querySelector("#theCanvas");

const context = theCanvas.getContext("2d");

function sizeCanvas() {
  theCanvas.width = window.innerWidth;
  theCanvas.height = window.innerHeight;
}
sizeCanvas();
window.addEventListener("resize", sizeCanvas);

const ballArray = [];
class Ball {
  constructor(radius, clr) {
    this.radius = radius;
    this.color = clr;
    this.x = this.radius + 1;
    this.y = this.radius + 1;
    this.dx = 1;
    this.dy = 2;
  }

  draw() {
    setInterval(() => {
      context.clearRect(0, 0, theCanvas.width, theCanvas.height);
      context.fillStyle = this.color;
      context.beginPath();

      this.x += this.dx;
      this.y += this.dy;
      if (
        this.x < this.radius + 1 ||
        this.x >= window.innerWidth - (this.radius + 1)
      ) {
        this.dx = -this.dx;
      }
      if (
        this.y < this.radius + 1 ||
        this.y >= window.innerHeight - (this.radius + 1)
      ) {
        this.dy = -this.dy;
      }

      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();
    }, 1);
  }
}

createBtn.addEventListener("click", function () {
  const ball = new Ball(parseInt(radiusInput.value), colorInput.value);
  ball.draw();
});
