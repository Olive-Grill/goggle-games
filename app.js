document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const startPacmanButton = document.getElementById('startPacman');
    const gameArea = document.getElementById('gameArea');
    const pacmanGameArea = document.getElementById('pacmanGameArea');
    const restartButton = document.getElementById('restartGame');
    const restartPacmanButton = document.getElementById('restartPacmanGame');

    // Pac-Man Game
    const pacmanCanvas = document.getElementById('pacmanCanvas');
    const ctx = pacmanCanvas.getContext('2d');
    const mazeWidth = 15;
    const mazeHeight = 15;
    const wallSize = 30;

    let pacman = { x: 200, y: 200, radius: 20, speed: 5 };
    let pacmanVelocity = { x: 0, y: 0 };
    let pacmanDirection = 0;

    const maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    startPacmanButton.addEventListener('click', function () {
        startPacmanGame();
    });

    restartPacmanButton.addEventListener('click', function () {
        startPacmanGame();
    });

    function startPacmanGame() {
        pacmanGameArea.style.display = 'block';
        gameArea.style.display = 'none';
        startPacmanButton.style.display = 'none';
        restartPacmanButton.style.display = 'block';
        pacman = { x: 200, y: 200, radius: 20, speed: 5 };
        pacmanVelocity = { x: 0, y: 0 };
        pacmanDirection = 0;
        drawMaze();
        drawPacman();
        document.addEventListener('keydown', movePacman);
        gameLoop();
    }

    function drawMaze() {
        // Draw the maze on the canvas
        for (let row = 0; row < mazeHeight; row++) {
            for (let col = 0; col < mazeWidth; col++) {
                if (maze[row][col] === 1) {
                    ctx.fillStyle = 'blue'; // Color for walls
                    ctx.fillRect(col * wallSize, row * wallSize, wallSize, wallSize);
                }
            }
        }
    }

    function drawPacman() {
        ctx.clearRect(0, 0, pacmanCanvas.width, pacmanCanvas.height);  // Clear the canvas
        drawMaze();

        // Pac-Man's shape
        ctx.beginPath();
        ctx.arc(pacman.x, pacman.y, pacman.radius, pacmanDirection * Math.PI / 180, (pacmanDirection + 270) * Math.PI / 180);
        ctx.lineTo(pacman.x, pacman.y);
        ctx.fillStyle = 'yellow';
        ctx.fill();
    }

    function movePacman(event) {
        event.preventDefault();

        if (event.key === 'ArrowUp') {
            pacmanVelocity.y = -pacman.speed;
            pacmanVelocity.x = 0;
            pacmanDirection = 270;
        } else if (event.key === 'ArrowDown') {
            pacmanVelocity.y = pacman.speed;
            pacmanVelocity.x = 0;
            pacmanDirection = 90;
        } else if (event.key === 'ArrowLeft') {
            pacmanVelocity.x = -pacman.speed;
            pacmanVelocity.y = 0;
            pacmanDirection = 180;
        } else if (event.key === 'ArrowRight') {
            pacmanVelocity.x = pacman.speed;
            pacmanVelocity.y = 0;
            pacmanDirection = 0;
        }
    }

    function checkCollision(x, y) {
        // Check for collisions with walls
        let col = Math.floor(x / wallSize);
        let row = Math.floor(y / wallSize);

        if (maze[row] && maze[row][col] === 1) {
            return true; // Wall collision detected
        }
        return false; // No collision
    }

    function gameLoop() {
        let newX = pacman.x + pacmanVelocity.x;
        let newY = pacman.y + pacmanVelocity.y;

        if (!checkCollision(newX, newY)) {
            pacman.x = newX;
            pacman.y = newY;
        }

        drawPacman();
        setTimeout(gameLoop, 1000 / 60); // 60 FPS
    }
});
