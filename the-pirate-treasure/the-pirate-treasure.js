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
const w = +readline();
const h = +readline();
const grid = new Array(h).fill(0).map(() => readline().split(' '));

for (let i = 0; i < h; i++)
{
    for (let j = 0; j < w; j++)
    {
        let isTreasure = true;
        for (const [deltaX, deltaY] of DIR)
        {
            const nextCell = grid[deltaY + i]?.[deltaX + j];
            if (nextCell === '0')
            {
                isTreasure = false;
                continue;
            }
        }
        if (grid[i][j] === '0' && isTreasure)
            print(j, i);
    }
}
