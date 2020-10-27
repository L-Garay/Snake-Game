import { getInputDirection } from './input.js';

// set how quickly snake will move a second
export const snakeSpeed = 4;

// create the snake 'body' to start at the center of board
const snakeBody = [{ x: 11, y: 11 }];

export function update() {
  addSegments();
  const inputDirection = getInputDirection();
  // this for loop starts at the second to last body part of the snake, and makes its way to the head
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    // the first loop will grab the last body part of the snake and essentially 'moves' it to where the second to last body part is (creates a new object in the process)
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  // then we must update the head based on the user's input
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

// Method takes in the gameBoard, the 21x21 grid located in the div with the id of 'game-board'
export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    // this will create the first block of the snake body using a div element
    const snakeElement = document.createElement('div');
    // ignore the errors, these tell the newly created div element where to render (in this case we have predetermined it to be in the center of the grid)
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    // apply the css class we created in the html file to this newly created div
    snakeElement.classList.add('snake');
    // add the newly created and styled div element to the 21x21 css grid div element called 'game-board' that was passed into the method
    gameBoard.appendChild(snakeElement);
  });
}

// the amount will be determined by the 'expansionRate' variable value that is passed in from food.js method
let newSegments = 0;
export function expandSnake(amount) {
  newSegments += amount;
}
// Once the number of segments to add is determined, this method will essentially make a copy of the last body part and add it to the end of the snakeBody array(the snake body) for however many times
function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}
// This method will determine if any of the snake's body is overlapping with the position of the food
export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}
// Uses this helper function to compare snake's position with food's position
function equalPositions(snakePosition, foodPosition) {
  return (
    snakePosition.x === foodPosition.x && snakePosition.y === foodPosition.y
  );
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}
