import fs from 'fs'
import path from 'path'

const __dirname = path.resolve(path.dirname('')) + '/1'

const data = fs.readFileSync(`${__dirname}/1.txt`, 'utf8');

const result = data.split('\n').reduce((accumulator, currentValue) => {
  return accumulator + Number(currentValue)
}, 0)

console.log(result)
