class Game {
  constructor(size, cellSize, font) {
    this.highscore = +localStorage.getItem("high-score");
    if (!this.highscore) this.highscore = 0;
    this.font = font;
    this.cellSize = cellSize;
    this.size = size;
    this.board = [];
    for (let i = 0; i < this.size; i++) {
      let row = [];
      for (let j = 0; j < this.size; j++) {
        let cell = new Cell(
          i * this.cellSize,
          j * this.cellSize,
          this.cellSize,
          i,
          j
        );
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

  end() {
    const score = this.snake.length - 3;
    if (score > this.highscore) {
      this.highscore = score;
      localStorage.setItem("high-score", this.highscore);
    }
  }

  draw() {
    this.drawScore();
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.snake.includes(this.board[i][j])) {
          this.board[i][j].draw(this.COLOR_SNAKE);
        } else if (this.food.includes(this.board[i][j])) {
          this.board[i][j].draw(this.COLOR_FOOD);
        } else {
          this.board[i][j].draw(this.COLOR);
        }
      }
    }
  }

  drawScore() {
    fill("WHITE");
    rect(0, this.cellSize * this.size, this.cellSize * this.size, 100);
    fill(this.COLOR_FOOD);
    textFont(this.font);
    textAlign(CENTER, CENTER);
    textSize(58);
    text(
      `Highscore: ${this.highscore} Score: ${this.snake.length - 3}`,
      (this.cellSize * this.size) / 2,
      this.cellSize * this.size + 33
    );
    // textSize(64);
    // text(`Highscore: ${this.highscore}`, this.cellSize * this.size / 2, this.cellSize * this.size + 66);
  }

  getNewHead(dir) {
    let head = this.snake[0];
    let newRow = head.row + dir.y;
    if (newRow >= this.size) {
      newRow = 0;
    }
    if (newRow < 0) {
      newRow = this.size - 1;
    }
    let newCol = head.col + dir.x;
    if (newCol >= this.size) {
      newCol = 0;
    }
    if (newCol < 0) {
      newCol = this.size - 1;
    }
    let newHead = this.board[newRow][newCol];
    return newHead;
  }

  changeDir(dir) {
    let newHead = this.getNewHead(dir);

    if (newHead != this.snake[1]) {
      this.dir = dir;
    }
  }

  frame() {
    let head = this.snake[0];
    let newHead = this.getNewHead(this.dir);

    for (let i = this.snake.length - 1; i > 0; i--) {
      [this.snake[i], this.snake[i - 1]] = [this.snake[i - 1], this.snake[i]];
    }
    if (this.snake.includes(newHead)) {
      this.over = true;
    }
    if (this.food.includes(newHead)) {
      this.snake.push(head);
      this.food.splice(
        this.food.findIndex((el) => el == newHead),
        1
      );
      this.generateFood(1);
    }
    this.snake[0] = newHead;
  }

  generateFood(number) {
    let newFood = this.snake[0];
    while (this.snake.includes(newFood)) {
      newFood = random(random(this.board));
    }
    this.food.push(newFood);
  }
}
