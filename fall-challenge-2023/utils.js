import Vec2 from 'vec2';

export const depths = [2500, 5000, 7500];
export const DRONE_SPEED = 600;
export const home = (x) => new Vec2(x, 0);
export const STATE = {
    SINK: 'SINK',
    SEEK: 'SEEK',
    RETURN: 'RETURN',
    EMERGENCY: 'EMERGENCY',
};

const sea = { left: 0, right: 10000, top: 0, bottom: 10000 };
export const targetPoints = {
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

export function getCollision(drone, monster)
{
    const DRONE_HIT_RANGE = 200;
    const MONSTER_EAT_RANGE = 300;

    // Check instant collision
    if (isInRange(drone, monster, DRONE_HIT_RANGE + MONSTER_EAT_RANGE))
    {
        printErr('can not avoid');
        return true;
    }

    // Change referencial
    const x = monster.position.x;
    const y = monster.position.y;
    const ux = drone.position.x;
    const uy = drone.position.y;

    const x2 = x - ux;
    const y2 = y - uy;
    const r2 = MONSTER_EAT_RANGE + DRONE_HIT_RANGE;
    const vx2 = monster.vx - drone.vector.x;
    const vy2 = monster.vy - drone.vector.y;
    const a = vx2 * vx2 + vy2 * vy2;

    if (a <= 0)
        return false;

    const b = 2.0 * (x2 * vx2 + y2 * vy2);
    const c = x2 * x2 + y2 * y2 - r2 * r2;
    const delta = b * b - 4.0 * a * c;
    if (delta < 0)
        return false;

    const t = (-b - Math.sqrt(delta)) / (2.0 * a);
    if (t <= 0)
        return false;

    if (t > 1)
        return false;

    return true;
}

export function isInRange(drone, monster, range)
{
    const result =
        (drone.position.x - monster.position.x) * (drone.position.x - monster.position.x) +
            (drone.position.y - monster.position.y) * (drone.position.y - monster.position.y) <=
        range * range;
    return result;
}
