const x = readline();
const n = parseInt(readline());
printErr(x);
function plateToInt(plate)
{
    const [g1, cde, g2] = plate.split('-');
    const [a, b] = g1.split('');
    const [f, g] = g2.split('');
    // return (
    //     ((a.charCodeAt() - 65) * 26 ** 3 +
    //         (b.charCodeAt() - 65) * 26 ** 2 +
    //         (f.charCodeAt() - 65) * 26 ** 1 +
    //         (g.charCodeAt() - 65) * 26 ** 0) *
    //         1000 +
    //     +cde
    // );
    return parseInt(g1 + g2, 26) * 1000 + +cde;
}

function intToPlate(n)
{
    const val = Math.floor(n / 1000).toString(26) + (n % 1000);
    printErr(val);
    return val;
}

const serial = plateToInt(x);
printErr(serial);
const newPlate = intToPlate(serial + n)
    .toUpperCase()
    .split('');
const [a, b, f, g, c, d, e] = newPlate;
print(a + b + '-' + c + d + e + '-' + f + g);
