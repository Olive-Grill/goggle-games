const canvas = document.getElementById("pacmanCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let pacman = { x: 10, y: 10, dx: 0, dy: 0 };
let walls = [
    { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 },
    { x: 5, y: 6 }, { x: 8, y: 6 },
    { x: 5, y: 7 }, { x: 8, y: 7 },
    { x: 5, y: 8 }, { x: 6, y: 8 }, { x: 7, y: 8 }, { x: 8, y: 8 }
];

function drawPacman() {
    ctx.beginPath();
    ctx.arc(pacman.x * gridSize + gridSize / 2, pacman.y * gridSize + gridSize / 2, gridSize / 2 - 2, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(pacman.x * gridSize + gridSize / 2, pacman.y * gridSize + gridSize / 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
}

function drawWalls() {
    ctx.fillStyle = "blue";
    walls.forEach(wall => {
        ctx.fillRect(wall.x * gridSize, wall.y * gridSize, gridSize, gridSize);
    });
}

function movePacman() {
    let nextX = pacman.x + pacman.dx;
    let nextY = pacman.y + pacman.dy;

    if (!walls.some(wall => wall.x === nextX && wall.y === nextY)) {
        pacman.x = nextX;
        pacman.y = nextY;
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWalls();
    drawPacman();
    movePacman();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") { pacman.dx = 0; pacman.dy = -1; }
    if (event.key === "ArrowDown") { pacman.dx = 0; pacman.dy = 1; }
    if (event.key === "ArrowLeft") { pacman.dx = -1; pacman.dy = 0; }
    if (event.key === "ArrowRight") { pacman.dx = 1; pacman.dy = 0; }
    
    // Prevent arrow keys from scrolling the page
    event.preventDefault();
});

setInterval(update, 200);

