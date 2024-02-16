const BOARDWIDTH = 15;
const CELLWIDTH = 40;
const LATENCY = 90;

let game;
const dir = {
	up: {
		x: 0,
		y: -1
	},
	down: {
		x: 0,
		y: 1
	},
	left: {
		x: -1,
		y: 0				
	},
	right: {
		x: 1,
		y: 0
	}
};

function setup() 
{
	angleMode(DEGREES);
	createCanvas(CELLWIDTH * BOARDWIDTH, CELLWIDTH * BOARDWIDTH);
	stroke(255, 255, 255);
	game = new Game(BOARDWIDTH, CELLWIDTH);
}
// adfadsf

function keyPressed() {
	if (keyCode === UP_ARROW) {
		game.changeDir(dir.up);
	} else if (keyCode === DOWN_ARROW) {
		game.changeDir(dir.down);
	} else if (keyCode === LEFT_ARROW) {
		game.changeDir(dir.left);
	} else if (keyCode === RIGHT_ARROW) {
		game.changeDir(dir.right);
	}
}

let lastTime = 0;
function draw()
{
	if(game.over) {
		game = new Game(BOARDWIDTH, CELLWIDTH);
	}
	game.draw();
	if(millis() - lastTime >= LATENCY) {
		lastTime = millis();
		game.frame();
	}
}	