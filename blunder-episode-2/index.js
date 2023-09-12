function hash(parent, child)
{
    return parent + '|' + child;
}
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
const roomValues = {};

while (magicStack.length)
{
    node = magicStack.pop();
    if (node.neighbours)
    {
        for (const n of node.neighbours)
        {
            const roomValue = roomValues[hash(node.id, n)];
            if (roomValue !== undefined)
            {
                const weight = node.weight + roomValue;
                if (weight > bestValue)
                    bestValue = weight;
            }
            else
            {
                const neighbour = {
                    ...building[n],
                    parent: node,
                    weight: node.weight + building[n].value,
                };
                let index;

                for (let i = 0; i < magicStack; i++)
                {
                    if (magicStack[i].weight > neighbour.weight)
                    {
                        index = i;
                        break;
                    }
                }
                magicStack.splice(index, 0, neighbour);
                // magicStack.push(neighbour);
            }
        }
    }
    else
    {
        // printErr('this node has no neighbours', node.id);
        if (node.weight > bestValue)
            bestValue = node.weight;
        node.magicValue = node.value;
        while (node.parent)
        {
            node.parent.magicValue = node.magicValue + node.parent.value;
            const h = hash(node.parent.id, node.id);
            roomValues[h] = node.magicValue;
            node = node.parent;
        }
    }
}

print(bestValue);
