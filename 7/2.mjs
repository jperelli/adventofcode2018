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
function all_satisfied(needs, solved) {
  return needs.filter(n => !solved.includes(n)) == 0
}

function value(id) {
  return id.charCodeAt() - 4
  //return id.charCodeAt() - 64
}

let workers = []  // ['A',..'Z']
let step = -1
let solved = []
do {
  step++
  for (let i = 0; i < workers.length; i++) {
    const w = workers[i];
    if (w.in + value(w.id) - step == 0) {
      workers = workers.filter(w2 => w2.id != w.id )
      solved.push(w.id)
      i--
    }
  }
  let available_nodes = nodes.filter(n => !solved.concat(workers.map(w => w.id)).includes(n.id) && all_satisfied(n.needs, solved))
  while (workers.length < 5 && available_nodes.length > 0) {
    let to_remove = available_nodes.shift().id
    workers.push({id:to_remove, in: step})
    nodes = nodes.filter(n => n.id != to_remove)
  }
  //console.log(step, workers, nodes.length)
}
while (workers.length > 0 || nodes.length > 0)

console.log(step)
