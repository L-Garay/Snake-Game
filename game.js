import {
  snakeSpeed,
  draw as drawSnake,
  update as updateSnake,
} from './snake.js';
import { draw as drawFood, update as updateFood } from './food.js';

// create variable to hold location of where we want the game to be
const gameBoard = document.getElementById('game-board');

// NOTE Create a game-loop method to repeatedly run to essentially constantly update the game and re-render the screen

// create variable that will hold when the game was last rendered
let lastRenderTime = 0;

function main(currentTime) {
  window.requestAnimationFrame(main);
  // divide by 1000 to turn into seconds
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  // if the time since last render is less than how quickly the snake moves (in this case 1/2 = .5, so every half a second) than we don't need to rerender and we can return out of function
  if (secondsSinceLastRender < 1 / snakeSpeed) return;
  // if the time since last render is greater than how quicly the sname moves, reset the last render time and then they cycle will repeat
  lastRenderTime = currentTime;
  update();
  draw();
}

// Actually run the game
window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
}

function draw() {
  // clear out any previous positions of where the snake used to be (the proper positions will get rerendered)
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
}
