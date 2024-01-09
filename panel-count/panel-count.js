const P = +readline();
const properties = [];
for (let i = 0; i < P; i++)
    properties.push(readline());

const N = +readline();
const persons = [];
for (let i = 0; i < N; i++)
{
    const person = {};
    const inputs = readline().split(' ');
    person.name = inputs.shift();
    for (const property of properties)
        person[property] = inputs.shift();
    persons.push(person);
}

const F = +readline();
for (let i = 0; i < F; i++)
{
    let total = persons.length;
    const formulas = readline()
        .split(' AND ')
        .map((formula) => formula.split('='));
    for (const person of persons)
    {
        for (const part of formulas)
        {
            const [property, value] = part;
            if (person[property] !== value)
            {
                total--;
                break;
            }
        }
    }
    print(total);
}
