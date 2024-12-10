const fs = require('fs');
const scores = {};
const score = (start, current, grid) => {
    const [i, j] = current;
    const value = grid[i][j];
    if (value === 9) {
        scores[start].push(current);
        return;
    }
    let up, down, right, left = 0;
    if (i > 0) {
        up = grid[i-1][j];
    }
    if (i < grid.length - 1) {
        down = grid[i+1][j]
    }
    if (j > 0) {
        left = grid[i][j-1];
    }
    if (j < grid[i].length - 1) {
        right = grid[i][j+1];
    }
    if (up === value+1) {
        score(start, [i-1,j], grid);
    }
    if (down === value+1) {
        score(start, [i+1,j], grid);
    }
    if (left === value+1) {
        score(start, [i,j-1], grid);
    }
    if (right === value+1) {
        score(start, [i,j+1], grid);
    }
    return;
}

const input = fs.readFileSync('./input', 'utf-8');
const start = performance.now();
const grid = [];
const lines = input.split('\n');
for (let i=0; i<lines.length; i++) {
    grid[i] = lines[i].split('').map(Number);
}
const trailheads = []
for (let i=0; i<grid.length; i++) {
    for (let j=0; j<grid[i].length; j++) {
        if (grid[i][j] === 0) {
            trailheads.push(`${i},${j}`);
            scores[`${i},${j}`] = [];
        }
    }
}

for (let i=0; i<trailheads.length; i++) {
    score(trailheads[i], trailheads[i].split(',').map(Number), grid);
}

const finalScores = {};
Object.keys(scores).forEach(s => {
    const v = {};
    let total = 0;
    for (let i=0; i<scores[s].length; i++) {
        const p = `${scores[s][i][0]},${scores[s][i][1]}`;
        if (!v[p]) {
            v[p] = 1;
            total++;
        }
    }
    finalScores[s] = total;
});

let solution = 0;
Object.values(finalScores).forEach(s => solution += s);
console.log(`Solution is ${solution}`);
console.log(`Solution took ${performance.now() - start}ms`);