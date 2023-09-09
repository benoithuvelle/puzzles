const tests = {};
const n = parseInt(readline());
let root;
for (let i = 0; i < n; i++)
{
    const [a, b] = readline().split(' > ');
    if (!tests[a])
        tests[a] = [b];
    else
        tests[a].push(b);
    if (!i)
        root = a;
}

const alreadyVisited = new Set();
const queue = [{ id: root, children: tests[root], parent: undefined }];
let node;
let isValid = true;

while (queue.length)
{
    node = queue.shift();
    printErr(node);
    if (node.parent?.includes(node.id))
    {
        isValid = false;
        break;
    }

    for (const id of node.children ?? [])
        queue.push({ id: id, children: tests[id], parent: node.parent ? [...node.parent, node.id] : [node.id] });
    alreadyVisited.add(node.id);
}

print(isValid ? 'consistent' : 'contradiction');
