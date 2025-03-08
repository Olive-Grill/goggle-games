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
        restartPacmanButton.style.display = 'none';
        pacman = { x: 200, y: 200, radius: 20, speed: 5, direction: 0 };
        pacmanVelocity = { x: 0, y: 0 };
        drawPacman();
        document.addEventListener('keydown', movePacman);
        gameLoop();
    }

    function drawPacman() {
        ctx.clearRect(0, 0, pacmanCanvas.width, pacmanCanvas.height);
        ctx.beginPath();
        ctx.arc(pacman.x, pacman.y, pa
