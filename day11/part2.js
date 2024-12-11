const fs = require('fs');

const results = {};
const steps = 75;
const doCount = (stone, step) => {
    if (step === steps) {
        return 1;
    }

    if (results[`${stone},${step}`]) {
      return results[`${stone},${step}`];
    }

    let newStone;
    if (stone === 0) {
        newStone = doCount(1, step + 1);
    } else if (('' + stone).length % 2 === 0) {
        let stoneString = '' + stone;
        let left = stoneString.substring(0, stoneString.length / 2);
        let right = stoneString.substring(stoneString.length / 2);
        newStone = doCount(parseInt(left), step + 1) + doCount(parseInt(right), step + 1);
    } else {
        newStone = doCount(stone * 2024, step + 1);
    }
    results[`${stone},${step}`] = newStone;
    return newStone;

}
const input = fs.readFileSync('./input', 'utf-8');
const start = performance.now();
let nums = input.split(' ').map(Number);
let count = 0;
for (let i=0; i<nums.length; i++) {
    count += doCount(nums[i], 0)
};

console.log(`Solution is ${count}`);
console.log(`Solution took ${performance.now() - start}ms`);