const grid = new Array(+readline()).fill(0).map(() =>
    readline()
        .split(' ')
        .map((x) => +x)
        .map((x, i) => (!(i % 2) ? '.'.repeat(x) : 'O'.repeat(x)))
);

const len = grid[0].join('').length;
let done;
for (const row of grid)
{
    if (row.join('').length !== len)
    {
        print('INVALID');
        done = true;
        break;
    }
}

if (!done)
{
    for (const row of grid)
        print(row.join(''));
}
