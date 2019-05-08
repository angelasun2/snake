let canvas = document.getElementById("canvas");
console.log(canvas);

let ctx = canvas.getContext('2d');

// grid 50x50 from horizontal boxes = width/size
let size = 10;
// initial snake of length 3 at top left
let snake = [];
let food;

let dx = size;
let dy = 0;

addToSnake(0, 0);
addToSnake(10, 0);
addToSnake(20, 0);



// automatically updates every 100 ms
setInterval(update, 100);
// runs keys function for every key input
window.addEventListener("keydown", keys);

let width =canvas.width;
let height = canvas.height;

addFood();

// drawRect(10, 20);

function addToSnake(xVal, yVal) {
	snake.push({
		x: xVal,
		y: yVal
	});

	drawRect(xVal, yVal);
}


function update() {
	ctx.clearRect(0, 0, width, height);
	snake.shift();  // removes first element from snake

	if (foodCollide()) {
		addFood();  // new food 
		addSnake();
	}

	if (selfCollide()) {
		alert("YOU LOST");
	}
 
	addSnake();
	drawSnake();
	drawRect(food.x, food.y);
}

function foodCollide() {
	let headX = snake[snake.length - 1].x;
	let headY = snake[snake.length - 1].y;
	if (headX == food.x && headY == food.y) {
		return true;
	}

	return false;
}

function selfCollide() {
	// check if snake head collides with any other body part
	for (let i = 0; i < snake.length - 1; i++) {
		if (snake[i].x == snake[snake.length - 1].x &&
			snake[i].y == snake[snake.length - 1].y) {
			return true;
		}
	}

	return false;
}

function addSnake() {
	let x = (snake[snake.length - 1].x + dx);
	let y = snake[snake.length - 1].y + dy;

	if (dx == size && snake[snake.length - 1].x == width) {  // right
		x = 0;
	} else if (dx == -size && snake[snake.length - 1].x == 0) {  // left
		x = width;
	} else if (dy == -size && snake[snake.length - 1].y == 0) {  // top
		y = height;
	} else if (dy == size && snake[snake.length - 1].y == height) {  // bottom
		y = 0;
	}

	addToSnake(x, y);
}


function drawRect(x, y) {
	ctx.fillStyle = 'blue';
	ctx.fillRect(x, y, size, size);

}

function drawSnakeRect(x, y) {
	ctx.fillStyle = 'black';
	ctx.fillRect(x, y, size, size);

}

function drawSnake() {
	for (let i = 0; i < snake.length; i++) {
		drawSnakeRect(snake[i].x, snake[i].y);
	}
}

function addFood() {
	let xVal = Math.floor(Math.random() * width/size) * size;
	let yVal = Math.floor(Math.random() * height/size) * size;

	food = {
		x: xVal,
		y: yVal
	}
}

function keys(e) {
	console.log(e);
	if (e.keyCode == 40) { // down
		console.log("DOWN");
		dx = 0;
		dy = size;
	} else if (e.keyCode == 39) { // right
		dx = size;
		dy = 0;
	} else if (e.keyCode == 38) { // top
		dx = 0;
		dy = -size;
	} else if (e.keyCode == 37) { // left
		dx = -size;
		dy = 0;
	}
}