const theCanvas = document.querySelector("#theCanvas");

const context = theCanvas.getContext("2d");

const SNAKE_SIZE = 64;

function sizeCanvas() {
  theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
  theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
}
sizeCanvas();
window.addEventListener("resize", sizeCanvas);
const gameOverSound = new Audio("over.mp3");
const coinSound = new Audio("coin.mp3");
const snakeHead = document.createElement("img");
snakeHead.src = "snakeHead.png";
let appleX;

let appleY;
function randomApplePosition() {
  appleX =
    Math.floor(Math.random() * (theCanvas.width / SNAKE_SIZE)) * SNAKE_SIZE;
  appleY =
    Math.floor(Math.random() * (theCanvas.height / SNAKE_SIZE)) * SNAKE_SIZE;
}

const apple = document.createElement("img");
apple.src = "apple.png";
let appleSize = randomApplePosition();
let x = -SNAKE_SIZE;
let y = 0;

let direction = "ArrowRight";
let score = 0;
// let gameOver = false;

snakeHead.onload = () => {
  const game = setInterval(() => {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);

    switch (direction) {
      case "ArrowUp":
        y -= SNAKE_SIZE;
        break;
      case "ArrowDown":
        y += SNAKE_SIZE;
        break;
      case "ArrowLeft":
        x -= SNAKE_SIZE;
        break;
      case "ArrowRight":
        x += SNAKE_SIZE;
        break;
    }

    context.drawImage(apple, appleX, appleY);
    context.drawImage(snakeHead, x, y);
    score += 1;
    if (x < -SNAKE_SIZE || x > theCanvas.width) {
      console.log("you are out");
      clearInterval(game);
    }
    if (y < 0 || y > theCanvas.height) {
      gameOverSound.play();
      console.log("you are out");
      clearInterval(game);
    }
    if (x == appleX && y == appleY) {
      score += 100;
      coinSound.play();
      randomApplePosition();
    }
    context.fillStyle = "green";
    context.font = "32px Cursive";
    const scoreText = `Score: ${score}`;
    const metrics = context.measureText(scoreText);
    context.fillText(scoreText, theCanvas.width - metrics.width - 10, 36);
  }, 500);
};

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "ArrowDown":
    case "ArrowLeft":
    case "ArrowRight":
      direction = e.key;
      break;
    default:
      console.log(`${e.key} not processed`);
  }
});
