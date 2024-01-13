import Vec2 from 'vec2';
import { game } from './game.js';
import { STATE, depths, home } from './utils.js';

/* eslint-disable no-unused-vars  */
const { myDrones, creatures, globalScan } = game.init();

// game loop
// eslint-disable-next-line no-constant-condition
while (true)
{
    for (const id in myDrones)
        myDrones[id].reset();

    const { monsters } = game.update(myDrones, creatures, globalScan);

    for (const id in myDrones)
    {
        const drone = myDrones[id];

        switch (drone.state)
        {
            case STATE.SINK:
                drone.target = new Vec2(drone.position.x, depths[Math.max(0, drone.seekType)]);
                break;
            case STATE.SEEK:
                drone.seek(creatures);
                break;
            case STATE.RETURN:
                drone.target = home(drone.x);
                break;
            default:
                drone.target = home(drone.x);
        }

        const smartTarget = drone.computeSmartTarget(monsters);
        drone.handleLight();
        console.log(
            `MOVE ${Math.round(smartTarget.x)} ${Math.round(smartTarget.y)} ${drone.light.state} ${drone.talk(
                drone.battery
            )}`
        );

        // switch (drone.state)
        // {
        //     case STATE.RETURN:
        //         if (drone.y < 500)
        //         {
        //             drone.seekType--;
        //             drone.state = STATE.SINK;
        //         }
        //         break;
        //     case STATE.SINK:
        //         if (drone.y > drone.target.y)
        //         {
        //             drone.target = undefined;
        //             drone.state = STATE.SEEK;
        //         }
        //         break;
        //     case STATE.SEEK: {
        //         let total = 0;
        //         const seekCreaturesIds = Object.values(creatures)
        //             .filter((c) => c.type === drone.seekType)
        //             .map((c) => c.id);

        //         let scanCount = 0;
        //         let globalCount = 0;
        //         for (const id of seekCreaturesIds)
        //         {
        //             if (creatures[id].isOut)
        //                 continue;
        //             scanCount += +drone.scan.has(+id);
        //             globalCount += +drone.globalScan.has(+id);
        //         }
        //         if (scanCount >= 2 || globalCount == 4)
        //             drone.state = STATE.RETURN;
        //     }
        // }
        if (drone.emergency)
            drone.state = STATE.SINK;
    }
}
