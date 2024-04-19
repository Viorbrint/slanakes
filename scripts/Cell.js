class Cell {
  constructor(x, y, cellWidth, row, col) {
    this.size = cellWidth;
    this.x = x;
    this.y = y;
    this.row = row;
    this.col = col;
  }
  draw(color) {
    fill(color);
    square(this.y, this.x, this.size);
  }
}
