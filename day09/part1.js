const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8');
const start = performance.now();
const disk = [];
let free = false;
let index = 0;
for (let i=0; i<input.split('').length; i++) {
    const digit = parseInt(input[i]);
    if (!free) {
        for (let j=0; j<digit; j++) {
            disk.push(''+index);
        }
        index++;
    } else {
        for (let j=0; j<digit; j++) {
            disk.push('.');
        }
    }
    free = !free;
}
let end = disk.length - 1;
for (let i=0; i<disk.length; i++) {
    if (disk[i] === '.') {
        for (let j=end; j > i; j--) {
            if (disk[j] != '.') {
                disk[i] = disk[j];
                disk[j] = '.';
                end = j-1;
                break;
            }
        }
    }
}
let checksum = 0
for (let i=0; i<disk.length; i++) {
    if (disk[i] !== '.') {
        checksum += (i * parseInt(disk[i]));
    }
}
console.log(`Solution is ${checksum}`);
console.log(`Solution took ${performance.now() - start}ms`);