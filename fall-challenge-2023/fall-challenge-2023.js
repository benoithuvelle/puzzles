import Vec2 from 'vec2';
import { getCollision } from './utils.js';

const droneSpeed = 600;
const steps = [
    [new Vec2(0, 10000), new Vec2(10000, 10000), new Vec2(5000, 0)],
    [new Vec2(5000, 10000), new Vec2(5000, 0)],
];
let idx = [0, 0];

/* eslint-disable no-unused-vars  */
const creatures = {};
new Array(+readline()).fill(0).forEach(() => {
    const [id, color, type] = readline()
        .split(' ')
        .map((x) => +x);
    creatures[id] = { id, color, type };
});

// game loop
let count = 0;
// eslint-disable-next-line no-constant-condition
while (true)
{
    count++;
    +readline(); // myScore
    +readline(); // opponentScore

    const myCollection = new Array(+readline()).fill(0).map(() => +readline());
    const opponentCollection = new Array(+readline()).fill(0).map(readline);

    const myDrones = new Array(+readline()).fill(0).map(() => {
        const [id, x, y, emergency, battery] = readline().split(' ');
        return { id, position: new Vec2(x, y), emergency, battery };
    });
    const myDronesIds = [...myDrones.map((x) => x.id)];

    // opponentDrones
    new Array(+readline()).fill(0).map(() => {
        const [id, x, y, emergency, battery] = readline().split(' ');
        return { id, x, y, emergency, battery };
    });

    const droneScanCount = +readline();
    for (let i = 0; i < droneScanCount; i++)
    {
        const [droneId, creatureId] = readline()
            .split(' ')
            .map((x) => +x);
    }

    const visibleCreatureCount = +readline();
    const monsters = [];
    for (let i = 0; i < visibleCreatureCount; i++)
    {
        const [id, x, y, vx, vy] = readline().split(' ');
        if (creatures[id].type > -1)
            continue;
        monsters.push({ id, position: new Vec2(x, y), vx, vy });
    }

    const radarBlipCount = +readline();
    for (let i = 0; i < radarBlipCount; i++)
    {
        var inputs = readline().split(' ');
        const droneId = +inputs[0];
        const creatureId = +inputs[1];
        const radar = inputs[2];
    }

    for (let i = 0; i < myDrones.length; i++)
    {
        const drone = myDrones[i];
        let light = 0;

        let mainTarget = steps[i][idx[i] % steps[i].length];

        // compute vector length to mainTarget
        const distanceToMainTarget = drone.position.distance(mainTarget);
        const vTarget = new Vec2(mainTarget.x, mainTarget.y).subtract(drone.position);
        // reduce to distance of a drone in a turn
        // verify its length with Vec2 length() method

        //Choose and test vectors
        drone.vector = vTarget.normalize().multiply(droneSpeed);
        const angle = drone.position.angleTo(drone.vector);
        printErr(angle);
        if (distanceToMainTarget < (mainTarget.y === 0 ? 450 : 2000))
        {
            light = 1;
            idx[i]++;
        }

        for (const monster of monsters)
        {
            let rad = 0;
            while (getCollision(drone, monster) && rad < 6.5)
            {
                drone.vector.rotate((rad += 0.2));
            }
        }

        const target = drone.position.add(drone.vector);

        const message = `go to ${Math.round(target.x)} ${Math.round(target.y)}`;
        console.log(`MOVE ${Math.round(target.x)} ${Math.round(target.y)} ${light || count % 6 ? 1 : 0} ${message}`);
    }
}
