const BOARDWIDTH = 15;
const CELLWIDTH = 40;
const LATENCY = 90;
let font;

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
	font = loadFont('assets/Honk-Regular.ttf');
	angleMode(DEGREES);
	createCanvas(CELLWIDTH * BOARDWIDTH, CELLWIDTH * BOARDWIDTH + 100);
	stroke(255, 255, 255);
	game = new Game(BOARDWIDTH, CELLWIDTH, font);
}

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
		game.end();
		game = new Game(BOARDWIDTH, CELLWIDTH, font);
	}
	game.draw();
	if(millis() - lastTime >= LATENCY) {
		lastTime = millis();
		game.frame();
	}
}	