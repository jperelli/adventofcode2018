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

const dataArr = data.split('\n')

dataArr.forEach(d => {
  const regex = /#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/gm;
  let [id, l, t, w, h] = regex.exec(d).splice(1).map(s => Number(s))
  for (let i = l; i < l + w; i++) {
    for (let j = t; j < t + h; j++) {
      fabric[i][j]++
    }
  }
})

let ID = ''
dataArr.forEach(d => {
  const regex = /#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/gm;
  let [id, l, t, w, h] = regex.exec(d).splice(1).map(s => Number(s))
  let ok = true
  for (let i = l; i < l + w; i++) {
    for (let j = t; j < t + h; j++) {
      if (fabric[i][j] != 1) {
        ok = false
        break
      }
    }
    if (!ok) break
  }
  if (ok) {
    ID = id
  }
})

console.log(ID)
