const StartButton = document.getElementById('start');
const ResetButton = document.getElementById('reset');
const cleanButton = document.getElementById('clean');
const showGridButton = document.getElementById('showGrid');

let run = false;

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const cellSize = 20;
const cols = Math.floor(window.innerWidth / cellSize);
const rows = Math.floor(window.innerHeight / cellSize);
const grid = new Grid(rows + 2, cols + 2, cellSize, cellSize, 0);

canvas.width = (cols + 2) * cellSize;
canvas.height = (rows + 2) * cellSize;

const centerX = Math.floor(cols / 2);
const centerY = Math.floor(rows / 2);

grid.grid[centerY][centerX - 3].alive = true;
grid.grid[centerY][centerX - 2].alive = true;
grid.grid[centerY][centerX - 1].alive = true;
grid.grid[centerY][centerX + 1].alive = true;
grid.grid[centerY][centerX + 2].alive = true;
grid.grid[centerY + 1][centerX + 2].alive = true;
grid.grid[centerY][centerX + 3].alive = true;

canvas.addEventListener('click', event => {
    run = false;
    const { clientX, clientY } = event;
    const { left, top } = canvas.getBoundingClientRect();
    const x = Math.floor((clientX - left) / cellSize);
    const y = Math.floor((clientY - top) / cellSize);

    grid.toggleCell(x, y);
    grid.draw(ctx);
});

const toggleRun = () => {
    run = !run;
    StartButton.textContent = run ? 'Pause' : 'Start';
};

StartButton.addEventListener('click', toggleRun);
cleanButton.addEventListener('click', () => {
    grid.reset();
    grid.draw(ctx);
});

ResetButton.addEventListener('click', () => {
    grid.reset();
    grid.grid[centerY][centerX - 3].alive = true;
    grid.grid[centerY][centerX - 2].alive = true;
    grid.grid[centerY][centerX - 1].alive = true;
    grid.grid[centerY][centerX + 1].alive = true;
    grid.grid[centerY][centerX + 2].alive = true;
    grid.grid[centerY + 1][centerX + 2].alive = true;
    grid.grid[centerY][centerX + 3].alive = true;
    grid.draw(ctx);
});

showGridButton.addEventListener('click', () => {
    grid.showGrid = !grid.showGrid;
    grid.draw(ctx); 
});

const animateGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.draw(ctx);

    if (run) {
        grid.update();
    }

    requestAnimationFrame(animateGame);
};

animateGame();
animate();