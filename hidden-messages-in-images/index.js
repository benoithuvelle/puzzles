const [w, h] = readline()
    .split(' ')
    .map((x) => +x);

const grid = [
    ...Array(h)
        .fill(0)
        .map(() =>
            readline()
                .split(' ')
                .map((x) => +x)
                .map((n) => +n.toString(2).slice(-1))
        )
        .flat(),
].join('');

const bits = [];
for (let i = 0; i < grid.length; i += 8)
{
    const bit = grid.substring(i, i + 8);
    bits.push(bit);
}

print(bits.map((byte) => String.fromCharCode(parseInt(byte, 2))).join(''));
