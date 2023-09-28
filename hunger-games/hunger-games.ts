const players = Object.fromEntries(new Array(+readline()).fill(0).map((name) => [readline(), { victims: [] }]));
const turns = +readline();
for (let i = 0; i < turns; i++)
{
    const info = readline();
    const regEx: RegExp = /(\w+)/g;
    const test = info.match(regEx);
    const killer = test.shift();
    test.shift();
    const victims = test;
    for (const victim of victims)
        players[victim].killer = killer;
    players[killer].victims = [...players[killer].victims, ...victims];
}

printErr(players);
for (const [name, player, i] of Object.keys(players)
    .sort()
    .map((name, i) => [name, players[name], i]))
    {
    console.log('Name:', name);
    console.log('Killed:', player.victims && player.victims.length !== 0 ? player.victims.sort().join(', ') : 'None');
    console.log('Killer:', player.killer ?? 'Winner');
    if (i !== Object.keys(players).length - 1)
        console.log('');
}
