const fs = require('fs');

const input = fs.readFileSync('./test', 'utf-8');

const start = performance.now();

console.log(`Solution took ${performance.now() - start}ms`);