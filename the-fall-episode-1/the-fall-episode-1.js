const [w, h] = readline()
    .split(' ')
    .map((x) => +x);
const grid = new Array(h).fill(0).map(() => readline().split(' '));

const types = [
    () => undefined,
    () => '0 1',
    (position) => (position === 'RIGHT' ? '-1 0' : '1 0'),
    () => '0 1',
    (position) => (position === 'TOP' ? '-1 0' : '0 1'),
    (position) => (position === 'TOP' ? '1 0' : '0 1'),
    (position) => (position === 'RIGHT' ? '-1 0' : '1 0'),
    () => '0 1',
    () => '0 1',
    () => '0 1',
    () => '-1 0',
    () => '1 0',
    () => '0 1',
    () => '0 1',
];
+readline(); // this should be assigned to futur exit

// game loop
while (true)
{
    const [x, y, position] = readline().split(' ');
    const type = +grid[y][x];

    const [deltaX, deltaY] = types[type](position)
        .split(' ')
        .map((x) => +x);
    console.log(+x + deltaX, +y + deltaY);
}
