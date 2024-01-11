import Vec2 from 'vec2';
import Drone from './Drone.js';
import { getCollision, STATE, home } from './utils.js';

/* eslint-disable no-unused-vars  */
const creatures = {};
new Array(+readline()).fill(0).forEach(() => {
    const [id, color, type] = readline()
        .split(' ')
        .map((x) => +x);
    creatures[id] = { id, color, type };
});

const myDrones = {};

// game loop
// eslint-disable-next-line no-constant-condition
let drawnCount = 2;
while (true)
{
    +readline(); // myScore
    +readline(); // opponentScore

    const myCollection = new Set(new Array(+readline()).fill(0).map(() => +readline()));
    const opponentCollection = new Array(+readline()).fill(0).map(readline);

    const N = +readline();
    for (let i = 0; i < N; i++)
    {
        const [id, x, y, emergency, battery] = readline()
            .split(' ')
            .map((x) => +x);
        if (!myDrones[id])
            myDrones[id] = new Drone(id, x, y, emergency, battery);
        else
            myDrones[id].update(x, y, emergency, battery, myCollection);
    }
    const opponentDrones = new Array(+readline())
        .fill(0)
        .map(() => new Drone(...readline().split(' ')))
        .reduce((obj, curr) => {
            obj[curr.id] = curr;
            return obj;
        }, {});

    const droneScanCount = +readline();
    for (let i = 0; i < droneScanCount; i++)
    {
        const [droneId, creatureId] = readline()
            .split(' ')
            .map((x) => +x);
        if (myDrones[droneId])
            myDrones[droneId].scan.add(creatureId);
        else
            opponentDrones[droneId].scan.add(creatureId);
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
        if (myDrones[droneId])
            myDrones[droneId].radar.set(creatureId, radar);
    }

    const drones = Object.values(myDrones);
    const Joe = drones[0];
    const Jim = drones[1];
    if (Joe.position.x < Jim.position.x)
        Joe.isLefty = true;
    else
        Jim.isLefty = true;

    const zones = [new Vec2(3250, 3850), new Vec2(6000, 6600), new Vec2(8250, 7850)];
    for (const id in myDrones)
    {
        const drone = myDrones[id];
        drone.light = 0;

        switch (drone.state)
        {
            case STATE.DRAWN:
                drone.target = new Vec2(drone.position.x, zones[Math.max(0, drawnCount)].y);
                break;
            case STATE.SEEK:
                drone.seek(creatures, Math.max(0, drawnCount));
                printErr(drone.target);
                break;
            case STATE.RETURN:
                drone.target = home(drone.x);
                break;
            default:
                drone.target = home(drone.x);
        }
        /**
         * Compute vector length to target
         * Reduce to distance of a drone in a turn
         * Verify its length with Vec2 length() method
         */
        const distanceToTarget = drone.position.distance(drone.target);
        const vTarget = new Vec2(drone.target.x, drone.target.y).subtract(drone.position);

        if (distanceToTarget <= (drone.target.y < 500 ? 450 : 2000))
        {
            drone.light = 1;
        }

        for (const zone of zones)
        {
            if (zone.x < drone.position.y && drone.position.y < zone.y)
            {
                drone.light = 1;
                break;
            }
        }

        drone.vector = vTarget.normalize().multiply(600);
        const fullCircle = 6.5;
        const radianStep = 0.1;
        for (let i = 0; i < fullCircle; i += radianStep)
        {
            let isCollide = false;
            for (const monster of monsters)
            {
                if (getCollision(drone, monster))
                    isCollide = true;
            }
            if (isCollide)
                drone.vector.rotate(i * (drone.isLefty ? 1 : -1));
            else
                break;
        }

        const smartTarget = drone.position.add(drone.vector);

        const message = drone.state;
        console.log(`MOVE ${Math.round(smartTarget.x)} ${Math.round(smartTarget.y)} ${drone.light} ${message}`);

        switch (drone.state)
        {
            case STATE.RETURN:
                if (drone.y < 500)
                {
                    drawnCount--;
                    drone.state = STATE.DRAWN;
                }
                break;
            case STATE.DRAWN:
                if (drone.y > drone.target.y)
                {
                    drone.target = undefined;
                    drone.state = STATE.SEEK;
                }
                break;
            case STATE.SEEK: {
                let total = 0;
                for (const creatureId of drone.scan.keys())
                {
                    if (creatures[creatureId].type == drawnCount)
                        total++;
                }
                if (total >= 2)
                    drone.state = STATE.RETURN;
                break;
            }
        }
        if (drone.emergency)
            drone.state = STATE.DRAWN;
    }
}
