/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const numSites = parseInt(readline());
for (let i = 0; i < numSites; i++) {
    var inputs = readline().split(' ');
    const siteId = parseInt(inputs[0]);
    const x = parseInt(inputs[1]);
    const y = parseInt(inputs[2]);
    const radius = parseInt(inputs[3]);
}

// game loop
while (true) {
    var inputs = readline().split(' ');
    const gold = parseInt(inputs[0]);
    const touchedSite = parseInt(inputs[1]); // -1 if none
    for (let i = 0; i < numSites; i++) {
        var inputs = readline().split(' ');
        const siteId = parseInt(inputs[0]);
        const ignore1 = parseInt(inputs[1]); // used in future leagues
        const ignore2 = parseInt(inputs[2]); // used in future leagues
        const structureType = parseInt(inputs[3]); // -1 = No structure, 2 = Barracks
        const owner = parseInt(inputs[4]); // -1 = No structure, 0 = Friendly, 1 = Enemy
        const param1 = parseInt(inputs[5]);
        const param2 = parseInt(inputs[6]);
    }
    const numUnits = parseInt(readline());
    for (let i = 0; i < numUnits; i++) {
        var inputs = readline().split(' ');
        const x = parseInt(inputs[0]);
        const y = parseInt(inputs[1]);
        const owner = parseInt(inputs[2]);
        const unitType = parseInt(inputs[3]); // -1 = QUEEN, 0 = KNIGHT, 1 = ARCHER
        const health = parseInt(inputs[4]);
    }

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');


    // First line: A valid queen action
    // Second line: A set of training instructions
    console.log('WAIT');
    console.log('TRAIN');
}
