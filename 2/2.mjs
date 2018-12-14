import fs from 'fs'
import path from 'path'

const __dirname = path.resolve(path.dirname('')) + '/2'

const data = fs.readFileSync(`${__dirname}/1.txt`, 'utf8');

var commonMax = ''

const getCommon = (s1, s2) => {
  let res = ''
  // assuming same length
  for (let i = 0; i < s1.length; i++) {
    const e1 = s1[i]
    const e2 = s2[i]
    if (e1 == e2) {
      res += e1
    }
  }
  return res
}

const strings = data.split('\n')
strings.forEach((s1, i) => {
  strings.forEach((s2, j) => {
    if (i != j) {
      const gc = getCommon(s1, s2)
      if (gc.length > commonMax.length) {
        commonMax = gc
      }
    }
  })
})

console.log(commonMax)
