const N = +readline();
const L = +readline();
const grid = new Array(N).fill(0).map(() => new Array(N).fill(0));
for (let i = 0; i < N; i++)
{
    var inputs = readline().split(' ');
    for (let j = 0; j < N; j++)
    {
        const cell = inputs[j];
        if (cell === 'C')
            grid[i][j] = L;
        else
            grid[i][j] = 0;
    }
}

for (const level of new Array(L).fill(0).map((l, i) => L - i))
{
    for (let i = 0; i < N; i++)
    {
        for (let j = 0; j < N; j++)
        {
            if (grid[i][j] === level)
            {
                for (const [dx, dy] of [
                    [-1, -1],
                    [0, -1],
                    [1, -1],
                    [1, 0],
                    [1, 1],
                    [0, 1],
                    [-1, 1],
                    [-1, 0],
                ])
                {
                    const cell = grid[i + dy]?.[j + dx];
                    if (cell === 0)
                        grid[i + dy][j + dx] = level - 1;
                }
            }
        }
    }
}
printErr(grid);
let total = 0;
for (const row of grid)
{
    for (const c of row)
    {
        total += Boolean(!c);
    }
}
print(total);
