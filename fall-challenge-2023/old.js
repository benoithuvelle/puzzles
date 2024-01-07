const DRONE_HIT_RANGE = 200;
const MONSTER_EAT_RANGE = 300;

const sea = { left: 0, right: 10000, top: 0, bottom: 10000 };
const targetPoints = {
    0: {
        TL: { x: sea.left, y: 2500 },
        TR: { x: sea.right, y: 2500 },
        BL: { x: sea.left, y: 5000 },
        BR: { x: sea.right, y: 5000 },
    },
    1: {
        TL: { x: sea.left, y: 5000 },
        TR: { x: sea.right, y: 5000 },
        BL: { x: sea.left, y: 7500 },
        BR: { x: sea.right, y: 7500 },
    },
    2: {
        TL: { x: sea.left, y: 7500 },
        TR: { x: sea.right, y: 7500 },
        BL: { x: sea.left, y: sea.bottom },
        BR: { x: sea.right, y: sea.bottom },
    },
};

const missions = ['TYPES_2', 'TYPES_1', 'TYPES_0'];

const creatures = new Array(+readline()).fill(0).map(() => {
    const [id, color, type] = readline()
        .split(' ')
        .map((x) => +x);
    return { id, color, type };
});

// To be updated every turn
let myDrones = {};

const creaturesById = {};
const creaturesByType = {};
const creaturesByColor = {};
for (const c of creatures)
{
    creaturesById[c.id] = c;
    if (!creaturesByType[c.type])
        creaturesByType[c.type] = {};
    creaturesByType[c.type][c.id] = c;
    if (!creaturesByColor[c.color])
        creaturesByColor[c.color] = [];
    creaturesByColor[c.color].push(c);
}

// game loop
// eslint-disable-next-line no-constant-condition
let isOnLeftSide;
let count = 0;
while (true)
{
    count++;
    +readline(); // myScore
    +readline(); // opponentScore

    const myCreaturesId = new Array(+readline()).fill(0).map(() => +readline());
    new Array(+readline()).fill(0).map(readline); // opponentCreaturesId

    // reset myDrones
    myDrones = {};
    new Array(+readline()).fill(0).map(() => {
        const [id, x, y, emergency, battery] = readline().split(' ');
        myDrones[id] = { id, x, y, emergency, battery };
        isOnLeftSide = x < 5000;
    });

    // opponentDrones
    new Array(+readline()).fill(0).map(() => {
        const [id, x, y, emergency, battery] = readline().split(' ');
        return { id, x, y, emergency, battery };
    });

    // Unsaved fish scan
    const scannedId = [];
    const scanByDroneId = {};
    const droneScanCount = +readline();
    for (let i = 0; i < droneScanCount; i++)
    {
        const [droneId, creatureId] = readline()
            .split(' ')
            .map((x) => +x);
        if (myDrones[droneId] === undefined)
            continue;
        scannedId.push(creatureId);
        if (!scanByDroneId[droneId])
            scanByDroneId[droneId] = [];
        scanByDroneId[droneId].push(creatureId);
    }

    const monsters = [];
    const nbOfCreatures = +readline();
    for (let i = 0; i < nbOfCreatures; i++)
    {
        const [id, x, y, vx, vy] = readline()
            .split(' ')
            .map((x) => +x);
        const creature = creaturesById[id];
        if (creature.type < 0)
            monsters.push({ id, x, y, vx, vy });
    }

    const radarBlipCount = +readline();

    // RADAR AREA
    const radars = {};
    for (let i = 0; i < radarBlipCount; i++)
    {
        const inputs = readline().split(' ');
        const droneId = +inputs[0];
        const creatureId = +inputs[1];
        const radar = inputs[2];
        radars[creatureId] = { droneId, creatureId, radar };
    }

    // eslint-disable-next-line no-inner-declarations
    function getTypeToFocus()
    {
        let index = 2;
        let numberOfType2 = 0;
        let numberOfType1 = 0;
        let numberOfType0 = 0;
        for (const id of myCreaturesId)
        {
            const type = creaturesById[id].type;
            if (type == 2)
                numberOfType2++;
            else if (type == 1)
                numberOfType1++;
            else if (type == 0)
                numberOfType0++;
        }
        if (numberOfType2 >= 4)
        {
            index--;
            if (numberOfType1 >= 4)
            {
                index--;
                if (numberOfType0 >= 4)
                {
                    index--;
                }
            }
        }

        return index;
    }

    // eslint-disable-next-line no-inner-declarations
    function focusType(typeIndex)
    {
        const creaturesIds = Object.keys(creaturesByType[typeIndex])
            .map((x) => +x)
            .filter((id) => !myCreaturesId.includes(id) && !scannedId.includes(id));
        const missionRadars = creaturesIds
            .map((id) => {
                return radars[id];
            })
            .filter((r) => r !== undefined)
            .sort((a, b) => {
                if (a.radar === b.radar)
                    return 0;
                else if (a.radar.includes(isOnLeftSide ? 'L' : 'R'))
                    return -1;
                else
                    return 1;
            });

        if (!missionRadars.length)
            return [{ y: 0 }];
        else
        {
            const missions = [];
            for (const mission of missionRadars)
                missions.push(targetPoints[typeIndex][mission.radar]);
            return missions;
        }
    }

    const targets = [...focusType(getTypeToFocus()), ...focusType(1)];

    let lightState = count % 6 ? 0 : 1;

    for (const id in myDrones)
    {
        const nbOfScan = scanByDroneId[id] ? scanByDroneId[id].length : 0;
        const drone = myDrones[id];
        const target = targets.shift();
        const threshold = myCreaturesId.length < 7 ? 2 : 1;

        let vx = 0;
        let vy = target.y > drone.y ? 600 : -600;
        let vector = { vx, vy };

        let canGo = false;

        // check collision with monsters
        let angle = -1;
        while (!canGo)
        {
            angle += 1;
            vector = { vx: 0, vy: -600 };
            // vector = rotate({ vx, vy }, angle);
            let nbOfCollisions = 0;
            printErr('Monsters:', monsters.length);
            for (const monster of monsters)
            {
                const collision = +getCollision(drone, monster, vector);
                nbOfCollisions += collision;
            }

            canGo = !nbOfCollisions;
        }

        printErr(vector);
        if (vx || vy)
            console.log(`MOVE ${parseInt(+drone.x + +vector.vx)} ${parseInt(+drone.y + +vector.vy)} 1`);
        else if (nbOfScan >= threshold || nbOfScan + myCreaturesId.length >= 12)
            console.log(`MOVE ${drone.x} ${sea.top} 1 Go back home`);
        else if (!target || (!target.x === undefined && target.y === undefined))
            console.log('WAIT 0');
        else
            console.log(`MOVE ${target.x ?? drone.x} ${target.y} ${lightState} ${nbOfScan}`);
    }
}

function getCollision(drone, monster, vector)
{
    // Check instant collision
    if (isInRange(drone, monster, DRONE_HIT_RANGE + MONSTER_EAT_RANGE))
        return true;

    // Change referencial
    const x = monster.x;
    const y = monster.y;
    const ux = drone.x;
    const uy = drone.y;

    const x2 = x - ux;
    const y2 = y - uy;
    const r2 = MONSTER_EAT_RANGE + DRONE_HIT_RANGE;
    const vx2 = monster.vx - vector.vx;
    const vy2 = monster.vy - vector.vy;
    const a = vx2 * vx2 + vy2 * vy2;

    if (a <= 0.0)
        return false;

    const b = 2.0 * (x2 * vx2 + y2 * vy2);
    const c = x2 * x2 + y2 * y2 - r2 * r2;
    const delta = b * b - 4.0 * a * c;
    if (delta < 0.0)
        return false;

    const t = (-b - Math.sqrt(delta)) / (2.0 * a);
    if (t <= 0.0)
        return false;

    if (t > 1.0)
        return false;

    return true;
}

function isInRange(v1, v2, range)
{
    const result = (v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y) <= range * range;
    return result;
}

// Radian
function rotate(vector, angle)
{
    const nx = vector.vx * Math.cos(angle) - vector.vy * Math.sin(angle);
    const ny = vector.vx * Math.sin(angle) + vector.vy * Math.cos(angle);

    return { vx: nx, vy: ny };
}
