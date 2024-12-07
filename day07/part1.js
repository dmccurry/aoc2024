const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8');
const lines = input.split('\n');

const canDo = (target, ops) => {
    if (typeof ops === 'number') {
        return ops === target;
    }
    const opsSplit = ops.split(' ').map(op => parseInt(op));
    if (opsSplit.length === 1 || parseInt(ops) === target) {
        return target === opsSplit[0];
    } else if (opsSplit.length == 2) {
        return target === opsSplit[0] + opsSplit[1] || target == opsSplit[0] * opsSplit[1];  
    } else {
        const op1 = opsSplit.shift();
        const op2 = opsSplit.shift();
        return canDo(target, [op1*op2].concat(opsSplit).join(' ')) || canDo(target, [op1+op2].concat(opsSplit).join(' '));
    }

}

let total = 0;
const start = performance.now();
for (let i=0; i<lines.length; i++) {
    let [target, ops] = lines[i].split(': ');
    target = parseInt(target);
    if (canDo(target, ops)) {
        total += target;
    }
}


console.log(`Solution is: ${total}`);
console.log(`Solution took ${performance.now() - start}ms`);