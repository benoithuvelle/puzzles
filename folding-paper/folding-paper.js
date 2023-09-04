const motions = readline().split('');
let paper = new Array(4).fill(1);
const sides = 'URDL'.split('');
const foldings = [() => 1, (x) => x * 2, (x, i) => x + paper[(4 + i + 2) % 4], (x) => x * 2];
const wantedSide = readline();

for (const motion of motions)
{
    const newPaper = [];
    const current = sides.indexOf(motion);
    for (let i = 0; i < 4; i++)
    {
        const index = (4 + current + i) % 4;
        newPaper[index] = foldings[i](paper[index], index);
    }
    paper = newPaper;
}

console.log(paper[sides.indexOf(wantedSide)]);
