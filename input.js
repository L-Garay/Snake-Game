// Create variable to hold the user's input and their last input
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

// We need to capture user's input based on the arrow key they press. We also have to make sure the user can't double back on themselves (as that isn't allowed in the actual game)
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;

    default:
      break;
  }
});

// so when a key is pressed, the direction is also stored in the 'lastInputDireciton' variable as that is what we use to check the current direction of the snake; then just return the current inputDirection variable
export function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
}
