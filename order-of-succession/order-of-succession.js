const people = {};
let queen;
const n = +readline();
for (let i = 0; i < n; i++)
{
    const inputs = readline().split(' ');
    const name = inputs[0];
    const parent = inputs[1] === '-' ? undefined : inputs[1];
    const birth = parseInt(inputs[2]);
    const death = inputs[3] !== '-';
    const goodReligion = inputs[4] !== 'Catholic';
    const gender = inputs[5] === 'M' ? 1 : 0;
    if (people[name])
        people[name] = { ...people[name], name, parent, birth, death, goodReligion, gender };
    else
        people[name] = { name, parent, birth, death, goodReligion, gender, children: [] };
    if (!parent)
    {
        queen = people[name];
        continue;
    }
    if (people[parent])
        people[parent].children = [...people[parent].children, people[name]];
    else
        people[parent] = { children: [people[name]] };
}

let node;
const queue = [queen];
while (queue.length)
{
    node = queue.pop();
    if (node.goodReligion && !node.death)
        print(node.name);
    queue.push(
        ...node.children
            .sort((a, b) => {
                if (a.gender !== b.gender)
                    return b.gender - a.gender;
                return a.birth - b.birth;
            })
            .reverse()
    );
}
