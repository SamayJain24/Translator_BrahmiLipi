let words = ['𑀦',"𑀦𑀫𑀲𑁆𑀢𑁂", "type", "𑀚𑁃𑀦", "𑀔𑀼𑀰", "𑀚𑁃𑀦𑀥𑀭𑁆𑀫", "speed", "𑀫𑀳𑀸𑀯𑀻𑀭", "skill", "accuracy", "focus"];
const gameArea = document.getElementById('game-area');
const userInput = document.getElementById('user-input');
const scoreDisplay = document.getElementById('score-display');
const shootSound = document.getElementById('shoot-sound');
const explosionSound = document.getElementById('explosion-sound');
let activeWords = [];
let score = 0;

function createWord() {
    const word = document.createElement('div');
    word.classList.add('word');
    word.textContent = words[Math.floor(Math.random() * words.length)];
    word.style.left = `${Math.random() * (gameArea.offsetWidth - 100)}px`;
    word.style.top = '0px';
    gameArea.appendChild(word);
    activeWords.push(word);
}

function moveWords() {
    activeWords.forEach(word => {
        let currentTop = parseInt(word.style.top);
        word.style.top = `${currentTop + 1}px`;

        if (currentTop > gameArea.offsetHeight - 30) {
            gameOver();
        }
    });
}


function checkInput() {
    const inputText = userInput.value.trim().toLowerCase();
    for (let i = 0; i < activeWords.length; i++) {
        if (inputText === activeWords[i].textContent.toLowerCase()) {
            launchRocket(activeWords[i]);
            return;
        }
    }
}

function launchRocket(targetWord) {
    const rocket = document.createElement('div');
    rocket.classList.add('rocket');
    rocket.style.left = `${targetWord.offsetLeft + targetWord.offsetWidth / 2 - 5}px`;
    rocket.style.top = '90%';
    gameArea.appendChild(rocket);

    shootSound.play();  // Play rocket launch sound

    userInput.value = '';  // Clear input immediately after launching the rocket

    setTimeout(() => {
        createExplosion(targetWord);
        gameArea.removeChild(targetWord);
        activeWords = activeWords.filter(w => w !== targetWord);
        gameArea.removeChild(rocket);
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }, 1000);
}


function createExplosion(targetWord) {
    const explosion = document.createElement('div');
    explosion.classList.add('explosion');
    explosion.style.left = `${targetWord.offsetLeft + targetWord.offsetWidth / 2 - 15}px`;
    explosion.style.top = `${targetWord.offsetTop}px`;
    gameArea.appendChild(explosion);
    
    explosionSound.play();  // Play explosion sound

    setTimeout(() => {
        gameArea.removeChild(explosion);
    }, 500);
}

let gameOverOccurred = false; // Flag to check if game over has occurred

function gameOver() {
    if (gameOverOccurred) return; // If game over has already happened, do nothing
    
    gameOverOccurred = true; // Set flag to true when game over occurs
    alert("Game Over! Your score is: " + score);
    
    activeWords.forEach(word => {
        gameArea.removeChild(word);
    });
    activeWords = [];
    score = 0;
    userInput.value = '';
    scoreDisplay.textContent = `Score: ${score}`;
}

// Reset the gameOverOccurred flag if needed to restart the game
function resetGame() {
    gameOverOccurred = false; // Allow game over to occur again
    // Additional reset logic if necessary
}


userInput.addEventListener('change', checkInput);

setInterval(createWord, 2000);  // Generate a new word every 2 seconds
setInterval(moveWords, 200);     // Move words down the screen every 50ms

document.addEventListener("DOMContentLoaded", function() {
    const textInput = document.getElementById("user-input");
    const keys = document.querySelectorAll(".keyboard button");
  
    keys.forEach(key => {
      key.addEventListener("click", () => {
        const char = key.getAttribute("data-char");
  
        if (char === "←") {
          // Backspace functionality
          textInput.value = textInput.value.slice(0, -1);
          checkInput();
        } else {
          // Insert character
          textInput.value += char;
          checkInput();
        }
      });
    });
  });
