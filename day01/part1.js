const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8');
const lines = input.split('\n');
const list1 = [];
const list2 = [];

for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split('  ');
    list1.push(parseInt(parts[0]));
    list2.push(parseInt(parts[1]));   
}
list1.sort();
list2.sort();

let sum = 0;
for (let i = 0; i < list1.length; i++) {
    sum += Math.abs(list1[i] - list2[i]);
}
console.log(`Solution is ${sum}`);