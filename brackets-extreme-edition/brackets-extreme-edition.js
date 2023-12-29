/**
 * Score points by scanning valuable fish faster than your opponent.
 **/

const creatureCount = parseInt(readline());
for (let i = 0; i < creatureCount; i++) {
    var inputs = readline().split(' ');
    const creatureId = parseInt(inputs[0]);
    const color = parseInt(inputs[1]);
    const type = parseInt(inputs[2]);
}

// game loop
while (true) {
    const myScore = parseInt(readline());
    const foeScore = parseInt(readline());
    const myScanCount = parseInt(readline());
    for (let i = 0; i < myScanCount; i++) {
        const creatureId = parseInt(readline());
    }
    const foeScanCount = parseInt(readline());
    for (let i = 0; i < foeScanCount; i++) {
        const creatureId = parseInt(readline());
    }
    const myDroneCount = parseInt(readline());
    for (let i = 0; i < myDroneCount; i++) {
        var inputs = readline().split(' ');
        const droneId = parseInt(inputs[0]);
        const droneX = parseInt(inputs[1]);
        const droneY = parseInt(inputs[2]);
        const emergency = parseInt(inputs[3]);
        const battery = parseInt(inputs[4]);
    }
    const foeDroneCount = parseInt(readline());
    for (let i = 0; i < foeDroneCount; i++) {
        var inputs = readline().split(' ');
        const droneId = parseInt(inputs[0]);
        const droneX = parseInt(inputs[1]);
        const droneY = parseInt(inputs[2]);
        const emergency = parseInt(inputs[3]);
        const battery = parseInt(inputs[4]);
    }
    const droneScanCount = parseInt(readline());
    for (let i = 0; i < droneScanCount; i++) {
        var inputs = readline().split(' ');
        const droneId = parseInt(inputs[0]);
        const creatureId = parseInt(inputs[1]);
    }
    const visibleCreatureCount = parseInt(readline());
    for (let i = 0; i < visibleCreatureCount; i++) {
        var inputs = readline().split(' ');
        const creatureId = parseInt(inputs[0]);
        const creatureX = parseInt(inputs[1]);
        const creatureY = parseInt(inputs[2]);
        const creatureVx = parseInt(inputs[3]);
        const creatureVy = parseInt(inputs[4]);
    }
    const radarBlipCount = parseInt(readline());
    for (let i = 0; i < radarBlipCount; i++) {
        var inputs = readline().split(' ');
        const droneId = parseInt(inputs[0]);
        const creatureId = parseInt(inputs[1]);
        const radar = inputs[2];
    }
    for (let i = 0; i < myDroneCount; i++) {

        // Write an action using console.log()
        // To debug: console.error('Debug messages...');

        console.log('WAIT 1');         // MOVE <x> <y> <light (1|0)> | WAIT <light (1|0)>

    }
}
