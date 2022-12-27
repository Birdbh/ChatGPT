const container = document.getElementById('container');
const ball = document.getElementById('ball');
const counter = document.getElementById('counter');

let xVelocity = 5;
let yVelocity = 5;
let xPosition = 0;
let yPosition = 0;
let numCollisions = 0;

function updatePosition() {
  xPosition += xVelocity;
  yPosition += yVelocity;

  ball.style.left = xPosition + 'px';
  ball.style.top = yPosition + 'px';

  // Check for wall collisions
  if (xPosition + ball.offsetWidth > container.offsetWidth || xPosition < 0) {
    xVelocity = -xVelocity;
    numCollisions++;
  }
  if (yPosition + ball.offsetHeight > container.offsetHeight || yPosition < 0) {
    yVelocity = -yVelocity;
    numCollisions++;
  }

  // Update counter
  counter.innerHTML = numCollisions;
}

setInterval(updatePosition, 10);

const spaceship = document.getElementById('spaceship');

let spaceshipX = window.innerWidth / 2 - spaceship.offsetWidth / 2;;
let spaceshipY = window.innerHeight / 2 - spaceship.offsetHeight / 2;;
let spaceshipSpeedX = 0;
let spaceshipSpeedY = 0;
let accelerationX = 0;
let accelerationY = 0;
let deceleration = 0.95;
let collision = false;

const heartsContainer = document.getElementById('hearts-container');
const resetButton = document.getElementById('reset-button');

let hearts = 3;

document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 37: // Left arrow
      accelerationX = -0.25;
      break;
    case 38: // Up arrow
      accelerationY = -0.25;
      break;
    case 39: // Right arrow
      accelerationX = 0.25;
      break;
    case 40: // Down arrow
      accelerationY = 0.25;
      break;
  }
});

document.addEventListener('keyup', event => {
  switch (event.keyCode) {
    case 37: // Left arrow
      accelerationX = 0;
      break;
    case 38: // Up arrow
      accelerationY = 0;
      break;
    case 39: // Right arrow
      accelerationX = 0;
      break;
    case 40: // Down arrow
      accelerationY = 0;
      break;
  }

});

setInterval(updateSpaceship, 10);

function updateSpaceship() {
    console.log(hearts)
    heartsContainer.innerHTML = '';
    for (let i = 0; i < hearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heartsContainer.appendChild(heart);
    }
   // Get the bounding rectangles for the ball and the spaceship
   const ballRect = ball.getBoundingClientRect();
   const spaceshipRect = spaceship.getBoundingClientRect();
 
   // Check if the ball and spaceship intersect
   if (ballRect.left < spaceshipRect.right && ballRect.right > spaceshipRect.left && ballRect.top < spaceshipRect.bottom && ballRect.bottom > spaceshipRect.top) {
     // Collision detected!
     collision = true;
     hearts--;
   }
  spaceshipSpeedX += accelerationX;
  spaceshipSpeedY += accelerationY;

  // Decelerate the spaceship when no keys are pressed
  if (accelerationX === 0) {
    spaceshipSpeedX *= deceleration;
  }
  if (accelerationY === 0) {
    spaceshipSpeedY *= deceleration;
  }

  // Update the position of the spaceship based on its speed
  spaceshipX += spaceshipSpeedX;
  spaceshipY += spaceshipSpeedY;
  
  if (spaceshipX < 0 || spaceshipX + spaceship.offsetWidth > window.innerWidth || spaceshipY < 0 || spaceshipY + spaceship.offsetHeight > window.innerHeight) {
    collision = true;
    hearts--;
    spaceshipX = window.innerWidth / 2 - spaceship.offsetWidth / 2;
    spaceshipY = window.innerHeight / 2 - spaceship.offsetHeight / 2;
  }

  if (collision) {
    // Display the explosion and apply the explosion animation
    spaceship.style.display = 'none';
    explosion.style.display = 'block';
    explosion.style.animation = 'explosion 0.5s';
    explosion.style.left = spaceshipX + 'px';
    explosion.style.top = spaceshipY + 'px';

    // Reset the collision variable after the animation has completed
    setTimeout(() => {
      collision = false;
      spaceship.style.display = 'block';
      explosion.style.display = 'none';
      explosion.style.animation = '';
      spaceshipX = window.innerWidth / 2 - spaceship.offsetWidth / 2;
      spaceshipY = window.innerHeight / 2 - spaceship.offsetHeight / 2;
      spaceshipSpeedX = 0;
      spaceshipSpeedY = 0;
    }, 500);
  } else {
    spaceship.style.left = spaceshipX + 'px';
    spaceship.style.top = spaceshipY + 'px';
  }
  if (hearts === 0) {
    gameOver = true;
    const gameOver = document.createElement('div');
    gameOver.className = 'game-over';
    gameOver.innerHTML = 'Game Over';
    container.appendChild(gameOver);
  }

}

