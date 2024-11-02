// , '𑀘', '𑀙', '𑀚', '𑀛', '𑀜',
//     '𑀝', '𑀞', '𑀟', '𑀠', '𑀡', '𑀢', '𑀣', '𑀤', '𑀥', '𑀦',
//     '𑀧', '𑀨', '𑀩', '𑀪', '𑀫', '𑀬', '𑀭', '𑀮', '𑀯', '𑀰',
//     '𑀱', '𑀲', '𑀳', '𑀴', '𑀵', '𑀶','𑁒', '𑁓', '𑁔', '𑁕',
//     '𑁖', '𑁗', '𑁘', '𑁙', '𑁚', 'o',

let words = [
  '𑀚', '𑁃', '𑀦', '𑀥', '𑀭', '𑀫','𑀓','𑁂' ,'𑀧','𑁂','𑀭','𑀣','𑀫',' 𑀢','𑀻','𑀭','𑁆','𑀣','𑀁','𑀓','𑀭',' 𑀆','𑀤','𑀺','𑀦','𑀸','𑀣',' 𑀪','𑀕','𑀯','𑀸','𑀦',' 𑀚','𑀻',' 𑀳','𑁃','𑀁', '𑁇'];

const gameArea = document.getElementById('game-area');
const userInput = document.getElementById('user-input');
const scoreDisplay = document.getElementById('score-display');
const shootSound = document.getElementById('shoot-sound');
const explosionSound = document.getElementById('explosion-sound');
let activeWords = [];
let score = 0;
let gameOverOccurred = false;
let currentTargetChar = null;
let isWordActive = false;
let wordIndex = 0; // Track current index in `sentence`


// Function to create a new word in sequence
function createWord() {
    if (!isWordActive && wordIndex < words.length) {
        const word = document.createElement('div');
        word.classList.add('word');
        const nextChar = words[wordIndex]; // Pick the next character in sequence
        word.textContent = nextChar;
        word.style.left = `${Math.random() * (gameArea.offsetWidth - 100)}px`;
        word.style.top = '0px';
        word.dataset.passedMiddle = 'false';
        gameArea.appendChild(word);
        activeWords.push(word);
        isWordActive = true;

        // Advance to the next character
        wordIndex++;
        if (wordIndex >= words.length) {
            // Prompt "Round 1 is cleared" and stop the sequence
            alert("Round 1 is cleared");
            wordIndex = 0; // Optional: Reset if needed for the next round
            return; // Exit the function to prevent continuous looping
        }

        resetButtonHighlights();
        highlightButton(nextChar);
    }
}

// Function to move words downward
function moveWords() {
    const middleY = gameArea.offsetHeight / 2;
    
    for (let i = activeWords.length - 1; i >= 0; i--) {
        const word = activeWords[i];
        let currentTop = parseInt(word.style.top);
        word.style.top = `${currentTop + 1}px`;

        if (currentTop >= middleY && word.dataset.passedMiddle === 'false') {
            word.dataset.passedMiddle = 'true';
            isWordActive = false;
            createWord();
        }

        if (currentTop >= gameArea.offsetHeight - 30) {
            if (word.parentNode) {
                gameArea.removeChild(word);
            }
            activeWords.splice(i, 1);
            isWordActive = false;
            createWord();
            updateScore(-1);
        }
    }
}
// Function to check input against active words
function checkInput() {
    const inputText = userInput.value.trim();
    let foundMatch = false; // Flag to track if a match was found

    for (let i = activeWords.length - 1; i >= 0; i--) {
        const word = activeWords[i];
        if (inputText === word.textContent) {
            launchRocket(word);
            isWordActive = false;
            createWord();
            resetButtonHighlights();
            createWord();
            foundMatch = true; // Set flag to true if a match is found
            break; // Exit loop once a match is found
        }
    }

    // If no match is found, clear the input box
    if (!foundMatch) {
        userInput.value = '';
    }
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
setInterval(createWord, 4000);  // Generate a new word every 2 seconds
setInterval(moveWords, 300);     // Move words down every 50ms

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

// Function to highlight a button by character with a blinking outline effect
function highlightButton(char) {
    const button = document.querySelector(`#keyboard button[data-char="${char}"]`);
    if (button) {
        let blinkCount = 0;
        
        // Add a class for the highlight animation
        button.classList.add('highlight-ready');
        
        const blinkInterval = setInterval(() => {
            if (blinkCount < 3) {
                // Toggle highlight class
                button.classList.add('highlight-active');
                
                // Remove highlight after a short delay
                setTimeout(() => {
                    button.classList.remove('highlight-active');
                }, 250);
                
                blinkCount++;
            } else {
                // Stop the blinking effect and cleanup
                clearInterval(blinkInterval);
                button.classList.remove('highlight-ready');
            }
        }, 500);
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

const style = document.createElement('style');
style.textContent = `
.soul {
    position: absolute;
    font-size: 24px;
    color: #FFD700;
    text-shadow: 0 0 10px #FFD700;
    pointer-events: none;
    transition: all 0.8s ease-out;
    z-index: 1000;
}

.highlight-text {
    background-color: #FFD700;
    transition: background-color 0.5s ease-out;
}
`;
document.head.appendChild(style);

// Modify the launchRocket function to include the soul animation
function launchRocket(targetWord) {
    const rocket = document.createElement('div');
    rocket.classList.add('rocket');
    
    const gameAreaRect = gameArea.getBoundingClientRect();
    const wordRect = targetWord.getBoundingClientRect();
    
    const targetX = wordRect.left - gameAreaRect.left + (wordRect.width / 2) - 5;
    const startY = gameAreaRect.height - 30;
    
    rocket.style.left = `${targetX}px`;
    rocket.style.bottom = '10px';
    gameArea.appendChild(rocket);
    
    shootSound.play();
    userInput.value = '';
    
    const targetY = wordRect.top - gameAreaRect.top;
    rocket.style.transition = 'top 0.5s linear';
    rocket.offsetHeight;
    rocket.style.top = `${targetY}px`;
    
    setTimeout(() => {
        createExplosion(targetWord);
        if (targetWord.parentNode) {
            gameArea.removeChild(targetWord);
        }
        activeWords = activeWords.filter(w => w !== targetWord);
        if (rocket.parentNode) {
            gameArea.removeChild(rocket);
        }
        updateScore(1);
        createSoulAnimation(targetWord.textContent);
    }, 500);
}

// Add this new function for the soul animation
function createSoulAnimation(character) {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const leftTextArea = document.querySelector('[placeholder*="𑀅"]');
    const rightTextArea = document.querySelector('[placeholder*="श्री"]');

    // Create two souls (one for each text area)
    const soulLeft = document.createElement('div');
    const soulRight = document.createElement('div');
    
    soulLeft.classList.add('soul');
    soulRight.classList.add('soul');
    
    soulLeft.textContent = character;
    soulRight.textContent = character;
    
    // Position souls at explosion point
    const startX = gameAreaRect.left + (gameAreaRect.width / 2);
    const startY = gameAreaRect.top + (gameAreaRect.height / 2);
    
    document.body.appendChild(soulLeft);
    document.body.appendChild(soulRight);
    
    // Set initial positions
    soulLeft.style.left = `${startX}px`;
    soulLeft.style.top = `${startY}px`;
    soulRight.style.left = `${startX}px`;
    soulRight.style.top = `${startY}px`;
    
    // Remove yellow shadow or glow
    soulLeft.style.textShadow = 'none';
    soulRight.style.textShadow = 'none';

    // Force reflow
    soulLeft.offsetHeight;
    soulRight.offsetHeight;
    
    // Animate to respective text areas
    const leftTargetRect = leftTextArea.getBoundingClientRect();
    const rightTargetRect = rightTextArea.getBoundingClientRect();
    
    soulLeft.style.left = `${leftTargetRect.left + 70}px`;
    soulLeft.style.color = 'black';
    soulLeft.style.top = `${leftTargetRect.top + 35}px`;
    
    soulRight.style.left = `${rightTargetRect.left + 70}px`;
    soulRight.style.color = 'black';
    soulRight.style.top = `${rightTargetRect.top + 35}px`;
    
    // Add a transition end event listener for the left soul
    soulLeft.addEventListener('transitionend', () => {
        if (document.body.contains(soulLeft)) {
            document.body.removeChild(soulLeft);
        }// Remove soulLeft once it reaches the target
        verifyleftTextAreas(); // Highlight text after soul removal
    });

    // Add a transition end event listener for the right soul
    soulRight.addEventListener('transitionend', () => {
        if (document.body.contains(soulRight)) {
            document.body.removeChild(soulRight);
        }; // Remove soulRight once it reaches the target
        updateTextArea(); // Highlight text after soul removal  character
    });
}

// Store state globally
let spans = null;
let currentIndex = 0;
let isProcessing = false; // Add a processing flag

function updateTextArea() {
    // If already processing, exit immediately
    if (isProcessing) {
        console.log("Already processing, skipping call");
        return;
    }
    
    isProcessing = true; // Set processing flag
    console.log("------- Function Start -------");
    const rightTextArea = document.getElementById("righttextarea");
    
    // Initialize spans only if they don't exist
    if (!spans) {
        console.log("Creating new spans");
        const text = rightTextArea.textContent;
        const characters = [...text];
        
        const processedHTML = characters.map(char => {
            if (char === ' ') {
                return ' ';
            }
            return `<span data-revealed="false" style="color: transparent; -webkit-text-stroke: 0.3px black;">${char}</span>`;
        }).join('');
        
        rightTextArea.innerHTML = processedHTML;
        spans = Array.from(rightTextArea.getElementsByTagName('span'));
        console.log(`Created ${spans.length} character spans`);
    }

    // Log current state
    console.log("Current spans state:");
    spans.forEach((span, index) => {
        console.log(`Span ${index}: "${span.textContent}" - Revealed: ${span.dataset.revealed}`);
    });

    // Only reveal one character and exit
    if (currentIndex < spans.length) {
        const currentSpan = spans[currentIndex];
        
        if (currentSpan.dataset.revealed === "false") {
            console.log(`Revealing: "${currentSpan.textContent}"`);
            currentSpan.style.color = 'black';
            currentSpan.dataset.revealed = "true";
            currentIndex++;
            
            // Log final state
            console.log("Final spans state:");
            spans.forEach((span, index) => {
                console.log(`Span ${index}: "${span.textContent}" - Revealed: ${span.dataset.revealed}`);
            });
        }
    }

    // Reset processing flag after a small delay
    setTimeout(() => {
        isProcessing = false;
    }, 100); // 100ms delay before allowing next call
}

function resetTextArea() {
    console.log("Resetting text area");
    if (spans) {
        spans.forEach(span => {
            span.style.color = 'transparent';
            span.dataset.revealed = "false";
        });
        currentIndex = 0;
        isProcessing = false;
    }
}

function isComplete() {
    return spans && currentIndex >= spans.length;
}


function verifyleftTextAreas() {
    const leftTextArea = document.getElementById("lefttextarea");
    

    if (!leftTextArea .innerHTML.includes("span")) {
        leftTextArea .innerHTML = leftTextArea .textContent.split('').map(char => {
            return `<span style="color: transparent; -webkit-text-stroke: 0.3px black;">${char}</span>`;
        }).join('');
    }
    
    // Get all span elements (characters) in the text area
    const characterSpans = leftTextArea .querySelectorAll('span');

    // Change the first non-black character to black
    for (let span of characterSpans) {
        if (span.style.color === 'transparent') {
            span.style.color = 'black';
            break;
        }
    }
}


window.onpopstate = function(event) {
        // Redirect to your desired page when the back button is pressed
        window.location.href = 'index.html'; // Replace with the correct filename or URL
    };

    // Add a new history state when the page loads
    window.onload = function() {
        history.pushState({}, '', window.location.href);
    };



