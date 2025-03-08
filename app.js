// Initialize Appwrite
const client = new Appwrite.Client();
const account = new Appwrite.Account(client);

client.setEndpoint('https://cloud.appwrite.io/v1')  // Use your Appwrite endpoint
      .setProject('67cc7f6c00377c4ea5d4'); // Use your Appwrite project ID

const gameCanvas = document.getElementById('gameCanvas');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const scoreDisplay = document.getElementById('scoreDisplay');
let score = 0;

// Function to register a user
async function registerUser(email, password) {
    try {
        await account.create('unique()', email, password);
        alert('User registered successfully!');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Function to login a user
async function loginUser(email, password) {
    try {
        await account.createSession(email, password);
        alert('Login successful!');
        startButton.style.display = 'block'; // Show start game button
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Function to start the game
function startGame() {
    startButton.style.display = 'none';
    gameCanvas.style.display = 'block';
    restartButton.style.display = 'block';
    startNewGame(); // Replace with actual game initialization
}

// Function to restart the game
function restartGame() {
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    startGame(); // Restart the game
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

// Function to save the score to the Appwrite database
async function saveScore() {
    try {
        const user = await account.get();
        const userId = user.$id;

        const database = new Appwrite.Databases(client);
        await database.createDocument(
            '[YOUR_DATABASE_ID]', // Database ID
            '[YOUR_COLLECTION_ID]', // Collection ID
            'unique()', // Document ID (auto-generated)
            { user_id: userId, score: score }
        );
        alert('Score saved!');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Function to get the score from the Appwrite database
async function getScore() {
    try {
        const user = await account.get();
        const userId = user.$id;

        const database = new Appwrite.Databases(client);
        const result = await database.listDocuments(
            '[YOUR_DATABASE_ID]', // Database ID
            '[YOUR_COLLECTION_ID]', // Collection ID
            [Appwrite.Query.equal('user_id', userId)] // Search by user_id
        );

        const userScore = result.documents.length > 0 ? result.documents[0].score : 0;
        return userScore;
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Function to display the score on the game screen
async function displayScore() {
    const score = await getScore();
    scoreDisplay.textContent = 'Score: ' + score;
}

// Replace `startNewGame()` with actual game initialization logic.
function startNewGame() {
    // Start your Flappy Bird game logic here
    console.log('Game Started');
    // For example:
    // 1. Initialize the canvas
    // 2. Set up the bird and pipes
    // 3. Add the game loop
    // 4. Call saveScore() when the game ends
}
