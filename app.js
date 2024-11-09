let canvas = document.querySelector('.canvas');
console.log(canvas);
let ctx = canvas.getContext('2d');
console.log(ctx);

let snake1 = [{x:10, y:5}]; // First snake
let snake2 = [{x:5, y:10}]; // Second snake

let food = {x:5, y:3};
let dx1 = 1, dy1 = 0; // Direction for first snake
let dx2 = 0, dy2 = 1; // Direction for second snake

let score = document.querySelector('.score');

let scorePlayer1 = 0; // Score for Player 1
let scorePlayer2 = 0; // Score for Player 2




function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

function drawSnake(snake, color) {
    snake.forEach(segment => {
        ctx.fillStyle = color;
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });
}

function moveSnake(snake, dx, dy) {
    let head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    // Check if this snake ate the food
    if (head.x === food.x && head.y === food.y) {
        food.x = Math.floor(Math.random() * 20);
        food.y = Math.floor(Math.random() * 20);
        
        // Update score based on which snake ate the food
        if (snake === snake1) {
            scorePlayer1++;
        } else if (snake === snake2) {
            scorePlayer2++;
        }

        updateScoreDisplay();
    } else {
        snake.pop();
    }

    // Check if the snake hits the wall
    if (head.x > 19 || head.x < 0 || head.y > 19 || head.y < 0) {
        alert("Game Over for one of the snakes!");
        resetGame();
    }
}

function updateScoreDisplay() {
    score.innerText = `Player 1: ${scorePlayer1} | Player 2: ${scorePlayer2}`;
}

function resetGame() {
    food.x = Math.floor(Math.random() * 20);
    food.y = Math.floor(Math.random() * 20);
    snake1 = [{x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)}];
    snake2 = [{x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)}];
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    updateScoreDisplay();
}
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();

    moveSnake(snake1, dx1, dy1);
    moveSnake(snake2, dx2, dy2);

    drawSnake(snake1, "green"); // Draw the first snake in green
    drawSnake(snake2, "yellow"); // Draw the second snake in yellow
}


setInterval(updateGame, 250);



document.addEventListener('keydown', (e) => {
    // Controls for the first snake (Arrow keys)
    if (e.key === "ArrowDown" && dy1 !== -1) {
        dx1 = 0; dy1 = 1;
    } else if (e.key === "ArrowUp" && dy1 !== 1) {
        dx1 = 0; dy1 = -1;
    } else if (e.key === "ArrowLeft" && dx1 !== 1) {
        dx1 = -1; dy1 = 0;
    } else if (e.key === "ArrowRight" && dx1 !== -1) {
        dx1 = 1; dy1 = 0;
    }

    // Controls for the second snake (WASD keys)
    if (e.key === "s" && dy2 !== -1) {
        dx2 = 0; dy2 = 1;
    } else if (e.key === "w" && dy2 !== 1) {
        dx2 = 0; dy2 = -1;
    } else if (e.key === "a" && dx2 !== 1) {
        dx2 = -1; dy2 = 0;
    } else if (e.key === "d" && dx2 !== -1) {
        dx2 = 1; dy2 = 0;
    }
});
