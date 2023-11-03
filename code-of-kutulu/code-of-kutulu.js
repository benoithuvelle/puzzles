/**
 * Survive the wrath of Kutulu
 * Coded fearlessly by JohnnyYuge & nmahoude (ok we might have been a bit scared by the old god...but don't say anything)
 **/

const width = parseInt(readline());
const height = parseInt(readline());
for (let i = 0; i < height; i++) {
    const line = readline();
}
var inputs = readline().split(' ');
const sanityLossLonely = parseInt(inputs[0]); // how much sanity you lose every turn when alone, always 3 until wood 1
const sanityLossGroup = parseInt(inputs[1]); // how much sanity you lose every turn when near another player, always 1 until wood 1
const wandererSpawnTime = parseInt(inputs[2]); // how many turns the wanderer take to spawn, always 3 until wood 1
const wandererLifeTime = parseInt(inputs[3]); // how many turns the wanderer is on map after spawning, always 40 until wood 1

// game loop
while (true) {
    const entityCount = parseInt(readline()); // the first given entity corresponds to your explorer
    for (let i = 0; i < entityCount; i++) {
        var inputs = readline().split(' ');
        const entityType = inputs[0];
        const id = parseInt(inputs[1]);
        const x = parseInt(inputs[2]);
        const y = parseInt(inputs[3]);
        const param0 = parseInt(inputs[4]);
        const param1 = parseInt(inputs[5]);
        const param2 = parseInt(inputs[6]);
    }

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    console.log('WAIT');     // MOVE <x> <y> | WAIT

}
