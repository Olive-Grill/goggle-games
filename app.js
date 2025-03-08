// Number Guessing Game Logic
document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const startPacmanButton = document.getElementById('startPacman');
    const gameArea = document.getElementById('gameArea');
    const pacmanGameArea = document.getElementById('pacmanGameArea');
    const restartButton = document.getElementById('restartGame');
    const restartPacmanButton = document.getElementById('restartPacmanGame');
    
    // Number Guessing Game
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
        restartButton.style.display = 'none';
    }

    // Pac-Man Game
    const pacmanCanvas = document.getElementById('pacmanCanvas');
    const ctx = pacmanCanvas.getContext('2d');
    let pacman = { x: 200, y: 200, radius: 20, direction: 0 };

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
        restartPacmanButton.style.display = 'none';
        pacman = { x: 200, y: 200, radius: 20, direction: 0 };
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
        const speed = 5;
        if (event.key === 'ArrowUp') {
            pacman.y -= speed;
        } else if (event.key === 'ArrowDown') {
            pacman.y += speed;
        } else if (event.key === 'ArrowLeft') {
            pacman.x -= speed;
        } else if (event.key === 'ArrowRight') {
            pacman.x += speed;
        }
        drawPacman();
    }

    function gameLoop() {
        if (pacman.x < 0) pacman.x = pacmanCanvas.width;
        if (pacman.x > pacmanCanvas.width) pacman.x = 0;
        if (pacman.y < 0) pacman.y = pacmanCanvas.height;
        if (pacman.y > pacmanCanvas.height) pacman.y = 0;

        setTimeout(gameLoop, 1000 / 60); // 60 frames per second
    }
});
