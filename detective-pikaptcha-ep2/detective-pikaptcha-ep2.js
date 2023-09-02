const arrowToDir = '^>v<';
const [, h] = readline().split(' ');
let direction;
let initialCoords;
const grid = new Array(+h).fill(0).map((_, i) => {
    const row = readline().split('');
    if (direction === undefined)
    {
        for (let j = 0; j < row.length; j++)
        {
            const dir = arrowToDir.indexOf(row[j]);
            if (dir > -1)
            {
                direction = dir;
                initialCoords = [j, i];
                break;
            }
        }
    }
    return row;
});
const rotate = readline() === 'R' ? -1 : 1;
const offset = -rotate;
const WALL = '#';
const DIR = [
    [0, -1],
    [1, 0],
    [0, +1],
    [-1, 0],
];
function getNextCoord(coord)
{
    const [x, y] = coord;
    const nextCoords = DIR.map((c) => [c[0] + x, c[1] + y]);
    direction = direction + 1 * offset;
    for (let i = 0; i < nextCoords.length; i++)
    {
        const dirToCheck = (4 + direction + i * rotate) % 4;
        const nextCoord = nextCoords[dirToCheck];
        const [nextX, nextY] = nextCoord;
        const value = grid[nextY]?.[nextX];
        if (value !== undefined && value !== WALL)
        {
            direction = dirToCheck;
            return nextCoord;
        }
    }
}

let coords = getNextCoord(initialCoords);
if (!coords)
    grid[initialCoords[1]][initialCoords[0]] = 0;
while (coords)
{
    const [x, y] = coords;
    const value = grid[y][x];
    if (arrowToDir.includes(value))
    {
        grid[y][x] = 1;
        break;
    }
    grid[y][x]++;
    coords = getNextCoord([x, y]);
    printErr(coords);
}

for (const row of grid)
    console.log(row.join(''));
