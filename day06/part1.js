const fs = require('fs');
const input = fs.readFileSync('./input', 'utf-8');
const grid = [];
for (let i=0; i<input.split('\n').length; i++) {
    grid[i] = input.split('\n')[i].split('');
}
const start = performance.now();
let currentI = -1;
let currentJ = -1;
let currentDir = '';
const next = {
    '^':'>',
    '>':'v',
    'v':'<',
    '<':'^'
};
const visited = {};
for (let i=0; i<grid.length; i++) {
    for (let j=0; j<grid[i].length; j++) {
        if (grid[i][j] != '#' && grid[i][j] != '.') {
            currentI = i;
            currentJ = j;
            currentDir = grid[i][j];
            visited[`${i},${j}`] = 1;
            grid[i][j] = '.';
        }
    }
}

while (currentI >= 0 && currentJ >=0 && currentI < grid.length && currentJ < grid[0].length) {
    let nextI = currentI;
    let nextJ = currentJ;
    if (currentDir === '^') {
        nextI--;
    } else if (currentDir === 'v') {
        nextI++;
    } else if (currentDir === '>') {
        nextJ++;
    } else if (currentDir === '<') {
        nextJ--;
    }
    if (nextI >= 0 && nextJ >= 0 && nextI < grid.length && nextJ < grid[0].length) {
        if (grid[nextI][nextJ] === '.') {
            currentI = nextI;
            currentJ = nextJ;
            visited[`${currentI},${currentJ}`] = 1;
        } else {
            currentDir = next[currentDir];
        }
    } else {
        currentI = nextI;
        currentJ = nextJ;
    }
}
console.log(`Solution is ${Object.keys(visited).length}`);
console.log(`Solution took ${performance.now() - start}ms`);