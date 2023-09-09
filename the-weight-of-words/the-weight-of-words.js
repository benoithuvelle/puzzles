const steps = +readline();
const h = +readline();
const w = +readline();

const grid = new Array(h).fill(0).map(() => readline().split(''));
function getWeight(array)
{
    return array.reduce((sum, c) => sum + c.charCodeAt(), 0);
}

for (const step of [...Array(steps).keys()])
{
    for (const columnId of [...Array(w).keys()])
    {
        const column = [];
        for (const rowId of [...Array(h).keys()])
            column.push(grid[rowId][columnId]);
        const weight = getWeight(column);
        for (let i = 0; i < weight % h; i++)
        {
            const el = column.pop();
            column.unshift(el);
        }
        for (let i = 0; i < h; i++)
            grid[i][columnId] = column[i];
    }
    for (const rowId of [...Array(h).keys()])
    {
        const row = grid[rowId];
        const weight = getWeight(row);
        for (let i = 0; i < weight % w; i++)
        {
            const el = row.pop();
            row.unshift(el);
        }
    }
}

for (const row of grid)
    print(row.join(''));
