// Defining HTML Elements
const board = document.querySelector(".border3");
const logoText = document.querySelector('.logoText');
const logo = document.querySelector('.logo');
const myscore = document.querySelector('#myscore');
const highScore = document.querySelector('#highscore');
const button = document.querySelector('button');
const restart = document.querySelector('#restart');


// Game Variables
const gridSize = 35;
let snake = [{ x: 15, y: 15 }];
let food = genarateFood();
// let highScore = 0;
let direction = 'right';
let gameSpeedDelay = 200;
let gameStarted = false;
let gameInterval;



// Draw Map, Snake Food
function draw() {
    board.innerHTML = "";
    drawSnake();
    drawFood();
    updateScore();

}
// draw();
// Draw Snake
function drawSnake() {
    snake.forEach((segments) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segments);
        board.appendChild(snakeElement);
    });
}

// Draw Food
function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}
function genarateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };

}

// Creating Snake or Food
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//Set the Position of Snake or Food

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}
// Moving Snake

function move() {
    const head = { ...snake[0] }
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = genarateFood();
        clearInterval(gameInterval);// premade function
        gameInterval = setInterval(() => {
            move();
            collision();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop();
    }
}



// Start game Function

function startGame() {
    gameStarted = true;
    gameInterval = setInterval(() => {
        draw();
        move();
        collision();
    }, gameSpeedDelay);

}
        

//Event Listner
function handleKeyPress(event) {
    if ((!gameStarted && event.code === 'Space')||(!gameStarted && event.key === '' )||(!gameStarted && event.click === 'click')
    ) {
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up'
                break;
            case 'ArrowDown':
                direction = 'down'
                break;
            case 'ArrowLeft':
                direction = 'left'
                break;
            case 'ArrowRight':
                direction = 'right'
                break;
        }
    }
}

// function buttonStart(){
//     button.addEventListener('click',()=>{
//         startGame();
        
//     })
// }buttonStart();

// function restartButton (){
//     restart.addEventListener('click',()=>{

//     })
// }resetButton ();


document.addEventListener('keydown', handleKeyPress);

function gameSpeed() {
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;

    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 4;

    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 3;

    } else if (gameSpeedDelay > 30) {
        gameSpeedDelay -= 2;

    }
}

function collision() {
    const head = snake[0]

    if (head.x < 1 || head.y < 1 || head.x > gridSize || head.y > gridSize) {
        resetGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame() {
    updateHighcore();
    stopGame();
    snake = [{ x: 15, y: 15 }];
    food = genarateFood();
    direction = 'right';
    gameSpeedDelay = 200;
    gameStarted = false;
    gameInterval;
    // board.classList.add('logo');
    // board.classList.add('logoText');
}

function updateScore() {
    const currentScore = snake.length - 1;
    myscore.textContent = currentScore.toString().padStart(3, '0');
}
function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
}
function updateHighcore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
    }
    highScore.textContent = ('High Score ' + currentScore.toString().padStart(3, '0'));
    highScore.style.display = 'flex';


}
