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
let startI = -1;
let startJ = -1;
let startDir = -1;
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
            startI = currentI;
            startJ = currentJ;
            startDir = currentDir;
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

// now loop through all the points the guard visited to see which 
// will result in an infinite loop
let total = 0;
for (let p = 0; p < Object.keys(visited).length; p++) {
    const pos = Object.keys(visited)[p];
    const [x, y] = pos.split(',');
    const g = JSON.parse(JSON.stringify(grid));
    g[parseInt(x)][parseInt(y)] = '#';
    // reset
    const v = {};
    currentDir = startDir;
    currentI = startI;
    currentJ = startJ;
    while (currentI >= 0 && currentJ >=0 && currentI < g.length && currentJ < g[0].length) {
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
        if (nextI >= 0 && nextJ >= 0 && nextI < g.length && nextJ < g[0].length) {
            if (g[nextI][nextJ] === '.') {
                num = 0;
                const currPos = `${nextI},${nextJ}`;
                const prevPos = `${currentI},${currentJ}`;
                if (v[currPos]) {
                    if (v[currPos].includes(prevPos)) {
                        total++;
                        break;
                    } else {
                        v[currPos].push(prevPos);
                    }
                } else {
                    v[currPos] = [];
                    v[currPos].push(prevPos);
                }
                currentI = nextI;
                currentJ = nextJ;
            } else {
                currentDir = next[currentDir];
            }
        } else {
            currentI = nextI;
            currentJ = nextJ;
        }
    }
}

console.log(`Solution is ${total}`);
console.log(`Solution took ${performance.now() - start}ms`);