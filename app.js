// Example of interactive behavior with JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const gameArea = document.getElementById('gameArea');

    startButton.addEventListener('click', function () {
        gameArea.style.display = 'block'; // Show game area
        startButton.style.display = 'none'; // Hide start button
    });
});
