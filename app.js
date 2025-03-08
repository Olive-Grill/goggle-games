// Initialize Appwrite
const client = new Appwrite.Client();
const account = new Appwrite.Account(client);

client.setEndpoint('https://cloud.appwrite.io/v1')  // Your Appwrite endpoint
      .setProject('67cc7f6c00377c4ea5d4'); // Your Appwrite project ID

const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const scoreDisplay = document.getElementById('scoreDisplay');
const gameCanvas = document.getElementById('gameCanvas');
const authScreen = document.getElementById('authScreen');
const gameScreen = document.getElementById('gameScreen');
let score = 0;

// Function to register a user
async function registerUser(email, password) {
    try {
        const response = await account.create('unique()', email, password);
        console.log('User registered:', response);
        alert('User registered successfully!');
        loginUser(email, password); // Auto-login after registration
    } catch (error) {
        console.error('Error registering user:', error);
        alert('Registration error: ' + error.message);
    }
}

// Function to login a user
async function loginUser(email, password) {
    try {
        const response = await account.createSession(email, password);
        console.log('User logged in:', response);
        alert('Login successful!');
        showGameScreen();
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Login error: ' + error.message);
    }
}

// Function to check if the user is logged in
async function checkSession() {
    try {
        const session = await account.getSession('current');
        console.log('User is logged in:', session);
        showGameScreen();
    } catch (error) {
        console.log('User is not logged in:', error);
        alert('Please log in to continue.');
    }
}

// Function to show game screen
function showGameScreen() {
    authScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    startButton.style.display = 'block';
    restartButton.style.display = 'none';
    scoreDisplay.style.display = 'block';
}

// Function to start the game
function startGame() {
    startButton.style.display = 'none';
    restartButton.style.display = 'block';
    startNewGame();
}

// Function to restart the game
function restartGame() {
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    startGame();
}

// Event listeners for buttons
document.getElementById('registerButton').addEventListener('click', () => {
    const email = prompt('Enter your email');
    const password = prompt('Enter your password');
    registerUser(email, password);
});

document.getElementById('loginButton').addEventListener('click', () => {
    const email = prompt('Enter your email');
    const password = prompt('Enter your password');
    loginUser(email, password);
});

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('restartButton').addEventListener('click', restartGame);

// Replace this with actual game code for starting a new game
function startNewGame() {
    console.log('Game Started');
    // For example, initialize the canvas and game objects here
    // For now, we simulate increasing score
    let gameInterval = setInterval(() => {
        score += 1;
        scoreDisplay.textContent = 'Score: ' + score;
        if (score === 10) { // Example end condition
            clearInterval(gameInterval);
            alert("Game Over!");
            saveScore();
        }
    }, 1000);
}

// Function to save the score to the Appwrite database
async function saveScore() {
    try {
        const user = await account.get();
        const userId = user.$id;

        const database = new Appwrite.Databases(client);
        await database.createDocument(
            '67cc80c7001dc875eca5', // Your database ID
            '67cc80d000300a719aee', // Your collection ID
            'unique()', // Document ID (auto-generated)
            { user_id: userId, score: score }
        );
        alert('Score saved!');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Call checkSession on page load to check if the user is logged in
checkSession();
