const canvas = document.getElementById("flappyCanvas");
const ctx = canvas.getContext("2d");

let birdX = 50, birdY = 200, birdRadius = 15;
let gravity = 0.6, velocity = 0, jumpStrength = -10;
let score = 0, gameOver = false;
let pipes = [{ x: canvas.width, y: Math.floor(Math.random() * 200) + 50 }];
let isGameStarted = false;

// Handle jumping
document.addEventListener("keydown", jump);
document.addEventListener("click", jump);

function jump(event) {
    if (event.code === "Space" || event.type === "click") {
        if (!isGameStarted) return; // Only jump if the game has started
        velocity = jumpStrength;
    }
}

// Start the game
document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("restartButton").addEventListener("click", restartGame);

function startGame() {
    isGameStarted = true;
    document.getElementById("startMenu").style.display = "none"; // Hide start menu
    canvas.style.display = "block"; // Show canvas
    document.getElementById("gameOverMenu").style.display = "none"; // Hide game over menu
    resetGame(); // Reset the game state
    draw(); // Start drawing the game
}

// Reset game state
function resetGame() {
    birdY = 200;
    velocity = 0;
    score = 0;
    pipes = [{ x: canvas.width, y: Math.floor(Math.random() * 200) + 50 }];
    gameOver = false;
}

// Draw the game state
function draw() {
    if (gameOver) {
        document.getElementById("finalScore").textContent = score;
        document.getElementById("gameOverMenu").style.display = "block";
        return;
    }

    // Draw background
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw bird (yellow circle)
    ctx.beginPath();
    ctx.arc(birdX, birdY, birdRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFEB3B"; // Yellow
    ctx.fill();

    // Update bird position
    birdY += velocity;
    velocity += gravity;

    // Draw pipes
    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        ctx.fillStyle = "#228B22"; // Green color
        ctx.fillRect(pipe.x, 0, 50, pipe.y); // Top pipe
        ctx.fillRect(pipe.x, pipe.y + 150, 50, canvas.height - pipe.y - 150); // Bottom pipe

        pipe.x -= 2; // Move pipes to the left

        // Collision detection
        if (
            birdX + birdRadius > pipe.x && birdX - birdRadius < pipe.x + 50 &&
            (birdY - birdRadius < pipe.y || birdY + birdRadius > pipe.y + 150)
        ) {
            gameOver = true;
        }

        // Score update
        if (pipe.x === birdX) {
            score++;
        }
    }

    // Add new pipes when the current pipes are off-screen
