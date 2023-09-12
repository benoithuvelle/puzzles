const building = new Array(+readline())
    .fill(0)
    .map(readline)
    .reduce((obj, c) => {
        const [room, value, n1, n2] = c.split(' ').map((x) => +x);
        let neighbours;
        if (!Number.isNaN(n1) || !Number.isNaN(n2))
        {
            neighbours = [];
            if (!Number.isNaN(n1))
                neighbours.push(n1);
            if (!Number.isNaN(n2))
                neighbours.push(n2);
        }

        obj[room] = { id: room, value, neighbours };
        return obj;
    }, {});

let node = building[0];
let bestValue = 0;
const magicStack = [{ ...node, parent: undefined, weight: node.parent?.weight ?? 0 + node.value }];

while (magicStack.length)
{
    node = magicStack.pop();
    if (node.neighbours)
    {
        // console.debug(node.id, node.neighbours);
        for (const n of node.neighbours)
        {
            const neighbour = {
                ...building[n],
                parent: node,
                weight: node.weight + building[n].value,
            };
            magicStack.push(neighbour);
        }
    }
    else if (node.weight > bestValue)
        bestValue = node.weight;
}

print(bestValue);
