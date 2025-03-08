document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const startPacmanButton = document.getElementById('startPacman');
    const gameArea = document.getElementById('gameArea');
    const pacmanGameArea = document.getElementById('pacmanGameArea');
    const restartButton = document.getElementById('restartGame');
    const restartPacmanButton = document.getElementById('restartPacmanGame');

    // Number Guessing Game Logic
    let randomNumber, attempts;
    startButton.addEventListener('click', function () {
        startGame();
    });
    restartButton.addEventListener('click', function () {
        startGame();
    });

    function startGame() {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        gameArea.style.display = 'block';
        pacmanGameArea.style.display = 'none';
        startButton.style.display = 'none';
        restartButton.style.display = 'block';
        restartPacmanButton.style.display = 'none';
    }

    // Pac-Man Game Logic
    const pacmanCanvas = document.getElementById('pacmanCanvas');
    const ctx = pacmanCanvas.getContext('2d');
    let pacman = { x: 200, y: 200, radius: 20, speed: 5, direction: 0 };
    let pacmanVelocity = { x: 0, y: 0 };

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
        pacman = { x: 200, y: 200, radius: 20, speed: 5, direction: 0 };
        pacmanVelocity = { x: 0, y: 0 };
        drawPacman();
        document.addEventListener('keydown', movePacman);
        gameLoop();
    }

    function drawPacman() {
        ctx.clearRect(0, 0, pacmanCanvas.width, pacmanCanvas.height);
        ctx.beginPath();
        ctx.arc(pacman.x, pacman.y, pacman.radius, pacman.direction * Math.PI / 180, (pacman.direction + 270) * Math.PI / 180);
        ctx.lineTo(pacman.x, pacman.y);
        ctx.fillStyle = 'yellow';
        ctx.fill();
    }

    function movePacman(event) {
        if (event.key === 'ArrowUp') {
            pacmanVelocity.y = -pacman.speed;
            pacmanVelocity.x = 0;
        } else if (event.key === 'ArrowDown') {
            pacmanVelocity.y = pacman.speed;
            pacmanVelocity.x = 0;
        } else if (event.key === 'ArrowLeft') {
            pacmanVelocity.x = -pacman.speed;
            pacmanVelocity.y = 0;
        } else if (event.key === 'ArrowRight') {
            pacmanVelocity.x = pacman.speed;
            pacmanVelocity.y = 0;
        }
    }

    function gameLoop() {
        pacman.x += pacmanVelocity.x;
        pacman.y += pacmanVelocity.y;

        // Wrap around the canvas if Pac-Man goes off screen
        if (pacman.x < 0) pacman.x = pacmanCanvas.width;
        if (pacman.x > pacmanCanvas.width) pacman.x = 0;
        if (pacman.y < 0) pacman.y = pacmanCanvas.height;
        if (pacman.y > pacmanCanvas.height) pacman.y = 0;

        drawPacman();

        // Request next frame
        setTimeout(gameLoop, 1000 / 60); // 60 FPS
    }
});
