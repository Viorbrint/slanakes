class Game {
	constructor(size, cellSize) 
	{
		this.cellSize = cellSize;
		this.size = size;
		this.board = [];
		for(let i = 0; i < this.size; i++) {
			let row = []
			for(let j = 0; j < this.size; j++) {
				let cell = new Cell(i * this.cellSize, j * this.cellSize, this.cellSize, i, j);
				row.push(cell);
			}
			this.board.push(row);
		}
		this.snake = [this.board[0][2], this.board[0][1], this.board[0][0]];
		this.food = [];
		this.changeDir(dir.right);
		this.COLOR = color(96, 185, 219);
		this.COLOR_SNAKE = color(7, 47, 74);
		this.COLOR_FOOD = color(219, 96, 149);
		this.generateFood(1);
	}
	draw() {
		for(let i = 0; i < this.size; i++) {
			for(let j = 0; j < this.size; j++) {
				if(this.snake.includes(this.board[i][j])) {
					this.board[i][j].draw(this.COLOR_SNAKE);
				} else if (this.food.includes(this.board[i][j])) {
					this.board[i][j].draw(this.COLOR_FOOD);
				} else {
					this.board[i][j].draw(this.COLOR);
				}
			}
		}
	}
	
	changeDir(dir) {
		let head = this.snake[0];
		let newRow = head.row + dir.y;
		if(newRow >= this.size) {
			newRow = 0;
		}
		if(newRow < 0) {
			newRow = this.size - 1;
		}
		let newCol = head.col + dir.x;
		if(newCol >= this.size) {
			newCol = 0;
		}
		if(newCol < 0) {
			newCol = this.size - 1;
		}
		let newHead = this.board[newRow][newCol];

		if(newHead != this.snake[1]) {
			this.dir = dir;
		}
		else {
			console.log("asdf");
		}
	}
	
	frame() {
		let head = this.snake[0];
		let newRow = head.row + this.dir.y;
		if(newRow >= this.size) {
			newRow = 0;
		}
		if(newRow < 0) {
			newRow = this.size - 1;
		}
		let newCol = head.col + this.dir.x;
		if(newCol >= this.size) {
			newCol = 0;
		}
		if(newCol < 0) {
			newCol = this.size - 1;
		}
		let newHead = this.board[newRow][newCol];
		for (let i = this.snake.length - 1; i > 0; i--) {
			[this.snake[i], this.snake[i - 1]] = [this.snake[i - 1], this.snake[i]];
		}
		if(this.snake.includes(newHead)) {
			this.over = true;
		}
		if(this.food.includes(newHead)) {
			this.snake.push(head);
			this.food.splice(this.food.findIndex((el) => el == newHead), 1);
			this.generateFood(1);
		}
		this.snake[0] = newHead;
	}

	generateFood(number) {
		let newFood = this.snake[0];
		while(this.snake.includes(newFood)) {
			newFood = random(random(this.board));
		}
		this.food.push(newFood);
	}
}