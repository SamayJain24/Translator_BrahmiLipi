let words = [
    '𑁒', '𑁓', '𑁔', '𑁕', '𑁖', '𑁗', '𑁘', '𑁙', '𑁚', 'o',
    '𑀅', '𑀆', '𑀇', '𑀈', '𑀉', '𑀊', '𑀏', '𑀐', '𑀑', '𑀒',
    '𑀓', '𑀔', '𑀕', '𑀖', '𑀗', '𑀘', '𑀙', '𑀚', '𑀛', '𑀜',
    '𑀝', '𑀞', '𑀟', '𑀠', '𑀡', '𑀢', '𑀣', '𑀤', '𑀥', '𑀦',
    '𑀧', '𑀨', '𑀩', '𑀪', '𑀫', '𑀬', '𑀭', '𑀮', '𑀯', '𑀰',
    '𑀱', '𑀲', '𑀳', '𑀴', '𑀵', '𑀶'
];

const gameArea = document.getElementById('game-area');
const userInput = document.getElementById('user-input');
const scoreDisplay = document.getElementById('score-display');
const shootSound = document.getElementById('shoot-sound');
const explosionSound = document.getElementById('explosion-sound');
let activeWords = [];
let score = 0;
let gameOverOccurred = false;


// Function to highlight a button by character
function highlightButton(char) {
    const button = document.querySelector(`#keyboard button[data-char="${char}"]`);
    if (button) {
        
        button.style.backgroundColor = "#FFB300"; // Temporary highlight background color
        button.style.clipPath = "none"; // Optional: Disable clip-path during highlight if desired

        // Reset style after a brief delay (e.g., 500 ms)
        setTimeout(() => {
            button.style.border = "none"; // Reset border
            button.style.background = "linear-gradient(90deg, rgba(185,152,76,1) 0%, rgba(241,227,211,1) 45%, rgba(185,152,76,1) 100%)"; // Reset gradient background
            button.style.clipPath = "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)"; // Reset clip-path
        }, 500); // Adjust delay as needed
    }
}

// Function to remove highlight from all buttons
function resetButtonHighlights() {
    const buttons = document.querySelectorAll('#keyboard button');
    buttons.forEach(button => {
        button.style.border = "none";
        button.style.backgroundColor = ""; // reset background color
    });
}

// Function to create a new word
function createWord() {
    const word = document.createElement('div');
    word.classList.add('word');
    const randomChar = words[Math.floor(Math.random() * words.length)];
    word.textContent = randomChar;
    word.style.left = `${Math.random() * (gameArea.offsetWidth - 100)}px`;
    word.style.top = '0px';
    gameArea.appendChild(word);
    activeWords.push(word);

    // Highlight corresponding button
    resetButtonHighlights(); // Clear previous highlights
    highlightButton(randomChar);
}

// Function to move words downward and handle when they reach the bottom
function moveWords() {
    activeWords.forEach((word, index) => {
        let currentTop = parseInt(word.style.top);
        word.style.top = `${currentTop + 1}px`;

        // Remove word and trigger game over if it reaches the bottom of the game area
        if (currentTop >= gameArea.offsetHeight - 30) {
            gameArea.removeChild(word);
            activeWords.splice(index, 1);
            triggerGameOver();

            // Reset button highlight if game over occurs
            resetButtonHighlights();
        }
    });
}

// Function to check input against active words
function checkInput() {
    const inputText = userInput.value.trim();
    for (let i = 0; i < activeWords.length; i++) {
        if (inputText === activeWords[i].textContent) {
            launchRocket(activeWords[i]);
            resetButtonHighlights(); // Clear highlight after successful input
            return;
        }
    }
}

// Function to launch a rocket towards a target word
function launchRocket(targetWord) {
    const rocket = document.createElement('div');
    rocket.classList.add('rocket');
    rocket.style.left = `${targetWord.offsetLeft + targetWord.offsetWidth / 2 - 5}px`;
    rocket.style.top = '90%';
    gameArea.appendChild(rocket);

    shootSound.play(); // Play rocket launch sound
    userInput.value = ''; // Clear input after launching the rocket

    // After a delay, handle the explosion and scoring
    setTimeout(() => {
        createExplosion(targetWord);
        gameArea.removeChild(targetWord);
        activeWords = activeWords.filter(w => w !== targetWord);
        gameArea.removeChild(rocket);
        updateScore();
    }, 500);
}

// Function to create an explosion effect
function createExplosion(targetWord) {
    const explosion = document.createElement('div');
    explosion.classList.add('explosion');
    explosion.style.left = `${targetWord.offsetLeft + targetWord.offsetWidth / 2 - 15}px`;
    explosion.style.top = `${targetWord.offsetTop}px`;
    gameArea.appendChild(explosion);
    
    explosionSound.play(); // Play explosion sound

    // Remove explosion element after animation
    setTimeout(() => {
        gameArea.removeChild(explosion);
    }, 100);
}

// Update score and display
function updateScore() {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Handle game over logic
function triggerGameOver() {
    if (gameOverOccurred) return; // Prevent multiple game over triggers
    gameOverOccurred = true; // Set flag to indicate game over
    alert(`Game Over! Your final score is: ${score}`);

    // Reset the game state
    activeWords.forEach(word => gameArea.removeChild(word));
    activeWords = [];
    score = 0;
    userInput.value = '';
    scoreDisplay.textContent = `Score: ${score}`;
}

// Reset game for replay
function resetGame() {
    gameOverOccurred = false; // Allow game over to occur again
}

// Event listener to check input change
userInput.addEventListener('input', checkInput);

// Create words and move them down the screen periodically
setInterval(createWord, 2000);  // Generate a new word every 2 seconds
setInterval(moveWords, 100);     // Move words down every 50ms

// Keyboard interaction for custom keyboard on screen
document.addEventListener("DOMContentLoaded", function() {
    const keys = document.querySelectorAll(".keyboard button");
    keys.forEach(key => {
        key.addEventListener("click", () => {
            const char = key.getAttribute("data-char");
            if (char === "←") {
                // Backspace functionality
                userInput.value = userInput.value.slice(0, -1);
                checkInput();
            } else {
                // Insert character and check input
                userInput.value += char;
                checkInput();
            }
        });
    });
});

