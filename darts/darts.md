# Darts

19 novembre 2023
https://www.codingame.com/ide/puzzle/darts

## Strategy

### in circle

x2 + y2 <= (size/2)^2

### in square

Math.abs(x) <= SIZE/2 && Math.abs(y) <= SIZE/2

### in diamond

Math.abs(x) <= SIZE/2 - Math.abs(y) && Math.abs(y) <= SIZE/2 - Math.abs(x)

### Structure

let score
if (in diamond)
score = 15
else if (in circle)
score = 10
else if (in square)
score = 5

### Specs

const nameList = { name : {name, index, score = 0} }
for const throw of throws
nameList[name].score += getScore(x,y)

const results = Object.values(nameList).sort((a,b) => {
if (a.score !== b.score)
return a.score - b.score
return a.index - b.index
})

for (const player of results)
console.log(player.name, player.score)
