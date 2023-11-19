const SIZE = +readline();
const N = +readline();

function getScore(x, y)
{
    if (Math.abs(x) <= SIZE / 2 - Math.abs(y) && Math.abs(y) <= SIZE / 2 - Math.abs(x))
        // in diamond
        return 15;
    else if (x ** 2 + y ** 2 <= (SIZE / 2) ** 2)
        // in circle
        return 10;
    else if (Math.abs(x) <= SIZE / 2 && Math.abs(y) <= SIZE / 2)
        return 5;
}

const players = {};

for (let index = 0; index < N; index++)
{
    const name = readline();
    players[name] = { name, index, score: 0 };
}
const T = +readline();
for (let i = 0; i < T; i++)
{
    const inputs = readline().split(' ');
    const name = inputs[0];
    const x = +inputs[1];
    const y = +inputs[2];
    players[name].score += getScore(x, y);
}

const results = Object.values(players).sort((a, b) => {
    if (a.score !== b.score)
        return b.score - a.score;
    return a.index - b.index;
});

for (const player of results)
    console.log(player.name, player.score);
