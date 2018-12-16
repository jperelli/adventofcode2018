import fs from 'fs'
import path from 'path'

const __dirname = path.resolve(path.dirname('')) + '/7'

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

// build nodes graph: nodes == [{id:'A', needs:['A',..'Z']}, ..]
let nodes = data
  .split('\n')
  .map(d => {
    let a = d.split(' ')
    return {id: a[7], need: a[1]}
  })
  .reduce((nodes, s) => {
    let n = nodes.find(e => e.id == s.id)
    if (!n) {
      nodes.push({id: s.id, needs: [s.need]})
    }
    else {
      n.needs.push(s.need)
    }

    let n2 = nodes.find(e => e.id == s.need)
    if (!n2) {
      nodes.push({id: s.need, needs: []})
    }

    return nodes
  }, [])
nodes.sort((a, b) =>
  a.id.charCodeAt() - b.id.charCodeAt()
)

// solve
function all_satisfied(needs, solution) {
  return needs.filter(n => !solution.includes(n)) == 0
}

let solution = []  // ['A',..'Z']
while (nodes.length > 0) {
  let selected = null
  for (let i = 0; i < nodes.length; i++) {
    if (all_satisfied(nodes[i].needs, solution)) {
      selected = nodes[i]
      break;
    }
  }
  nodes = nodes.filter(n => n.id != selected.id)
  solution.push(selected.id)
}

console.log(solution.join(''))
