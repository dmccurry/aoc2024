const fs = require('fs');

const doBlink = (nums) => {
    const newNums = [];
    for (let i=0; i<nums.length; i++) {
        let stone = nums[i];
        if (stone === 0) {
            newNums.push(1);
        } else if (('' + stone).length % 2 === 0) {
            let stoneString = '' + stone;
            let left = stoneString.substring(0, stoneString.length / 2);
            let right = stoneString.substring(stoneString.length / 2);
            newNums.push(parseInt(left));
            newNums.push(parseInt(right));
        } else {
            newNums.push(stone * 2024);
        }
    }

    return newNums;
}

const input = fs.readFileSync('./input', 'utf-8');

const start = performance.now();
let nums = input.split(' ').map(Number);
const blinks = 25;
let blink = 0;

while (blink++ < blinks) {
    nums = doBlink(nums);
}

console.log(`Solution is ${nums.length}`);
console.log(`Solution took ${performance.now() - start}ms`);