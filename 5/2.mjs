import fs from 'fs'
import path from 'path'

const __dirname = path.resolve(path.dirname('')) + '/5'

function shrinked_length(original) {
  let data = original.slice()
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
  return data.length
}

function remove_letra(original, letra) {
  let data = original.slice()
  let i = 0
  while (i < data.length) {
    let letra_primera = data[i]
    if (letra_primera.toUpperCase() == letra) {
      data = data.slice(0, i) + data.slice(i + 1)
    }
    else {
      i = i + 1
    }
  }
  return data
}

let data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

let letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

let min_length = 9999999

for (let i = 0; i < letras.length; i++) {
  const letra = letras[i]
  let data_sin_letra = remove_letra(data, letra)
  let long = shrinked_length(data_sin_letra)
  if (long < min_length) {
    min_length = long
  }
}

console.log(min_length)
