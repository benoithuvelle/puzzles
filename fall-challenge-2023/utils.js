// Seeds
// only 2 monsters : seed=236029399147544860

export function getCollision(drone, monster)
{
    printErr(drone.vector);
    const DRONE_HIT_RANGE = 200;
    const MONSTER_EAT_RANGE = 300;

    // Check instant collision
    if (isInRange(drone, monster, DRONE_HIT_RANGE + MONSTER_EAT_RANGE))
        return true;

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
