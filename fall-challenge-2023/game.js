import Drone from './Drone.js';
import Vec2 from 'vec2';

export const game = {
    init: () => {
        const creatures = {};
        const myDrones = {};
        const globalScan = new Set();
        new Array(+readline()).fill(0).forEach(() => {
            const [id, color, type] = readline()
                .split(' ')
                .map((x) => +x);
            creatures[id] = { id, color, type, top: 0, bottom: 9999, left: 0, right: 9999 };
        });
        return { creatures, myDrones, globalScan };
    },

    update: (myDrones, creatures, globalScan) => {
        +readline(); // myScore
        +readline(); // opponentScore

        // reset creatures positions
        for (const id in creatures)
        {
            const creature = creatures[id];
            creature.top = 0;
            creature.bottom = 9999;
            creature.left = 0;
            creature.right = 9999;
        }

        const myCollection = new Set(new Array(+readline()).fill(0).map(() => +readline()));
        const opponentCollection = new Array(+readline()).fill(0).map(readline);

        const N = +readline();
        const myIds = [];
        for (let i = 0; i < N; i++)
        {
            const [id, x, y, emergency, battery] = readline()
                .split(' ')
                .map((x) => +x);
            myIds.push(id);
            if (!myDrones[id])
                myDrones[id] = new Drone(id, x, y, emergency, battery, globalScan, creatures);
            else
                myDrones[id].update(x, y, emergency, battery, myCollection);
        }

        myDrones[myIds[0]].friend = myDrones[myIds[1]];
        myDrones[myIds[1]].friend = myDrones[myIds[0]];

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
            const drone = myDrones[droneId];
            if (drone)
            {
                drone.scan.add(creatureId);
                drone.globalScan.add(creatureId);
            }
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
        const seenInRadar = new Set();
        for (let i = 0; i < radarBlipCount; i++)
        {
            var inputs = readline().split(' ');
            const droneId = +inputs[0];
            const drone = myDrones[droneId];
            const creatureId = +inputs[1];
            const radar = inputs[2];
            const creature = creatures[creatureId];
            if (radar.includes('T'))
                creature.bottom = Math.min(creature.bottom, drone.y);
            if (radar.includes('B'))
                creature.top = Math.max(creature.top, drone.y);
            if (radar.includes('L'))
                creature.right = Math.min(creature.right, drone.x);
            if (radar.includes('R'))
                creature.left = Math.max(creature.left, drone.x);
            creature.position = new Vec2(
                creature.left + (creature.right - creature.left) / 2,
                creature.top + (creature.bottom - creature.top) / 2
            );
            seenInRadar.add(creatureId);
            drone.radar.set(creatureId, radar);
        }
        for (const id in creatures)
            creatures[id].isOut = !seenInRadar.has(+id);
        const drones = Object.values(myDrones);
        const Joe = drones[0];
        const Jim = drones[1];
        if (Joe.position.x < Jim.position.x)
            Joe.isLefty = true;
        else
            Jim.isLefty = true;

        return { monsters };
    },
};
