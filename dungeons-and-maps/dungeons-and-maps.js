// INPUTS
const [w, h] = readline()
  .split(" ")
  .map((x) => +x);
const initialCoords = readline()
  .split(" ")
  .map((x) => +x)
  .reverse(); // [x,y]

const maps = new Array(+readline())
  .fill(0)
  .map((_) => new Array(h).fill(0).map((_) => readline().split("")));

// UTILS
const DIR_MAP = {
  ">": [+1, 0],
  "<": [-1, 0],
  "^": [0, -1],
  v: [0, +1],
};
const hash = (coords) => `${coords[0]}|${coords[1]}`;
const paths = [];

function getNextCoords(map, coords)
{
  printErr(coords);
  const [x, y] = coords;
  const cell = map[y][x];
  if (cell === "T")
      return undefined;
  const diffCoords = DIR_MAP[cell];
  if (!diffCoords)
      throw "TRAP";
  const [X, Y] = diffCoords;
  const [newX, newY] = [x + X, y + Y];
  return [newX, newY];
}

// BODY
for (let i = 0; i < maps.length; i++)
{
  printErr("test", i);
  const map = maps[i];
  const visited = new Set();
  let len = 0;
  let currentCoords = [...initialCoords];

  try
  {
    while (currentCoords)
    {
      len++;
      visited.add(hash(currentCoords));
      const nextCoords = getNextCoords(map, currentCoords);
      if (!nextCoords || !visited.has(hash(nextCoords)))
        currentCoords = nextCoords;
      else
          throw "Already Seen";
    }
    paths[len] = i;
  }
  catch (e)
  {
    printErr(e);
  }
}
printErr(paths);
console.log(paths.length ? paths.flat()[0] : "TRAP");
