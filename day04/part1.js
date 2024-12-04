const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8');
const rows = input.split('\n');
const grid = [];

for(let i=0; i<rows.length; i++) {
    grid[i] = rows[i].split('');
}
let xmas = 0;
const start = performance.now();
for (let i=0; i<grid.length; i++) {
    for (let j=0; j<grid[i].length; j++) {
        let current = grid[i][j];
        if (current === 'X') {
            // start of a possible word, we need to check
            // right
            if (j+3 < grid[i].length && grid[i][j+1] + grid[i][j+2] + grid[i][j+3] == 'MAS') {
                xmas++;
            }
            // left
            if (j-3 >= 0 && grid[i][j-1] + grid[i][j-2] + grid[i][j-3] == 'MAS') {
                xmas++;
            }
            // down
            if (i+3 < grid.length && grid[i+1][j] + grid[i+2][j] + grid[i+3][j] == 'MAS') {
                xmas++;
            }
            // up
            if (i-3 >= 0 && grid[i-1][j] + grid[i-2][j] + grid[i-3][j] == 'MAS') {
                xmas++;
            }
            // and four diagonals
            // up right
            if (i-3 >= 0 && j+3 < grid[i].length && grid[i-1][j+1] + grid[i-2][j+2] + grid[i-3][j+3] == 'MAS') {
                xmas++;
            }
            // down right
            if (i+3 < grid.length && j+3 < grid[i].length && grid[i+1][j+1] + grid[i+2][j+2] + grid[i+3][j+3] == 'MAS') {
                xmas++;
            }
            // down left
            if (i+3 < grid.length && j-3 >= 0 && grid[i+1][j-1] + grid[i+2][j-2] + grid[i+3][j-3] == 'MAS') {
                xmas++;
            }
            // up left
            if (i-3 >= 0 && j-3 >= 0 && grid[i-1][j-1] + grid[i-2][j-2] + grid[i-3][j-3] == 'MAS') {
                xmas++;
            }
        }
    }
}
console.log(`Solution is ${xmas}`);
console.log(`Solution took ${performance.now() - start}ms`);