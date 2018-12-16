import fs from 'fs'
import path from 'path'

const __dirname = path.resolve(path.dirname('')) + '/5'

let data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

let i = 0
while (i < data.length - 1) {
  let letra_primera = data[i]
  let letra_segunda = data[i + 1]
  if (
    letra_primera.toUpperCase() == letra_segunda.toUpperCase() &&
    letra_primera != letra_segunda
  ) {
    data = data.slice(0, i) + data.slice(i + 2)
    i = i - 1
  }
  else {
    i = i + 1
  }
  if (i < 0) {
    i = 0
  }
}

console.log(data.length)
