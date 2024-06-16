class Cell {
    constructor(x, y, alive = false) {
        this.x = x;
        this.y = y;
        this.alive = alive;
        this.neighborsAlive = 0;
    }

    calculateNextState() {
        if (this.alive) {
            if (this.neighborsAlive < 2 || this.neighborsAlive > 3) {
                return false;
            }
            return true;
        }
        if (this.neighborsAlive === 3) {
            return true;
        }
        return false;

    }
}

class Grid {
    constructor(rows, cols, cellWidth = 12, cellHeight = 12, steps = 0) {
        this.steps = steps;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;

        this.rows = rows;
        this.cols = cols;
        this.grid = this.createGrid();
        this.showGrid = false;
    }

    createGrid() {
        const grid = [];
        for (let i = 0; i < this.rows; i++) {
            const row = [];
            for (let j = 0; j < this.cols; j++) {
                row.push(new Cell(j, i));
            }
            grid.push(row);
        }
        return grid;
    }

    countNeighbors() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cell = this.grid[i][j];
                let neighborsAlive = 0;

                const neighbors = [
                    [i - 1, j], [i - 1, j - 1], [i - 1, j + 1],
                    [i + 1, j], [i + 1, j - 1], [i + 1, j + 1],
                    [i, j - 1], [i, j + 1]
                ];

                neighbors.forEach(([x, y]) => {
                    if (this.grid[x] && this.grid[x][y] && this.grid[x][y].alive) {
                        neighborsAlive++;
                    }
                });

                cell.neighborsAlive = neighborsAlive;
            }
        }
    }

    draw() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cell = this.grid[i][j];
                ctx.fillStyle = cell.alive ? 'white' : 'black';
                ctx.fillRect(j * this.cellWidth, i * this.cellHeight, this.cellWidth, this.cellHeight);

                if (this.showGrid) {
                    ctx.strokeStyle = 'white';
                    ctx.strokeRect(j * this.cellWidth, i * this.cellHeight, this.cellWidth, this.cellHeight);
                    ctx.stroke();
                }

                // ctx.font = '12px Arial';
                // ctx.fillStyle = 'white';
                // ctx.textAlign = 'center';
                // ctx.fillText(cell.neighborsAlive, j * this.cellWidth + this.cellWidth / 2, i * this.cellHeight + this.cellHeight / 2 + 5);
            }
        }
    }

    update() {
        this.countNeighbors();

        const nextGridState = this.grid.map(row => row.map(cell => cell.calculateNextState()));

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j].alive = nextGridState[i][j];
            }
        }
    }

    toggleCell(x, y) {
        const cell = this.grid[y][x];
        cell.alive = !cell.alive;
    }

    reset() {
        this.grid = this.createGrid();
    }
}