// Utils
const grid = new Map();
const hash = (coord) => `${coord[0]}|${coord[1]}`;
const unhash = (hash) => hash.split("|").map((x) => +x);
const DIR = [
  [0, -1],
  [+1, 0],
  [0, +1],
  [-1, 0],
];

function generateChildren(thisHash)
{
  const [x, y] = unhash(thisHash);
  const children = [];
  for (const [X, Y] of DIR)
  {
    const newX = x + X;
    const newY = y + Y;
    const thisHash = hash([newX, newY]);
    const nextNode = grid.get(thisHash);
    if (nextNode === "O")
        children.push(thisHash);
  }
  return children;
}

const w = +readline();
const h = +readline();

// fill the grid
for (let i = 0; i < h; i++)
{
  const row = readline().split("");
  for (let j = 0; j < w; j++)
    grid.set(hash([j, i]), row[j]);
}

// test every cell
const N = +readline();
for (let i = 0; i < N; i++)
{
  const coord = readline().split(" ");
  const lake = new Set();
  const cell = hash(coord);

  if (grid.get(cell) !== "O")
  {
    console.log(0);
    continue;
  }
  const stack = [cell];

  lake.add(cell);
  while (stack.length)
  {
    let cell = stack.pop();
    const children = generateChildren(cell);
    for (const child of children)
    {
      if (!lake.has(child))
      {
        lake.add(child);
        stack.push(child);
      }
    }
  }

  console.log(lake.size);
}
