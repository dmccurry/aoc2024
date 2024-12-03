const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8');

const start = performance.now();

const dontsplit = input.split('don\'t()');
const instructions = [];
instructions.push(dontsplit.shift());
for (let i=0; i<dontsplit.length; i++) {
    const dosplit = dontsplit[i].split('do()');
    dosplit.shift();
    while(dosplit.length > 0) instructions.push(dosplit.shift());
}


const regEx = new RegExp(/(mul\()(\d{1,3}),(\d{1,3})(\))/g);
const allInstructions = instructions.join(',');
const all = [...allInstructions.matchAll(regEx)];
let total = 0;
for (let i=0; i<all.length; i++) {
    total += parseInt(all[i][2]) * parseInt(all[i][3]);
}
console.log(`Solution is ${total}`);
console.log(`Solution took ${performance.now() - start}ms`);

