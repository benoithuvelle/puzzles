const n = readline();
const v = readline();
const m = readline();
const graph = {};
let rootId;
for (let i = 0; i < m; i++)
{
    const [p, l, r] = readline()
        .split(' ')
        .map((x) => +x);
    graph[p] = [l, r];
    if (!i)
        rootId = p;
}

let node;
const queue = [{ id: rootId, parent: undefined, children: graph[rootId] }];

while (queue.length)
{
    node = queue.shift();
    if (+node.id === +v)
        break;
    for (const child of node.children ?? [])
        queue.push({ id: child, parent: node, children: graph[child] });
}

const path = [];
while (node.parent)
{
    path.unshift(node.parent.children.indexOf(node.id));
    node = node.parent;
}

print(!path.length ? 'Root' : path.map((x) => (!x ? 'Left' : 'Right')).join(' '));
