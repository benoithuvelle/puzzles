const creatures = new Array(+readline()).fill(0).map(() => {
    const [id, color, type] = readline()
        .split(' ')
        .map((x) => +x);
    return { id, color, type };
});

// To be updated every turn
let myDrones;
let nearbyCreatures = {};

const creaturesById = {};
const creaturesByType = {};
const creaturesByColor = {};
for (const c of creatures)
{
    creaturesById[c.id] = c;
    if (!creaturesByType[c.type])
        creaturesByType[c.type] = [];
    creaturesByType[c.type].push(c);
    if (!creaturesByColor[c.color])
        creaturesByColor[c.color] = [];
    creaturesByColor[c.color].push(c);
}

// game loop
// eslint-disable-next-line no-constant-condition
while (true)
{
    +readline(); // myScore
    +readline(); // opponentScore

    const myCreaturesId = new Array(+readline()).fill(0).map(() => +readline());
    const opponentCreaturesId = new Array(+readline()).fill(0).map(readline);

    myDrones = new Array(+readline()).fill(0).map(() => {
        const [id, x, y, emergency, battery] = readline().split(' ');
        return { id, x, y, emergency, battery };
    });
    const opponentDrones = new Array(+readline()).fill(0).map(() => {
        const [id, x, y, emergency, battery] = readline().split(' ');
        return { id, x, y, emergency, battery };
    });

    // Unsaved fish scan
    const droneScanCount = +readline();
    for (let i = 0; i < droneScanCount; i++)
        readline().split(' '); // [droneId, creatureId]

    // reset nearbyCreatures
    nearbyCreatures = {};
    const nbOfCreatures = +readline();
    for (let i = 0; i < nbOfCreatures; i++)
    {
        const [id, x, y, vx, vy] = readline()
            .split(' ')
            .map((x) => +x);
        nearbyCreatures[id] = { id, x, y, vx, vy };
    }

    const radarBlipCount = +readline();
    for (let i = 0; i < radarBlipCount; i++)
    {
        const inputs = readline().split(' ');
        const droneId = +inputs[0];
        const creatureId = +inputs[1];
        const radar = inputs[2];
    }

    let lightState = 0;
    const targets = [];

    // if (shouldTargetFishTypes([myCreaturesId, opponentCreaturesId]))
    // {
    //     targets.push(targetFishTypes(myCreaturesId));
    // }
    // else if (shouldTargetColors([myCreaturesId, opponentCreaturesId]))
    // {
    //     targetColors();
    // }
    while (targets.length < myDrones.length)
    {
        let minDist = Infinity;
        let target;
        for (const id in nearbyCreatures)
        {
            const fish = nearbyCreatures[id];
            if (myCreaturesId.includes(fish.id))
                continue;
            for (const drone of myDrones)
            {
                const dist = Math.sqrt((drone.x - fish.x) ** 2 + (drone.y - fish.y) ** 2);
                if (dist < minDist)
                {
                    target = fish;
                    minDist = dist;
                }
            }
            targets.push(target);
        }
        if (minDist < 2000)
            lightState = 1;
    }

    for (let i = 0; i < myDrones.length; i++)
    {
        const target = targets.pop(); // Need to select target according to distance from drones
        if (target)
            console.log(`MOVE ${target.x} ${target.y} ${lightState}`);
        else
            console.log('WAIT 0');
    }
}

function shouldTargetFishTypes(idCollections)
{
    for (const collection of idCollections)
    {
        const types = [];
        for (const id of collection)
        {
            const type = creaturesById[id].type;
            if (!types.includes(type))
                types.push(type);
        }
        if (types.length >= 3)
            return false;
    }
    return true;
}

function targetFishTypes(list)
{
    const types = new Set();
    for (const id of list)
    {
        const type = creaturesById[id].type;
        types.add(type);
    }
    if (!types.has(2))
        return chooseTarget('type', 2);
    else if (!types.has(1))
        return chooseTarget('type', 1);
    else if (!types.has(0))
        return chooseTarget('type', 0);
}
function shouldTargetColors() {}
function targetColors() {}

/**
 * Select the array of fish to target according to 'param' (type|color)
 * Compute the distance to each fish and return the closest one
 */
function chooseTarget(param, value)
{
    const creatureArray = param === 'type' ? creaturesByType[value] : creaturesByColor[value];
    let closestFish;
    let minDistance = Infinity;
    for (const fish of creatureArray)
    {
        const id = fish.id;
        const f = nearbyCreatures[id];
        for (const drone of myDrones)
        {
            const dist = Math.sqrt((drone.x - f.x) ** 2 + (drone.y - f.y) ** 2);
            if (dist < minDistance)
            {
                closestFish = f;
                minDistance = dist;
            }
        }
    }
    return closestFish;
}
