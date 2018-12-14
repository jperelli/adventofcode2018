import fs from 'fs'
import path from 'path'

const __dirname = path.resolve(path.dirname('')) + '/3'

const data = fs.readFileSync(`${__dirname}/1.txt`, 'utf8');

// accumulate on the squares
const SIZE = 2000
let fabric = Array(SIZE)
for (let i = 0; i < fabric.length; i++) {
  fabric[i] = Array(SIZE).fill(0);
}
data.split('\n').forEach(d => {
  let regex = /#\d+\s@\s(\d+),(\d+):\s(\d+)x(\d+)/gm;
  let [l, t, w, h] = regex.exec(d).splice(1).map(s => Number(s))
  for (let i = l; i < l+w; i++) {
    for (let j = t; j < t+h; j++) {
      fabric[i][j]++
    }
  }
})

// count the squares that have more than 1 accumulated
const count = fabric.map(a => a.filter(v => v > 1).length).reduce((a, v) => a + v)

console.log(count)
