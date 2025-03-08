const canvas = document.getElementById("flappyCanvas");
const ctx = canvas.getContext("2d");

const bird = new Image();
bird.src = "https://i.imgur.com/Uyemdfk.png"; // Bird sprite
const bg = new Image();
bg.src = "https://i.imgur.com/XNqA5Bh.png"; // Background
const pipeTop = new Image();
pipeTop.src = "https://i.imgur.com/GGfMNqh.png"; // Top Pipe
const pipeBottom = new Image();
pipeBottom.src = "https://i.imgur.com/lZfJuJb.png"; // Bottom Pipe

let birdX = 50, birdY = 200, gravity = 1.5, velocity = 0;
let pipes = [{ x: canvas.width, y: Math.floor(Math.random() * 200) - 200 }];
let score = 0;
let gameOver = false;

document.addEventListener("keydown", jump);
document.addEventListener("click", jump);

function jump(event) {
    if (event.code === "Space" || event.type === "click") {
        velocity = -12; // Flap up
    }
}

function draw() {
    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", 130, 250);
        return;
    }

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(bird, birdX, birdY, 35, 35);

    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        ctx.drawImage(pipeTop, pipe.x, pipe.y, 50, 200);
        ctx.drawImage(pipeBottom, pipe.x, pipe.y + 300, 50, 200);
        pipe.x -= 3;

        // Collision detection
        if (
            (birdX + 35 > pipe.x && birdX < pipe.x + 50 &&
                (birdY < pipe.y + 200 || birdY + 35 > pipe.y + 300)) ||
            birdY + 35 > canvas.height
        ) {
            gameOver = true;
        }

        // Score update
        if (pipe.x === birdX) {
            score++;
        }
    }

    // Add new pipes
    if (pipes[pipes.length - 1].x < canvas.width - 200) {
        pipes.push({ x: canvas.width, y: Math.floor(Math.random() * 200) - 200 });
    }

    birdY += velocity;
    velocity += gravity;

    // Score display
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 20, 30);

    requestAnimationFrame(draw);
}

draw();
