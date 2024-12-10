const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8');
const start = performance.now();
const disk = [];
const files = {};
const frees = [];
let free = false;
let index = 0;
let curr = 0;
for (let i=0; i<input.split('').length; i++) {
    const digit = parseInt(input[i]);
    if (!free) {
        files['' + index] = {
            start: curr,
            end: curr+digit
        }
        for (let j=0; j<digit; j++) {
            disk.push(''+index);
        }
        index++;
    } else {
        frees.push({
            start: curr,
            end: curr+digit
        });
        for (let j=0; j<digit; j++) {
            disk.push('.');
        }
    }
    curr += digit;
    free = !free;
}

frees.sort((a, b) => a.start - b.start);

index--;
while (index >= 0) {
    const file = files['' + index];
    const fs = file.start, fe = file.end, len = fe - fs;

    for (let i=0; i<frees.length; i++) {
        let space = frees[i];
        if (space.end - space.start >= len) {
            for (let j=0; j<len; j++) {
                disk[space.start + j] = '' + index;
                disk[fs + j] = '.';
            }
            space.start += len;
            break;
        }
    }

    index--;
}
let checksum = 0n;
for (let i=0; i<disk.length; i++) {
    if (disk[i] !== '.') {
        checksum += (BigInt(i) * BigInt(parseInt(disk[i])));
    }
}
//8648369083555 too high
//6460170593016 correct
console.log(`Solution is ${checksum}`);
console.log(`Solution took ${performance.now() - start}ms`);