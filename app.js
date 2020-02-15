/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if they lose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    // Validate the input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if winning number
    // GAME OVER - WON
    if (guess === winningNum) {

        gameOver(true, `Congratulations ${winningNum} is correct, You Win!`);

    } else {
        // Wrong Number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // GAME OVER - LOST

            gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
        } else {

            // GAME continues - wrong answer

            // Change color of border
            guessInput.style.borderColor = 'red';

            // Clear the input
            guessInput.value = '';

            // Let user know they guessed the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guess left`, 'red');
        }
    }
});

// Game Over Function
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable Input
    guessInput.disabled = true;

    // Change color of border
    guessInput.style.borderColor = color;
    // Set Text Color
    message.style.color = color;

    // Set Message
    setMessage(msg);

    // PLay Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max) {
    return (Math.floor(Math.random() * (max - min + 1) + min));
}

// Set Message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
};