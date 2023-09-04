const people = {};
const n = +readline();
for (let i = 0; i < n; i++)
{
    const [a, b] = readline().split(' ');
    if (!people[a])
        people[a] = { id: a, children: [] };
    if (!people[b])
        people[b] = { id: b, children: [] };
    people[a].children.push(people[b]);
}

let maxDepth = 1;

for (const p of Object.values(people))
{
    let node;
    const stack = [{ ...p, depth: 1 }];
    while (stack.length)
    {
        node = stack.pop();
        if (node.depth > maxDepth)
            maxDepth = node.depth;
        const depth = ++node.depth;
        for (const child of node.children)
            stack.push({ ...child, depth });
    }
}
console.log(maxDepth);
