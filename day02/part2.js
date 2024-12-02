const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8');
const lines = input.split('\n');
const reports = [];
const isSafe = (report, skip) => {
    let start = skip == 0 ? 1 : 0;
    let end = skip == report.length - 1 ? report.length - 2 : report.length - 1;
    
    let next = skip == start + 1 ? start + 2 : start + 1;
    const isIncreasing = report[next] > report[start];

    for (let i=start; i<end; i++) {
        let current = i;
        let next = skip == current + 1 ? current + 2 : current + 1;
        if (i != skip) {
            if (Math.abs(report[i] - report[next]) > 3) {
                return false;
            }
            if (isIncreasing && report[next] <= report[i]) {
                return false
            }
            if (!isIncreasing && report[next] >= report[i]) {
                return false;
            }
        }  
    }
    return true;
}
for (let i=0; i<lines.length; i++) {
    reports.push(lines[i].split(' ').map(i => parseInt(i)));
}
let numSafe = 0;
for (let i=0; i<reports.length; i++) {

    for (let j=0; j<reports[i].length; j++) {
        if (isSafe(reports[i], j)) {
            numSafe++;
            break;
        }
    }
}

console.log(`Solution is ${numSafe}`);

