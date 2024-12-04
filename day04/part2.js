const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8');
const rows = input.split('\n');
const grid = [];

for(let i=0; i<rows.length; i++) {
    grid[i] = rows[i].split('');
}
let xmas = 0;
const start = performance.now();
for (let i=1; i<grid.length-1; i++) {
    for (let j=1; j<grid[i].length-1; j++) {
        let current = grid[i][j];
        if (current === 'A') {
            // possible intersection
            let d1 = grid[i-1][j-1] + 'A' + grid[i+1][j+1];
            let d2 = grid[i-1][j+1] + 'A' + grid[i+1][j-1];
            if (d1 === 'MAS' && d2 === 'MAS') xmas++;
            if (d1 === 'SAM' && d2 === 'MAS') xmas++;
            if (d1 === 'MAS' && d2 === 'SAM') xmas++;
            if (d1 === 'SAM' && d2 === 'SAM') xmas++;
            
        }
    }
}
console.log(`Solution is ${xmas}`);
console.log(`Solution took ${performance.now() - start}ms`);