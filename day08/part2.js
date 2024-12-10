const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8');
const start = performance.now();
const lines = input.split('\n');
const width = lines[0].length;
const height = lines.length;
const nodes = {};
for (let i=0; i<lines.length; i++) {
    for (let j=0; j<lines[i].split('').length; j++) {
        if (lines[i].split('')[j] != '.') {
            const c = lines[i].split('')[j];
            if (!nodes[c]) {
                nodes[c] = [];
            }
            nodes[c].push([i, j]);
        }
    }
}

const antinodes = {};
Object.keys(nodes).forEach(key => {
    const nodeList = nodes[key];
    if (nodeList.length > 1) {
        for (let i=0; i<nodeList.length; i++) {
            for (let j=i+1; j<nodeList.length; j++) {
                const di = (nodeList[i][0] - nodeList[j][0]);
                const dj = (nodeList[i][1] - nodeList[j][1]);
                antinodes[`${nodeList[i][0]},${nodeList[i][1]}`] = 1;
                antinodes[`${nodeList[j][0]},${nodeList[j][1]}`] = 1;
                let ai = nodeList[i][0] + di;
                let aj = nodeList[i][1] + dj;

                while (ai >= 0 && ai<height && aj >=0 && aj<width) {
                    antinodes[`${ai},${aj}`] = 1;
                    ai += di;
                    aj += dj;
                }

                ai = nodeList[j][0] - di;
                aj = nodeList[j][1] - dj;

                while (ai >= 0 && ai<height && aj >=0 && aj<width) {
                    antinodes[`${ai},${aj}`] = 1;
                    ai -= di;
                    aj -= dj;
                }
            }
        }
    }

});
console.log(`Solution is ${Object.keys(antinodes).length}`);
console.log(`Solution took ${performance.now() - start}ms`);