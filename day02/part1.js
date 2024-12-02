const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8');
const lines = input.split('\n');
const reports = [];
const isSafe = (report) => {
    const isIncreasing = report[1] > report[0];

    for (let i=0; i<report.length - 1; i++) {
        if (Math.abs(report[i] - report[i+1]) > 3) {
            return false;
        }
        if (isIncreasing && report[i+1] <= report[i]) {
            return false;
        }
        if (!isIncreasing && report[i+1] >= report[i]) {
            return false;
        }
    }
    return true;
}
for (let i=0; i<lines.length; i++) {
    reports.push(lines[i].split(' ').map(i => parseInt(i)));
}
let numSafe = 0;
for (let i=0; i<reports.length; i++) {
    if (isSafe(reports[i])) {
        numSafe++;
    }
}

console.log(`Solution is ${numSafe}`);

