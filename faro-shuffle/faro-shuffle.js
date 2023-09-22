const N = +readline();
let deck = readline().split(' ');
const len = deck.length;
const mid = Math.ceil(len / 2);

for (let i = 0; i < N; i++)
{
    const shuffle = [];
    for (let j = 0; j < mid; j++)
    {
        shuffle.push(deck[j]);
        shuffle.push(deck[mid + j]);
    }
    if (len % 2)
        shuffle.pop();
    deck = shuffle;
}

print(deck.join(' '));
