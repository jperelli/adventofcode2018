import fs from 'fs'
import path from 'path'

const __dirname = path.resolve(path.dirname('')) + '/4'

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

let dataArr = data.split('\n').map(d => {
  const date = new Date(/\[(.*)\]\s.*/gm.exec(d)[1])
  return {
    date,
    d
  }
})

dataArr.sort((a, b) => a.date - b.date)

let getGuard = s => {
  const guard = /\[.*\]\sGuard\s#(\d*).*/.exec(s)
  return guard ? Number(guard[1]) : null
}

let getSleepStart = s => {
  const ss = /\[.*:(\d\d).*\]\sfalls/.exec(s)
  return ss ? Number(ss[1]) : null
}

let getSleepStop = s => {
  const ss = /\[.*:(\d\d).*\]\swakes/.exec(s)
  return ss ? Number(ss[1]) : null
}

let guards = {}
let sleepStart = 0
let guard = 0
dataArr.forEach(d => {
  if (getGuard(d.d) !== null) {
    guard = getGuard(d.d)
    //console.log(d.d, guard)
  }
  if (getSleepStart(d.d) !== null) {
    sleepStart = getSleepStart(d.d)
    //console.log(d.d, guard, sleepStart)
  }
  if (getSleepStop(d.d) !== null) {
    let sleepStop = getSleepStop(d.d)
    if (guards[guard] === undefined) {
      guards[guard] = Array(60).fill(0)
    }
    //console.log(d.d, guard, sleepStart, sleepStop)
    for (let i = sleepStart; i < sleepStop; i++) {
      guards[guard][i]++;
    }
  }
})

// get the guard with max minute
let guardMax = Object.entries(guards).sort((a, b) => Math.max(...b[1]) - Math.max(...a[1]))[0][0]

// get the max minute
let maxMinute = Array.from(guards[guardMax].slice().entries()).sort((a, b) => b[1] - a[1])[0][0]

//console.log(guardMax, maxMinute, guardMax*maxMinute)
console.log(guardMax * maxMinute)
