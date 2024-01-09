import Vec2 from 'vec2';
import { getCollision } from './utils.js';

const droneSpeed = 600;
const steps = [
    [new Vec2(3000, 8500), new Vec2(4000, 450)],
    [new Vec2(5000, 8500), new Vec2(6000, 450)],
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
// eslint-disable-next-line no-constant-condition
while (true)
{
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

        if (distanceToMainTarget <= (mainTarget.y < 500 ? 450 : 2000))
        {
            light = 1;
            idx[i]++;
        }

        const zones = [
            [3250, 3850],
            [6000, 6600],
            [8250, 8850],
        ];
        for (const zone of zones)
        {
            if (zone[0] < drone.position.y && drone.position.y < zone[1])
            {
                light = 1;
                break;
            }
        }

        drone.vector = vTarget.normalize().multiply(droneSpeed);
        const fullCircle = 6.5;
        const radianStep = 0.2;
        for (let i = 0; i < fullCircle; i += radianStep)
        {
            let isCollide = false;
            for (const monster of monsters)
            {
                if (getCollision(drone, monster))
                    isCollide = true;
            }
            if (isCollide)
                drone.vector.rotate(i);
            else
                break;
        }

        const target = drone.position.add(drone.vector);

        const message = `go to ${Math.round(target.x)} ${Math.round(target.y)}`;
        console.log(`MOVE ${Math.round(target.x)} ${Math.round(target.y)} ${light} ${message}`);
    }
}
