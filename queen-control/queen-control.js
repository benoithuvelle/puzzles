const DIR = [
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
];
const color = readline()[0]; // 'b'|'w'
const opponent = color === 'w' ? 'b' : 'w'; // 'b'|'w'
const grid = [];
let x, y;

for (let i = 0; i < 8; i++)
{
    const rowString = readline(); // string of length 8
    const index = rowString.indexOf('Q');
    if (index > -1)
    {
        x = index;
        y = i;
    }
    grid[i] = rowString.split('');
}

let count = 0;
for (const [deltaX, deltaY] of DIR)
{
    let newX = x + deltaX;
    let newY = y + deltaY;
    while (grid[newY]?.[newX] === '.')
    {
        // undefined | '.' | 'b' | 'w'
        count++;
        newX += deltaX;
        newY += deltaY;
    }
    if (grid[newY]?.[newX] === opponent)
        count++;
}

console.log(count);
