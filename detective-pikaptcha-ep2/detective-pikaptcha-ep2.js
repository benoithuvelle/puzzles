const [w, h] = readline()
    .split(' ')
    .map((x) => +x);
const grid = new Array(h)
    .fill(0)
    .map(readline)
    .map((x) => x.split(''));
const side = readline();
show(grid, true);

function show(grid, debug)
{
    for (const row of grid)
        console[debug ? 'error' : 'log'](row.join(''));
}
