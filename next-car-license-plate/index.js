const x = readline();
const n = parseInt(readline());
function plateToInt(plate)
{
    const [g1, cde, g2] = plate.split('-');
    const [a, b] = g1.split('');
    const [f, g] = g2.split('');
    return (
        ((a.charCodeAt() - 65) * 26 ** 3 +
            (b.charCodeAt() - 65) * 26 ** 2 +
            (f.charCodeAt() - 65) * 26 ** 1 +
            (g.charCodeAt() - 65) * 26 ** 0) *
            1000 +
        +cde
    );
}

function intToPlate(n)
{
    // n /= 1000;
    const exp = [];
    for (let i = 0; i < 4; i++)
    {
        n /= Math.floor(26);
        exp.push(n % 26);
    }
    printErr(exp);
    return val;
}

const serial = plateToInt(x);
const newPlate = intToPlate(serial + n)
    .toUpperCase()
    .split('');
const [a, b, f, g, c, d, e] = newPlate;
print(a + b + '-' + c + d + e + '-' + f + g);
