const [numberWidth, h] = readline()
    .split(' ')
    .map((x) => +x);
function compute(operation, a, b)
{
    switch (operation)
    {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
    }
}
const cyphers = [];

let str = '';
for (let i = 0; i < h; i++)
    str += readline();

for (let i = 0; i < 20; i++)
{
    let cypher = '';
    for (let j = i * numberWidth; j < str.length; j += numberWidth * 20)
    {
        cypher += str.substring(j, j + numberWidth);
        cyphers[i] = cypher;
    }
}

let a = '';
let b = '';
const S1 = parseInt(readline());
for (let i = 0; i < S1; i++)
    a += readline();

const S2 = parseInt(readline());
for (let i = 0; i < S2; i++)
    b += readline();

const stringLength = h * numberWidth;
const aValues = [];
const nbCypherInA = a.length / stringLength;
for (let i = 0; i < nbCypherInA; i++)
{
    const start = i * stringLength;
    aValues.push(a.substring(start, start + stringLength));
}
const bValues = [];
const nbCypherInB = b.length / stringLength;
for (let i = 0; i < nbCypherInB; i++)
{
    const start = i * stringLength;
    bValues.push(b.substring(start, start + stringLength));
}

const operation = readline();
const value1 = aValues.reverse().reduce((num, c, i) => {
    const val = cyphers.indexOf(c);
    num += val * 20 ** i;
    return num;
}, 0);
const value2 = bValues.reverse().reduce((num, c, i) => {
    const val = cyphers.indexOf(c);
    num += val * 20 ** i;
    return num;
}, 0);
let total = compute(operation, +value1, +value2);
const power = [];

while (total > -1)
{
    let rest = total;
    let base = 0;
    let exp = 0;
    if (rest < 20)
    {
        base = rest;
        power[exp] = base;
        break;
    }
    else
    {
        while (rest > 20)
        {
            rest /= 20;
            exp++;
        }
        total -= Math.floor(rest) * 20 ** exp;
        power[exp] = Math.floor(rest);
    }
}

for (const pow of power.reverse())
{
    const stringValue = cyphers[pow ?? 0];
    for (let i = 0; i < stringValue.length; i += numberWidth)
        console.log(stringValue.substring(i, i + numberWidth));
}
