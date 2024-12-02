const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8');
const lines = input.split('\n');
const list1 = [];
const list2 = {};

for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split('  ');
    list1.push(parseInt(parts[0]));
    const p1 = parseInt(parts[1]);
    if (list2[p1]) {
        list2[p1] += 1;
    } else {
        list2[p1] = 1;
    }
}
const start = performance.now();
list1.sort();
let sum = 0;
for (let i = 0; i < list1.length; i++) {
    const l2 = list2[list1[i]] ? list2[list1[i]] : 0;
    sum += list1[i] * l2;
}
console.log(`Solution is ${sum}`);
console.log(`Solution took ${performance.now() - start}ms`);