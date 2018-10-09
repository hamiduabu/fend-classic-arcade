let isGameOver = false;
const button = document.querySelector('button');
const scoreTitle = document.querySelector('#score-title');
let count = 0;

// Enemy class. Enemies our player must avoid
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
  }

  /*
   * Update the enemy's position, required method for game
   * Parameter: dt, a time delta between ticks
   *  You should multiply any movement by the dt parameter
   *  which will ensure the game runs at the same speed for
   *  all computers.
   */
  update(dt) {
    if (this.x < 505) {
      this.x += getRandomPosition(100, 400) * dt;
    } else {
      this.x = getRandomPosition(-2000, -100);
    }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Player class
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
  }
  update() {
    // Win condition. Each win increases score by one(1)
    let score = document.querySelector('#score-value');
    if (this.y === -15) {
      setTimeout(() => {
        this.y = 400;
      }, 10); // Values above 10ms increases count by more than one.
      count++;
    }
    score.innerHTML = count;

    // Collision detection. Each collision reduces score by one(1)
    allEnemies.forEach(enemy => {
      if (enemy.x >= this.x - 70 && enemy.x < this.x && enemy.y === this.y) {
        player.y = 400;
        count--;
      }
    });

    // Game over condition
    if (count < 0) {
      allEnemies = [];
      this.y = 400;
      isGameOver = true;
      score.innerHTML = 'Ouch! Game Over!';
      button.style.visibility = 'visible';
      scoreTitle.style.display = 'none';
    }

    // Add/Increase enemies based on specific conditions
    addEnemies();
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // a handleInput() method.
  handleInput(key) {
    if (isGameOver) {
      return;
    }
    switch (key) {
      case 'up':
        if (this.y >= 68) {
          this.y -= 83;
        }
        break;
      case 'right':
        if (this.x <= 301) {
          this.x += 100;
        }
        break;
      case 'down':
        if (this.y <= 317) {
          this.y += 83;
        }
        break;
      case 'left':
        if (this.x >= 99) {
          this.x -= 100;
        }
        break;
    }
  }
}

// Instantiate objects.
const bug01 = new Enemy(-100, 68);
const bug02 = new Enemy(-100, 151);
const bug03 = new Enemy(-100, 234);
const bug04 = new Enemy(-100, 68);
const bug05 = new Enemy(-100, 151);
const bug06 = new Enemy(-100, 234);

let allEnemies = [];

// Add/Increase enemies based on specific conditions to make the game a little less boring.
function addEnemies() {
  let totalEnemies = allEnemies.length;
  switch (count) {
    case 0:
      addBug(0, bug01);
      break;
    case 1:
      addBug(1, bug02);
      break;
    case 2:
      addBug(2, bug03);
      break;
    case 3:
      addBug(3, bug04);
      break;
    case 4:
      addBug(4, bug05);
      break;
    case 5:
      addBug(5, bug06);
      break;

    // This doesn't add addtional enemies but increases the speed/movement of existing enemies
    case 10:
      if (totalEnemies === 6) {
        allEnemies.push(bug01, bug02, bug03, bug04, bug05, bug06);
      }
      break;
    case 15:
      if (totalEnemies === 12) {
        allEnemies.push(bug01, bug02, bug03, bug04, bug05, bug06);
      }
      break;

      function addBug(value, newbug) {
        if (totalEnemies === value) {
          allEnemies.push(newbug);
        }
      }
  }
}

// Instantiate player object
const player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

button.addEventListener('click', function() {
  if (!isGameOver) {
    return;
  } else {
    count = 0;
    player.y = 400;
    addEnemies();
    isGameOver = false;
    button.style.visibility = 'hidden';
    scoreTitle.style.display = 'initial';
  }
});

// Random number function from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomPosition(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
