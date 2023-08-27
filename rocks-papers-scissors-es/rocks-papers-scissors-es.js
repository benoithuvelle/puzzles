function getScore(me, opponent)
{
	const score = (3 + me - opponent) % 3;
	return score == 2 ? undefined : score;
}
const typeToInt = new Map([
	["Rock", 0],
	["Paper", 1],
	["Scissors", 2],
]);
const intToType = new Map([
	[0, "Rock"],
	[1, "Paper"],
	[2, "Scissors"],
]);
const opponents = [];
const scoreToIndex = [];

//Init
const n = readline();
for (let i = 0; i < n; i++)
	opponents.push(typeToInt.get(readline()));

//Body
const len = opponents.length;
for (let i = 0; i < len; i++)
{
	const root = i;
	let total = 0;
	const me = (3 + opponents[root] + 1) % 3;
	for (let j = 0; j < len; j++)
	{
		const opponent = opponents[(root + j) % len];
		const score = getScore(me, opponent);
		if (score !== undefined)
			total += score;
		else
			break;
	}
	if (!scoreToIndex[total])
		scoreToIndex[total] = { root, me };
}

const flat = scoreToIndex.flat();
const { me, root } = flat.at(-1);
console.log(intToType.get(me));
console.log(root);
