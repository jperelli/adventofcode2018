import fs from 'fs'
import path from 'path'

const __dirname = path.resolve(path.dirname('')) + '/6'

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

let dataArr = data.split('\n').map(d => {
  return d.split(', ').map(n => Number(n)+1)
})

let maxX = Math.max(...dataArr.map(p => p[0]))+2
let maxY = Math.max(...dataArr.map(p => p[1]))+2

let grid = Array(maxX)
for (let i = 0; i < grid.length; i++) {
  grid[i] = Array(maxY).fill(null)
}

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    grid[i][j] = dist(i, j, dataArr)
  }
}

function dist(x, y, dataArr) {
  let min_i
  let min_d = 9999999
  for (let i = 0; i < dataArr.length; i++) {
    const p = dataArr[i]
    // let d = Math.sqrt((x-p[0])*(x-p[0]) + (y-p[1])*(y-p[1]))
    let d = Math.abs(x-p[0]) + Math.abs(y-p[1])
    if (d == min_d) {
      min_i = null
    }
    if (d < min_d) {
      min_d = d
      min_i = i
    }
  }
  return min_i
}

// solve
let ignore = []
let results = Array(dataArr.length).fill(0)
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (i == 0 || i == grid.length - 1 || j == 0 || j == grid[i].length - 1 && !ignore.includes(grid[i][j])) {
      ignore.push(grid[i][j])
    }
    if (grid[i][j] != null && !ignore.includes(grid[i][j])) {
      results[grid[i][j]]++
    }
  }
}

console.log(Math.max(...results))
