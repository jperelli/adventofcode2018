import fs from 'fs'
import path from 'path'

const __dirname = path.resolve(path.dirname('')) + '/1'

const data = fs.readFileSync(`${__dirname}/2.txt`, 'utf8');

var freqs = []
var repeated = null
const dataArray = data.split('\n').map(v => Number(v))
var accumulator = 0

while (repeated === null) {
  for (var i = 0; i < dataArray.length; i++) {
    accumulator += dataArray[i]
    if (freqs.includes(accumulator)) {
      repeated = accumulator
      break;
    }
    freqs.push(accumulator)
  }
}

console.log(repeated)
