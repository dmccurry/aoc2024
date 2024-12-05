const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8');
const [rules, updates] = input.split('\n\n');

const start = performance.now();
let validUpdates = updates.split('\n');
for (let i=0; i<rules.split('\n').length; i++) {
    const rule = rules.split('\n')[i];
    const [before, after] = rule.split('|');

    validUpdates = validUpdates.filter(update => {
        if (update.indexOf(before) >= 0 && update.indexOf(after) >= 0 && update.indexOf(before) > update.indexOf(after)) {
            return false;
        }
        return true;
    });
}

let total = 0;
for (let i=0; i<validUpdates.length; i++) {
    const validUpdate = validUpdates[i].split(',');
    const middle = parseInt(validUpdate[Math.floor(validUpdate.length / 2)]);
    total += middle;
}
console.log(`Solution is ${total}`);
console.log(`Solution took ${performance.now() - start}ms`);