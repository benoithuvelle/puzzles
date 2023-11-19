const DIR = [
    [0, -1],
    [+1, 0],
    [0, +1],
    [-1, 0],
];
const w = +readline();
const h = +readline();
const grid = new Array(h).fill(0).map(() => readline().split(''));

// Useless informations
readline().split(' ').map(Number);

// game loop
while (true)
{
    const map = [...grid].map((row) => [...row]);
    let me;
    const friends = [];
    const ghosts = [];
    const entityCount = +readline(); // the first given entity corresponds to your explorer
    for (let i = 0; i < entityCount; i++)
    {
        var inputs = readline().split(' ');
        const type = inputs[0];
        const id = parseInt(inputs[1]);
        const x = parseInt(inputs[2]);
        const y = parseInt(inputs[3]);
        parseInt(inputs[4]);
        parseInt(inputs[5]);
        parseInt(inputs[6]);

        //Add entity to the map
        if (me || type !== 'EXPLORER')
            map[y][x] = type === 'EXPLORER' ? 'E' : 'G';

        if (type === 'EXPLORER')
        {
            if (!me)
                me = { id, x, y };
            else
                friends.push({ id, x, y });
        }
        else
            ghosts.push({ id, x, y });
    }

    let node = { x: me.x, y: me.y };
    const queue = [node];
    const alreadyVisited = new Set();

    while (queue.length)
    {
        node = queue.shift();
        if (alreadyVisited.has(`${node.x}|${node.y}`))
            continue;
        alreadyVisited.add(`${node.x}|${node.y}`);

        if (map[node.y][node.x] === 'E')
            break;
        for (const d of DIR)
        {
            const [deltaX, deltaY] = d;
            const nextX = node.x + deltaX;
            const nextY = node.y + deltaY;
            const value = map[nextY][nextX];
            const nextNode = { x: nextX, y: nextY, value, parent: node };
            if (value !== '#' && 0 < nextX && nextX < w && 0 < nextY && nextY < h)
                queue.push(nextNode);
        }
    }

    const path = [];

    while (node)
    {
        path.unshift([node.x, node.y]);
        node = node.parent;
    }

    let canGo = false;
    const [simX, simY] = path[1] ?? [];
    if (path.length > 1)
    {
        canGo = true;
        //Simulate
        for (const d of DIR)
        {
            const [deltaX, deltaY] = d;
            const newX = simX + deltaX;
            const newY = simY + deltaY;
            const value = map[newY][newX];
            if (value === 'G')
            {
                canGo === false;
                break;
            }
        }
    }

    if (canGo)
        console.log('MOVE', simX, simY);
    else
    {
        let ghostNextToMe = [];
        let freeCells = [];
        for (const d of DIR)
        {
            const [deltaX, deltaY] = d;
            const newX = me.x + deltaX;
            const newY = me.y + deltaY;
            const value = map[newY][newX];
            if (value === 'G')
                ghostNextToMe.push([newX, newY]);
            else if (value === '.')
            {
                freeCells.push([newX, newY]);
            }
        }
        if (!ghostNextToMe.length)
            console.log('WAIT');
        else if (freeCells.length)
        {
            const [x, y] = freeCells[0];
            console.log('MOVE', x, y);
        }
        else
            console.log('WAIT');
    }
}
