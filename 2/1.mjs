import fs from 'fs'
import path from 'path'

const __dirname = path.resolve(path.dirname('')) + '/2'

const data = fs.readFileSync(`${__dirname}/1.txt`, 'utf8');

var count2 = 0
var count3 = 0

const count = (s, c) =>
  (s.join('').match(new RegExp(c, 'g')) || []).length

data.split('\n').forEach(d => {
  const v = d.split('')
  const s = Array.from(new Set(v))
  var has2 = false
  var has3 = false
  for (var i = 0; i < s.length; i++) {
    if (!has2 && count(v, s[i]) == 2) {
      has2 = true
    }
    if (!has3 && count(v, s[i]) == 3) {
      has3 = true
    }
  }
  if (has2) count2++
  if (has3) count3++
})

console.log(count2 * count3)
