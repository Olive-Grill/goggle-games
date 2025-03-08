// Wait for the document to load before running the code
document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const gameArea = document.getElementById('gameArea');
    const submitGuessButton = document.getElementById('submitGuess');
    const guessInput = document.getElementById('guessInput');
    const messageElement = document.getElementById('message');
    const attemptsElement = document.getElementById('attempts');
    const restartButton = document.getElementById('restartGame');
    
    let randomNumber, attempts;

    // Start the game when the start button is clicked
    startButton.addEventListener('click', function () {
        startGame();
    });

    // Submit guess and check it
    submitGuessButton.addEventListener('click', function () {
        checkGuess();
    });

    // Restart the game when the restart button is clicked
    restartButton.addEventListener('click', function () {
        startGame();
    });

    // Function to start or restart the game
    function startGame() {
        randomNumber = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100
        attempts = 0;
        attemptsElement.textContent = attempts;
        messageElement.textContent = "";
        guessInput.value = "";
        gameArea.style.display = 'block'; // Show game area
        startButton.style.display = 'none'; // Hide start button
        restartButton.style.display = 'none'; // Hide restart button
    }

    // Function to check the player's guess
    function checkGuess() {
        const guess = parseInt(guessInput.value);
        if (isNaN(guess) || guess < 1 || guess > 100) {
            messageElement.textContent = "Please enter a number between 1 and 100.";
            return;
        }

        attempts++;
        attemptsElement.textContent = attempts;

        if (guess === randomNumber) {
            messageElement.textContent = `Congratulations! You guessed the number in ${attempts} attempts!`;
            restartButton.style.display = 'block'; // Show restart button
        } else if (guess < randomNumber) {
            messageElement.textContent = "Too low! Try again.";
        } else {
            messageElement.textContent = "Too high! Try again.";
        }
    }
});
