const fs = require('fs');

const reorder = (sequence, rules) => {
    swapped = true;
    while (swapped) {
        swapped = false;
        for (let i=0; i<rules.split('\n').length; i++) {
            const rule = rules.split('\n')[i];
            const [before, after] = rule.split('|');
            if (sequence.indexOf(before) >= 0 && sequence.indexOf(after) >= 0 && sequence.indexOf(before) > sequence.indexOf(after)) {
                sequenceArray = sequence.split(',');
                bi = sequenceArray.indexOf(before);
                ai = sequenceArray.indexOf(after);
                b = sequenceArray[bi];
                sequenceArray[bi] = sequenceArray[ai];
                sequenceArray[ai] = b;
                sequence = sequenceArray.join(',');
                swapped = true;
            }
        }
    }
    return sequence;
}

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

let invalidUpdates = updates.split('\n');
invalidUpdates = invalidUpdates.filter(update => {
    return !validUpdates.includes(update);
});

const finalUpdates = [];
for (let i=0; i<invalidUpdates.length; i++) {
    finalUpdates.push(reorder(invalidUpdates[i], rules));
}

let total = 0;
for (let i=0; i<finalUpdates.length; i++) {
    const finalUpdate = finalUpdates[i].split(',');
    const middle = parseInt(finalUpdate[Math.floor(finalUpdate.length / 2)]);
    total += middle;
}
console.log(`Solution is ${total}`);
console.log(`Solution took ${performance.now() - start}ms`);