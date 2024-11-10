// Initialize the current round
let currentRound = 1;
// Variable to check if the game has started
let gameStarted = false;
const muteButton = document.getElementById('muteButton');
const backgroundMusic = document.getElementById("background-music");
const gameArea = document.getElementById('game-area');
const userInput = document.getElementById('user-input');
const scoreDisplay = document.getElementById('score-display');
const shootSound = document.getElementById('shoot-sound');
const explosionSound = document.getElementById('explosion-sound');
const missedWord = document.getElementById('missed-word');
const level = document.getElementById('LEVEL')
const audio = new Audio("media/sounds/Wrong_Answer.mp3");
loadSelectedLevel();
console.log("Selected Level:", currentRound);

// Function to load the selected level if available
function loadSelectedLevel() {
  const savedLevel = localStorage.getItem('selectedLevel');
  if (savedLevel !== null) {
    currentRound = parseInt(savedLevel, 10);
    localStorage.removeItem('selectedLevel'); // Clear after reading
  }
  console.log("Starting at Level:", currentRound);
  return
}
// Update score and display
function updatelevel() {
    level.textContent = `LEVEL ${currentRound}`;
}
// Function to check the status of the Keyboard Hint setting
function loadKeyboardHintStatus() {
    const keyboardHintStatus = localStorage.getItem('keyboardHint');
    if (keyboardHintStatus === null ) {
        console.log("Keyboard Hint status not found. Defaulting to 'on'.");
        return 'on'; // Return 'on' as default if not set
    }
    console.log("Keyboard Hint status:", keyboardHintStatus);
    return keyboardHintStatus; // Returns 'on' or 'off'
}

document.addEventListener("DOMContentLoaded", () => {
    const backgroundMusic = document.getElementById("background-music");
    
    const startGameButton = document.getElementById("start-game-button");

    // Function to start the game
    function startGame() {
        gameStarted = true; // Set the gameStarted variable to true
        startGameButton.style.display = "none"; // Hide the start button

        // Unmute and play background music
        backgroundMusic.muted = false;
        backgroundMusic.volume = 0.2;
        backgroundMusic.play().catch(error => {
            console.log("Error starting audio playback:", error);
        });

        // Call other game initialization functions here
        initializeGame();
    }

    // Attach event listener to the "Start Game" button
    startGameButton.addEventListener("click", startGame);
});




// Add a flag for game pause
let gamePaused = true;

// Select the pause button and icons
const pauseButton = document.getElementById("pauseButton");
const playIcon = pauseButton.querySelector(".play-icon");
const pauseIcon = pauseButton.querySelector(".pause-icon-hidden");


// Add event listener to pause button
pauseButton.addEventListener("click", () => {
    // Toggle the pause/play icon visibility
    playIcon.classList.toggle("pause-icon-hidden");
    pauseIcon.classList.toggle("pause-icon-hidden");
    
    // Toggle game pause state
    gamePaused = !gamePaused;

    const areavideo = document.getElementById('background-video');
    
    // If the game is paused, stop audio/video or animations if necessary
    if (gamePaused) {
        // Any actions to pause audio or animations
        console.log("Game paused");
        shootSound.muted = true;
        explosionSound.muted = true;
        backgroundMusic.muted = true;
        missedWord.muted = true;
        audio.muted =true;
        areavideo.pause();

    } else {
        // Any actions to resume audio or animations
        console.log("Game resumed");
        shootSound.muted = false;
        explosionSound.muted = false;
        backgroundMusic.muted = false;
        missedWord.muted = false;
        audio.muted =false;
        areavideo.play();
    }
});


// Game initialization function
function initializeGame() {
    if (!gameStarted) return; // Prevent initialization if the game hasn't started
    console.log("Game started!");

    // Reset the pause button to "resume" state when the game starts
    gamePaused = false; // Set gamePaused to false to resume the game
    
    // Ensure the pause button shows the "pause" icon and hides the "play" icon
    playIcon.classList.add("pause-icon-hidden"); // Hide play icon
    pauseIcon.classList.remove("pause-icon-hidden"); // Show pause icon

    // Place all game setup code here

}

let rounds = [
    // Round 1 words
    ['𑀚', '𑁃', '𑀦', '𑀥', '𑀭', '𑀫','𑀓','𑁂' ,'𑀧','𑁂','𑀭','𑀣','𑀫','𑀢','𑀻','𑀭','𑁂','𑀣','𑀓','𑀭','𑀆','𑀤','𑀺','𑀦','𑀸','𑀣','𑀪','𑀕','𑀯','𑀸','𑀦','𑀚','𑀻','𑀳','𑁃'],
    // Round 2 words
    ['𑀱','𑀪', '𑀤 ', '𑁂', '𑀯', '𑀚', '𑀻','𑀯','𑀾', '𑀱', '𑀪', '𑀦', '𑀸', '𑀣', '𑀚', '𑀻', '𑀅', '𑁅', '𑀭', '𑀅', '𑀸', '𑀺', '𑀤', '𑀦', '𑀸', '𑀣','𑀚', '𑀻', '𑀬', '𑁂', '𑀢', '𑀻', '𑀦', '𑁄', '𑀦', '𑀸', ' 𑀫', '𑀧𑁆', '𑀭', '𑀣', '𑀫', ' 𑀢', '𑀻', ' 𑀭𑁆', '𑀣', '𑀁', ' 𑀓', '𑀭', '𑀓', '𑁂', '𑀳', '𑀻', '𑀳', '𑁃','𑀁'],
    // Round 3 words 
    ['𑀫', '𑀳', '𑀸', '𑀭', '𑀸', '𑀚', '𑀸', '𑀋', '𑀱', '𑀪', '𑀤', '𑁂', '𑀯', '𑀚', '𑀻', '𑀦', '𑁂', '𑀅', '𑀧', '𑀦', '𑀻', '𑀩', '𑀟', '𑀻', '𑀧', '𑀼', '𑀢𑁆', '𑀭', '𑀻', '𑀩𑁆', '𑀭', '𑀸', '𑀳𑁆', '𑀫', '𑀻', '𑀓', '𑁄', '𑀅', '𑀓𑁆', '𑀱', '𑀭', '𑀮', '𑁂', '𑀔', '𑀦', '𑀓', '𑀻', '𑀓', '𑀮', '𑀸','𑀺', '𑀲', '𑀔', '𑀸', '𑀈'],
    // Round 4 words 
    ['𑀩𑁆', '𑀭', '𑀸','𑀳', '𑀫', '𑀻', '𑀦', '𑁂', '𑀧', '𑀺', '𑀢', '𑀸', '𑀓', '𑁂', '𑀤𑁆', '𑀯', '𑀸', '𑀭', '𑀸', '𑀤', '𑀻', '𑀕', '𑀈', '𑀮', '𑀺', '𑀧', '𑀺', '𑀯', '𑀺', ' 𑀤𑁆', '𑀬', '𑀸', '𑀚', '𑀦', '-,', '𑀚', '𑀦', '𑀓', '𑁄', '𑀲', '𑀺', '𑀔', '𑀸', '𑀈'],
    // Round 5 words 
    ['𑀲', '𑀩', '𑀦', '𑁂', '𑀩𑁆', '𑀭', '𑀸', '𑀳', '𑀫', '𑀻', '𑀲', '𑁂', '𑀲', '𑀻', '𑀔', '𑀻', '𑀕', '𑀈', '𑀺', '𑀮', '𑀺', '𑀧', '𑀺', '𑀺', '𑀯', '𑀖', '𑀸', '𑀓', '𑁄', '𑀩𑁆', '𑀭', '𑀸', '𑀳', '𑀫', '𑀻', '𑀺', '𑀮', '𑀺', '𑀧', '𑀦', '𑀸', '𑀫', '𑀺', '𑀤', '𑀬', '𑀸'],
    // Round 6 words 
    ['𑀪', '𑀸', '𑀱', '𑀸', '𑀩', '𑁄', '𑀮,', '𑀻', '𑀚', '𑀸', '𑀢', '𑀻', '𑀳,' ,' 𑁃', '𑀮', '𑀺', '𑀧', '𑀺', '𑀮', '𑀺', '𑀔', '𑀻', '𑀚', '𑀸', '𑀢', '𑀻,' ,'𑀳', '𑁃', '𑀩𑁆', '𑀭', '𑀸', '𑀳', '𑀫', '𑀻', '𑀏', '𑀧', '𑀓', '𑀻', '𑀫', '𑀤', '𑀤,', '𑀲', '𑁂', '𑀆', '𑀧', '𑀩𑁆', '𑀭', '𑀸', '𑀳', '𑀫', '𑀻', '𑀮', '𑀺', '𑀧', '𑀺', '𑀓', '𑁄', '𑀓','𑀺', '𑀲', '𑀻', '𑀪', '𑀻', '𑀪', '𑀸', '𑀱', '𑀸', '𑀫', '𑁂', '𑀁', '𑀮', '𑀺', '𑀔', '𑀦', '𑀸', '𑀲', '𑀻', '𑀔', '𑀲', '𑀓', '𑀢', '𑁂', '𑀳', '𑁃', '𑀁',],

];
console.log(`the current round is ${currentRound}`)
console.log("Words for this level:", rounds[currentRound]);
let words = rounds[currentRound-1];
console.log("Words for Current Round:", words);
console.log(words)

document.querySelectorAll('.Key').forEach((element) => {
    element.addEventListener("click", () => {
        // Short vibration (100 milliseconds)
        if (navigator.vibrate) {
            console.log("Button clicked"); // Test if the click is working // or 500 if that's the intended duration
            if (navigator.vibrate) {
                navigator.vibrate(200); // Attempt the vibration
                console.log("Vibration triggered");
            } else {
                console.log("Vibration API not supported on this device/browser.");
            }
        }
    });
});


let activeWords = [];
let score = 0;
let gameOverOccurred = false;
let currentTargetChar = null;
let isWordActive = false;
let wordIndex = 0; // Track current index in `sentence`
shootSound.volume = 0.3;



let isMuted = false;

muteButton.addEventListener('click', () => {
    isMuted = !isMuted; 
    muteButton.classList.toggle('muted', isMuted);

    // Toggle the muted property for both audio elements
    shootSound.muted = isMuted;
    explosionSound.muted = isMuted;
    backgroundMusic.muted = isMuted;
    missedWord.muted = isMuted;
    audio.muted = isMuted;

});



updatelevel(currentRound)

// Function to toggle the display of keyboards
function toggleKeyboard(keyboardId) {
    // Hide all keyboards
    const keyboards = document.querySelectorAll('.keyboard');
    keyboards.forEach(keyboard => {
        keyboard.style.display = 'none'; // Hide all keyboards
    });
  
    // Show the selected keyboard
    const selectedKeyboard = document.getElementById(keyboardId);
    hideAllKeyboards();
    if (selectedKeyboard) {
        selectedKeyboard.style.display = 'flex'; // Show the selected keyboard
        selectedKeyboard.style.flexDirection = 'row'; // Ensure it's in row layout
    }
  }
  
  // Function to hide all keyboard elements (if needed in future extensions)
  function hideAllKeyboards() {
    const keyboards = document.querySelectorAll(".keyboard");
    keyboards.forEach(keyboard => {
        keyboard.style.display = "none";
    });
  }
  
  function hideAllKeyboards() {
    for (let i = 1; i <= 12; i++) {
      const keyboard = document.getElementById(`keyboard${i}`);
      if (keyboard) {
        keyboard.style.display = "none";
      }
    }
  }
  
  // Function to show the second alternate keyboard (signs) and hide all others
function showOtherKeyboard() {
    hideAllKeyboards(); // Hide all keyboards
    document.getElementById("otherKeyboard").style.display = "none";
    document.getElementById("otherKeyboardsigns").style.display = "flex"; // Show the second alternate keyboard
  }
  
  // Function to show the main keyboard (keyboard1) only
  function showMainKeyboard() {
    hideAllKeyboards(); // Ensure all keyboards are hidden first
    document.getElementById("otherKeyboard").style.display = "none";
    document.getElementById("otherKeyboardsigns").style.display = "none"; 
    document.getElementById("keyboard1").style.display = "flex"; // Display the main keyboard
  }
  

function createWord() {
    if (!gameStarted || gamePaused) return; // Prevent creation if game hasn't started or is paused
    if (wordIndex === words.length && activeWords.length === 0) {
        console.log("All words processed and activeWords is empty.");
        return;
    }

    if (!isWordActive && wordIndex < words.length) {
        const word = document.createElement('div');
        word.classList.add('word');
        const nextChar = words[wordIndex];
        word.textContent = nextChar;
        word.style.left = `${Math.random() * (gameArea.offsetWidth - 100)}px`;
        word.style.top = '0px';
        word.dataset.passedMiddle = 'false';
        word.dataset.isRemoving = 'false';
        gameArea.appendChild(word);

        // Start falling animation
        requestAnimationFrame(() => {
            word.classList.add('falling');
        });

        // Add to active words array
        activeWords.push(word);
        isWordActive = true;
        wordIndex++;
        resetButtonHighlights();
        highlightButton(nextChar);

        // Continuously check `gamePaused` with `requestAnimationFrame`
        function checkPauseState() {
            if (gamePaused) {
                word.style.animationPlayState = 'paused'; // Pause animation
            } else if (gameStarted) {
                word.style.animationPlayState = 'running'; // Resume animation if the game is running
            }

            // Continue checking until the word is out of the game area or removed
            if (parseInt(word.style.top) <= gameArea.offsetHeight && document.body.contains(word)) {
                requestAnimationFrame(checkPauseState);
            }
        }

        // Start checking the pause state
        requestAnimationFrame(checkPauseState);
    }
}


// const wor = document.querySelectorAll('.word.falling'); 
//  wor.forEach(word => { 
//         // Pause the animation at the current position
//         word.style.animationPlayState = 'paused'; 
//     });

function moveWords() {
    if (!gameStarted) return;
    // if (!gameStarted || gamePaused) return;
    const gameAreaHeight = gameArea.offsetHeight;
    const seventyPercentHeight = Math.floor(gameAreaHeight * 0.8);
    
    for (let i = activeWords.length - 1; i >= 0; i--) {
        const word = activeWords[i];
        if (word.dataset.isRemoving === 'true' || gamePaused === 'true') continue;

        const rect = word.getBoundingClientRect();
        
        const currentTop = rect.top - gameArea.getBoundingClientRect().top;

        
        if (currentTop >= seventyPercentHeight && word.dataset.passedMiddle === 'false') {
            console.log("Word passed 80% height, creating new word");
            word.dataset.passedMiddle = 'true';
            isWordActive = false;
            missedWord.play();
            setTimeout(() => createWord(), 0);
        }
        
        if (currentTop >= gameAreaHeight * 0.95) { 
            word.dataset.isRemoving = 'true';
            
            
            playSound(); 
            
            
            setTimeout(() => {
                if (word.parentNode) {
                    word.remove();
                }
                const index = activeWords.indexOf(word);
                if (index > -1) {
                    activeWords.splice(index, 1);
                }
                isWordActive = false;
                updateScore(-1);
                setTimeout(() => createWord(), 0);
            }, 500);
        }
    }
}


// function removeWord(wordElement) {
//     if (!gameStarted) return; // Prevent initialization if the game hasn't started
//     console.log("removeWord called. Word to remove:", wordElement.textContent);
    
//     if (wordElement.dataset.isRemoving === 'true') {
//         return; // Prevent double removal
//     }
    
//     wordElement.dataset.isRemoving = 'true';
//     wordElement.style.opacity = '0';
//     wordElement.style.pointerEvents = 'none';
    
//     setTimeout(() => {
//         const index = activeWords.indexOf(wordElement);
//         if (index > -1) {
//             activeWords.splice(index, 1);
//             wordElement.remove();
//             console.log(`Word removed from activeWords. Remaining activeWords.length: ${activeWords.length}`);
//         }

//         // Check if all words have been cleared
//         console.log("Checking if all words are cleared after removeWord.");
//         console.log("Current state: wordIndex:", wordIndex, "words.length:", words.length, "activeWords.length:", activeWords.length);
        
//         if (wordIndex >= words.length && activeWords.length === 0) {
//             console.log("All words cleared and activeWords is empty. Displaying round completion prompt.");
//             setTimeout(() => {
//                 console.log(`Remove Word Round ${currentRound} is cleared!`);
//                 alert(`Round ${currentRound} is cleared!`);

//                 // Move to the next round if available
//                 currentRound++;
//                 if (currentRound < rounds.length) {
//                     words = rounds[currentRound];
//                     wordIndex = 0;
//                     score = 0;
//                     console.log("Moving to next round. currentRound:", currentRound);
//                     updateRound(currentRound + 1);
//                 } else {
//                     console.log("Game Completed!");
//                     alert("Game Completed!");
//                 }
//             }, 500);
//         }

//         // Allow new word creation after removal
//         isWordActive = false;
//         setTimeout(() => createWord(), 0);
//     }, 500);
// }

// Add this CSS to your stylesheet
const styles = `
.word {
    position: absolute;
    opacity: 1;
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    z-index: 1;
}

.word[data-is-removing="true"] {
    pointer-events: none;
}
`;

// Create and append style element
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
// Function to check input against active words
function checkInput() {
    const inputText = userInput.value.trim();
    let foundMatch = false; // Flag to track if a match was found

    for (let i = activeWords.length - 1; i >= 0; i--) {
        if (gamePaused) {
            userInput.value = ''; // Clear the input if the game is paused
            return; // Exit the function early if the game is paused
        }

        const word = activeWords[i];
        
        // Check if the input matches an active word
        if (inputText === word.textContent) {
            launchRocket(word); // Call the launchRocket function for the matched word
            
            isWordActive = false; // Set isWordActive to false after a match
            createWord(); // Create a new word to replace the matched word
            resetButtonHighlights();
            createWord();  // Reset the button highlights
            foundMatch = true; // Set flag to true since a match was found
            break; // Exit the loop after the match is found
        }
    }

    // If no match is found, clear the input box and play sound
    if (!foundMatch) {
        userInput.value = ''; // Clear the input if no match
        audio.play(); // Play the audio (missed word sound)
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
function updateScore(m) {
    if (m==2){
        score = 0
    }else{ 
    score= score+m;
}
    scoreDisplay.textContent = `${score}`;
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
setInterval(createWord, 1000);  // Generate a new word every 2 seconds
setInterval(moveWords, 300);

     // Move words down every 50ms

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
    // Check the "Keyboard Hint" status from localStorage
    const keyboardHintStatus = loadKeyboardHintStatus();
    if (keyboardHintStatus === 'off') {
        console.log("Keyboard Hint is disabled. Highlighting is skipped.");
        return; // Exit the function early if the hint is disabled
    }
    const button = document.querySelector(`#keyboard1 button[data-char="${char}"]`);
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
    const buttons = document.querySelectorAll('#keyboard1 button');
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

function launchRocket(targetWord) {
    return new Promise((resolve) => {
        shootSound.play();
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
        
        setTimeout(async () => {
            createExplosion(targetWord);
            if (targetWord.parentNode) {
                gameArea.removeChild(targetWord);
            }
            activeWords = activeWords.filter(w => w !== targetWord);
            if (rocket.parentNode) {
                gameArea.removeChild(rocket);
            }
            updateScore(1);
            
            // If this was the last word
            if (wordIndex >= words.length && activeWords.length === 0) {
                await createSoulAnimation(targetWord.textContent);
                
                // Check if all words are cleared, then show the video popup
                console.log(`Round ${currentRound} is cleared!`);
                setTimeout(function() {
                    alert(`Round ${currentRound} is cleared!`);
                    currentRound++;
                if (currentRound < rounds.length) {
                    words = rounds[currentRound-1];
                    wordIndex = 0;
                    isWordActive = false;
                    activeWords = [];
                    updateScore(2);
                    console.log("Moving to next round. currentRound:", currentRound);
                    updateRound(currentRound + 1);
                    updatelevel();
                    createWord();
                } else {
                    console.log("Game Completed!");
                    // Show game completed message and button to restart
                    showGameCompletedVideo();
                }
                  }, 1000); // 2000 milliseconds = 2 seconds
                  
                // Show the video popup and "Next" button instead of alert
                // showRoundCompletionVideo(currentRound);

                
            } else {
                await createSoulAnimation(targetWord.textContent);
            }
            resolve();
        }, 500);
    });
}

// Function to show the video when a round is cleared
function showRoundCompletionVideo(currentRound) {
    const videoContainer = document.getElementById("videoContainer");
    const videoMessage = document.getElementById("videoMessage");
    const video = document.getElementById("celebrationVideo");
    const videoSource = document.querySelector("#celebrationVideo source");

    // Show the video container with a round completion message
    videoMessage.textContent = `Round ${currentRound} is cleared!`;
    videoContainer.style.display = "block";

    // Set the video source and play the video
    videoSource.src = "media/background/round_completion.mp4";
    video.type = "video/mp4";
    video.play();
}

// Function to show video when the game is completed
function showGameCompletedVideo() {
    const videoContainer = document.getElementById("videoContainer");
    const videoMessage = document.getElementById("videoMessage");
    const video = document.getElementById("celebrationVideo");

    // Show the video container with a game completion message
    videoMessage.textContent = "Game Completed!";
    videoContainer.style.display = "block";
    
    // Play the video
    video.play();
}

// Function to show video when the game is completed
function showGameCompletedVideo() {
    // Get the video container element
    const videoContainer = document.getElementById("videoContainer");
    const video = document.getElementById("celebrationVideo");
    
    // Show the video container with a game completed message
    videoContainer.style.display = "block";
    videoContainer.innerHTML = `
        <p>Game Completed!</p>
        <video id="celebrationVideo" width="500" height="280" controls>
            <source src="media/background/WinningScreen .mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <button id="nextButton" onclick="restartGame()" class="next-button">Restart Game</button>
    `;
    
    // Play the video
    video.play();
}

// Function to move to the next round
function nextRound() {
    // Hide the video container
    const videoContainer = document.getElementById("videoContainer");
    videoContainer.style.display = "none";
    
    // Continue the game logic for the next round
    currentRound++; // Increment the round counter
    console.log(`Moving to Round ${currentRound}`);
    updateRound(currentRound + 1);
    createWord();
}

// Function to restart the game
function restartGame() {
    // Hide the video container
    const videoContainer = document.getElementById("videoContainer");
    videoContainer.style.display = "none";
    
    // Reset the game state and restart from the first round
    currentRound = 1;
    words = rounds[currentRound];
    wordIndex = 0;
    activeWords = [];
    isWordActive = false;
    updateRound(currentRound);
    createWord();
}

// Add this new function for the soul animation
function createSoulAnimation(character) {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const leftTextArea = document.getElementById('leftTextArea');
    const rightTextArea = document.getElementById('rightTextArea');
    if (!leftTextArea || !rightTextArea) {
        console.error('Text areas not found');
        return; // Prevent further code execution if the elements don't exist
    }
    

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
        verifyleftTextAreas(character); // Highlight text after soul removal
    });

    // Add a transition end event listener for the right soul
    soulRight.addEventListener('transitionend', () => {
        if (document.body.contains(soulRight)) {
            document.body.removeChild(soulRight);
        }; // Remove soulRight once it reaches the target
        updateTextArea(character); // Highlight text after soul removal  character
    });
}


let spans = null;
let currentIndex = 0;
let isProcessing = false;
let currentRoundSpans = {};

const roundTexts = {
        1: {
            left: "𑀚𑁃𑀦 𑀥𑀭𑁆𑀫 𑀓𑁂 𑀧𑁆𑀭𑀣𑀫 𑀢𑀻𑀭𑁆𑀣𑀁𑀓𑀭 𑀆𑀤𑀺𑀦𑀸𑀣 𑀪𑀕𑀯𑀸𑀦 𑀚𑀻 𑀳𑁃𑀁 𑁇",
            right: "जैन धर्म के प्रथम तीर्थंकर आदिनाथ भगवान जी हैं।",
        },
        2: {
            left: "𑀋𑀱𑀪𑀤𑁂𑀯 𑀚𑀻, 𑀯𑀾𑀱𑀪𑀦𑀸𑀣 𑀚𑀻 𑀒𑀭 𑀆𑀤𑀺𑀦𑀸𑀣 𑀚𑀻 𑀬𑁂 𑀢𑀻𑀦𑁄𑀁 𑀦𑀸𑀫 𑀧𑁆𑀭𑀣𑀫 𑀢𑀻𑀭𑁆𑀣𑀁𑀓𑀭 𑀓𑁂 𑀳𑀻 𑀳𑁃𑀁𑁇",
            right: "ऋषभदेव जी, वृषभनाथ जी और आदिनाथ जी ये तीनों नाम प्रथम तीर्थंकर के ही हैं।",
        },
        3: {
            left: "𑀫𑀳𑀸𑀭𑀸𑀚𑀸 𑀋𑀱𑀪𑀤𑁂𑀯 𑀚𑀻 𑀦𑁂 𑀅𑀧𑀦𑀻 𑀩𑀟़𑀻 𑀧𑀼𑀢𑁆𑀭𑀻 𑀩𑁆𑀭𑀸𑀳𑁆𑀫𑀻 𑀓𑁄 𑀅𑀓𑁆𑀱𑀭 𑀮𑁂𑀔𑀦 𑀓𑀻 𑀓𑀮𑀸 𑀲𑀺𑀔𑀸𑀈𑁇",
            right: "महाराजा ऋषभदेव जी ने अपनी बड़ी पुत्री ब्राह्मी को अक्षर लेखन की कला सिखाई।",
        },
        4: {
            left: "𑀩𑁆𑀭𑀸𑀳𑁆𑀫𑀻 𑀦𑁂 𑀧𑀺𑀢𑀸 𑀓𑁂 𑀤𑁆𑀯𑀸𑀭𑀸 𑀤𑀻 𑀕𑀈 𑀮𑀺𑀧𑀺 𑀯𑀺𑀤𑁆𑀬𑀸 𑀚𑀦-𑀚𑀦 𑀓𑁄 𑀲𑀺𑀔𑀸𑀈𑁇",
            right: "ब्राह्मी ने पिता के द्वारा दी गई लिपि विद्या जन-जन को सिखाई।",
        },
        5: {
            left: "𑀲𑀩𑀦𑁂 𑀩𑁆𑀭𑀸𑀳𑁆𑀫𑀻 𑀲𑁂 𑀲𑀻𑀔𑀻 𑀕𑀈 𑀮𑀺𑀧𑀺 𑀯𑀺𑀤𑁆𑀬𑀸 𑀓𑁄 𑀩𑁆𑀭𑀸𑀳𑁆𑀫𑀻 𑀮𑀺𑀧𑀺 𑀦𑀸𑀫 𑀤𑀺𑀬𑀸𑁇",
            right: "सबने ब्राह्मी से सीखी गई लिपि विद्या को ब्राह्मी लिपि नाम दिया।",
        },
        6: {
            left: "𑀪𑀸𑀱𑀸 𑀩𑁄𑀮𑀻 𑀚𑀸𑀢𑀻 𑀳𑁃, 𑀮𑀺𑀧𑀺 𑀮𑀺𑀔𑀻 𑀚𑀸𑀢𑀻 𑀳𑁃𑁇 𑀩𑁆𑀭𑀸𑀳𑁆𑀫𑀻 𑀏𑀧 𑀓𑀻 𑀫𑀤𑀤 𑀲𑁂 𑀆𑀧 𑀩𑁆𑀭𑀸𑀳𑁆𑀫𑀻 𑀮𑀺𑀧𑀺 𑀓𑁄 𑀓𑀺𑀲𑀻 𑀪𑀻 𑀪𑀸𑀱𑀸 𑀫𑁂𑀁 𑀮𑀺𑀔𑀦𑀸 𑀲𑀻𑀔 𑀲𑀓𑀢𑁂 𑀳𑁃𑀁𑁇",
            right: "भाषा बोली जाती है, लिपि लिखी जाती है। ब्राह्मी एप की मदद से आप ब्राह्मी लिपि को किसी भी भाषा में लिखना सीख सकते हैं।",
        }
        // ... Other rounds
    };

function initializeRound(roundNumber) {
        console.log(`Initializing round ${roundNumber}`);
        const rightTextArea = document.getElementById("rightTextArea");
        const leftTextArea = document.getElementById("leftTextArea");

        if (rightTextArea && leftTextArea) {
            rightTextArea.textContent = roundTexts[roundNumber].right;
            leftTextArea.textContent = roundTexts[roundNumber].left;

            rightTextArea.innerHTML = [...rightTextArea.textContent].map(char => {
                if (char === ' ') return ' ';
                return `<span data-revealed="false" style="color: transparent; -webkit-text-stroke: 0.3px black;">${char}</span>`;
            }).join('');

            leftTextArea.innerHTML = [...leftTextArea.textContent].map(char => {
                if (char === ' ') return ' ';
                return `<span style="color: transparent; -webkit-text-stroke: 0.3px black;">${char}</span>`;
            }).join('');

            currentIndex = 0;
            spans = null;
            currentRoundSpans = {};
        } else {
            console.warn("Text areas not found during initialization");
        }
    }

function updateRound(roundNumber) {
        currentRound = roundNumber - 1;
        initializeRound(roundNumber -1);
        score =0;
    }

initializeRound(currentRound);

function verifyleftTextAreas(char) {
        console.log("verifyleftTextAreas called properly ")
        const leftTextArea = document.getElementById("leftTextArea");
        console.log(`thelefttextarea is ${leftTextArea.textContent}`)
        if (!leftTextArea) {
            console.warn("leftTextArea element not found");
            return;
        }

        console.log(`charachter now is ${char}`)
        

        const characterSpans = leftTextArea.querySelectorAll('span');
        
let conditionMet = false;

for (let span of characterSpans) {

    function is(condition) {
        return Boolean(condition);
    }

    let one = is(span.textContent === char);
    let two = is(span.style.color === 'transparent');
    // console.log(`span.textContent: ${span.textContent}, char: ${char}, isEqual: ${one}, span.style.color: ${span.style.color}, isTransparent: ${two}`);

    if (one && two) {
        span.style.color = 'black';
        conditionMet = true;  // Set the flag to true to mark the condition as met
        break;  // Exit the for loop
    }
}

if (conditionMet) {
    console.log("Condition met, exited loop after updating the first matching span.");
} else {
    console.log("No matching span found.");
}

        
    }
;


const hindiMapping = {
    "𑀅": "अ",
    "𑀆": "आ",
    "𑀇": "इ",
    "𑀈": "ई",
    "𑀉": "उ",
    "𑀊": "ऊ",
    "𑀏": "ए",
    "𑀐": "ऐ",
    "𑀑": "ओ",
    "𑀒": "औ",
    "𑀅𑀁" : "अं",
    "𑀅ः" : "अः",


    "𑀓":"क",
    "𑀔": "ख",
    "𑀕": "ग",
    "𑀖": "घ",
    "𑀗": "ङ",
    "𑀘": "च",
    "𑀙": "छ",
    "𑀚" : "ज",
    "𑀛" :"झ",
    "𑀜" :"ञ",
    "𑀝": "ट",
    "𑀞": "ठ",
    "𑀟": "ड",
    "𑀠": "ढ",
    "𑀡": "ण",
    "𑀢"  :"त",
    "𑀣" :"थ",
    "𑀤": "द",
    "𑀥": "ध",
    "𑀦": "न",
    "𑀧": "प",
    "𑀨" :"फ",
    "𑀩": "ब",
    "𑀪":"भ",
    "𑀫": "म",
    "𑀬": "य",
    "𑀭": "र",
    "𑀮": "ल",
    "𑀯": "व",
    "𑀰": "श",
    "𑀱": "ष",
    "𑀲": "स",
    "𑀳": "ह",
    "𑀚𑁆𑀜": "ज्ञ",
    "𑀓𑁆𑀱": "क्ष",
    "𑀰𑁆𑀭":"श्र", 
    "𑀧𑁆𑀭": "प्र",
    "𑀋":"ऋ",
    '𑀸':'ा',
'𑀺':'ि',
'𑀻':'ी',
'𑀼':'ु',
'𑀽':'ू',
'𑁂':'े',
'𑁃':'ै',
'𑁄':'ो',
'𑁅':'ौ',
'𑀁':'ं',
'‌‌ः':'ः',
'𑁆':'्',
'़':'़',
"𑀾": "ृ",
'ऽ':'ऽ',
'ॐ':'ॐ',
'𑁈':'॥',
';':';',
'-':'-',
'?':'?',
'!':'!',
'.':'.',
'/':'/',
')':')',
'(':'(',
'𑁧':'१',
'𑁨':'२',
'𑁩':'३',
'𑁪':'४',
'𑁫':'५',
'𑁬':'६',
'𑁭':'७',
'𑁮':'८',
'𑁯':'९',
'𑁦':'०',
'𑁧':'1',
'𑁨':'2',
'𑁩':'3',
'𑁪':'4',
'𑁫':'5',
'𑁬':'6',
'𑁭':'7',
'𑁮':'8',
'𑁯':'9',
'𑁦':'0',

    }
function updateTextArea(inputChar) {
    if (isProcessing) {
        console.log("Already processing, skipping call");
        return;
    }

    isProcessing = true;
    console.log("------- Function Start -------");

    const rightTextArea = document.getElementById("rightTextArea");
    if (!rightTextArea) {
        console.warn("rightTextArea element not found");
        isProcessing = false;
        return;
    }

    if (!currentRoundSpans[currentRound]) {
        console.log(`Creating new spans for round ${currentRound}`);
        const roundText = roundTexts[currentRound]?.right || '';
        const characters = [...roundText];
        
        const processedHTML = characters.map(char => {
            if (char === ' ') {
                return ' ';
            }
            return `<span data-revealed="false" style="color: transparent; -webkit-text-stroke: 0.3px black;">${char}</span>`;
        }).join('');
        
        rightTextArea.innerHTML = processedHTML;
        currentRoundSpans[currentRound] = Array.from(rightTextArea.getElementsByTagName('span'));
        spans = currentRoundSpans[currentRound];
        currentIndex = 0;
    } else {
        spans = currentRoundSpans[currentRound];
    }

    // Get the mapped Hindi character
    console.log(`inputchar ${inputChar} , hindimapping[inputChar] = ${hindiMapping[inputChar]}`)
    const hindiChar = hindiMapping[inputChar];
    if (!hindiChar) {
        console.warn(`No mapping found for character: ${inputChar}`);
        isProcessing = false;
        return;
    }

    console.log(`currentspan.textcontent${rightTextArea.textContent}`)
    const characterSpans = rightTextArea.querySelectorAll('span');
    for(let span of characterSpans){
        // console.log(`spanlist for right ${span.textContent}`)

    }
let conditionMet = false;

for (let span of characterSpans) {

    function is(condition) {
        return Boolean(condition);
    }

    let one = is(span.textContent=== hindiChar);
    let two = is(span.style.color === 'transparent');
    // console.log(` Right span.textContent: ${span.textContent}, hindi char: ${hindiChar}, isEqual: ${one}, span.style.color: ${span.style.color}, isTransparent: ${two}`);

    if (one && two) {
        span.style.color = 'black';
        conditionMet = true;  // Set the flag to true to mark the condition as met
        break;  // Exit the for loop
    }
}

if (conditionMet) {
    console.log("Condition met, exited loop after updating the first matching span.");
} else {
    console.log("No matching span found.");
}

    // // Find and reveal the first span with the mapped Hindi character
    // for (let i = currentIndex; i < spans.length; i++) {
    //     const currentSpan = spans[i];
        
    //     if (currentSpan.dataset.revealed === "false" && currentSpan.textContent === hindiChar) {
    //         console.log(`Revealing: "${currentSpan.textContent}"`);
    //         currentSpan.style.color = 'black';
    //         currentSpan.dataset.revealed = "true";
    //         currentIndex = i + 1; // Move to the next span after the revealed one
    //         break;
    //     }
    // }

    setTimeout(() => {
        isProcessing = false;
    }, 100);
}


function resetTextArea() {
    console.log(`Resetting text area for round ${currentRound}`);
    const rightTextArea = document.getElementById("rightTextArea");
    const leftTextArea = document.getElementById("leftTextArea");
    
    if (!rightTextArea || !leftTextArea) {
        console.warn("Text areas not found");
        return;
    }

    if (currentRoundSpans[currentRound]) {
        currentRoundSpans[currentRound].forEach(span => {
            span.style.color = 'transparent';
            span.dataset.revealed = "false";
        });
    }

    if (roundTexts[currentRound + 1]) {
        rightTextArea.textContent = roundTexts[currentRound + 1].right;
        leftTextArea.textContent = roundTexts[currentRound + 1].left;
    }

    currentIndex = 0;
    isProcessing = false;
    spans = null;
    delete currentRoundSpans[currentRound];
}

window.onload = function() {
    console.log("Window Loaded");
    history.pushState({}, '', window.location.href);
};


window.onpopstate = function(event) {
        // Redirect to your desired page when the back button is pressed
        window.location.href = 'index.html'; // Replace with the correct filename or URL
    };

    // Add a new history state when the page loads
    window.onload = function() {
        history.pushState({}, '', window.location.href);
    };
