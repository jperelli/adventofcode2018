import fs from 'fs'
import path from 'path'
import util from 'util'

const __dirname = path.resolve(path.dirname('')) + '/8'

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

let metadata_sum = 0

function make_tree(data, i) {
  let child_count = data[i]
  let metadata_count = data[i+1]

  let offset = i + 2

  let children = []
  let c = child_count
  while (c-- > 0) {
    let node
    node = make_tree(data, offset)
    children.push(node)
    offset = node.offset
  }


  let metadata = data.slice(offset, offset + metadata_count)
  metadata_sum += metadata.reduce((a, b) => a + b, 0)
  offset += metadata_count

  return {
    child_count,
    metadata_count,
    metadata,
    children,
    offset
  }
}

let dataArr = data.split(' ').map(d => Number(d))

const tree = make_tree(dataArr, 0)

console.log(util.inspect(tree, false, null, true))

console.log(metadata_sum)
