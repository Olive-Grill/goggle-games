const canvas = document.getElementById("pacmanCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const rows = canvas.width / gridSize;
const cols = canvas.height / gridSize;

let pacman = { x: 1, y: 1, dx: 0, dy: 0 };

// Simple Maze Representation (1 = wall, 0 = open space)
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function drawMaze() {
    ctx.fillStyle = "blue";
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) {
                ctx.fillRect(col * gridSize, row * gridSize, gridSize, gridSize);
            }
        }
    }
}

function drawPacman() {
    ctx.beginPath();
    ctx.arc(
        pacman.x * gridSize + gridSize / 2,
        pacman.y * gridSize + gridSize / 2,
        gridSize / 2 - 2,
        0.2 * Math.PI,
        1.8 * Math.PI
    );
    ctx.lineTo(pacman.x * gridSize + gridSize / 2, pacman.y * gridSize + gridSize / 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
}

function movePacman() {
    let nextX = pacman.x + pacman.dx;
    let nextY = pacman.y + pacman.dy;

    // Prevent movement into walls
    if (maze[nextY][nextX] !== 1) {
        pacman.x = nextX;
        pacman.y = nextY;
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
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
