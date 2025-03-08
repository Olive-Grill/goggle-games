document.addEventListener('DOMContentLoaded', function () {
    const startPacmanButton = document.getElementById('startPacman');
    const pacmanGameArea = document.getElementById('pacmanGameArea');
    const restartPacmanButton = document.getElementById('restartPacmanGame');

    // Pac-Man Game Setup
    const pacmanCanvas = document.getElementById('pacmanCanvas');
    const ctx = pacmanCanvas.getContext('2d');
    const wallSize = 15; // Wall size 15px
    const mazeWidth = 20;
    const mazeHeight = 20;

    pacmanCanvas.width = mazeWidth * wallSize;
    pacmanCanvas.height = mazeHeight * wallSize;

    let pacman = { x: 200, y: 200, radius: 10, speed: 3 }; // Pac-Man size (radius)
    let pacmanVelocity = { x: 0, y: 0 };
    let pacmanDirection = 0; // Starting direction

    const maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    startPacmanButton.addEventListener('click', startPacmanGame);
    restartPacmanButton.addEventListener('click', startPacmanGame);

    function startPacmanGame() {
        pacmanGameArea.style.display = 'block';
        startPacmanButton.style.display = 'none';
        restartPacmanButton.style.display = 'block';
        drawMaze();
        drawPacman();
        document.addEventListener('keydown', movePacman);
        gameLoop();
    }

    function drawMaze() {
        ctx.clearRect(0, 0, pacmanCanvas.width, pacmanCanvas.height);  // Clear canvas
        for (let row = 0; row < mazeHeight; row++) {
            for (let col = 0; col < mazeWidth; col++) {
                if (maze[row][col] === 1) {
                    ctx.fillStyle = 'blue'; // Wall color
                    ctx.fillRect(col * wallSize, row * wallSize, wallSize, wallSize);
                }
            }
        }
    }

    function drawPacman() {
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

        drawMaze();
        drawPacman();
        setTimeout(gameLoop, 1000 / 60); // 60 FPS
    }
});
