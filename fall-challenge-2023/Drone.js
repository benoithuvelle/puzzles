import Vec2 from 'vec2';
import { DRONE_SPEED, STATE, home, getCollision, depths } from './utils.js';

export default class Drone
{
    #state;
    #target;
    #seekType;

    constructor(id, x, y, emergency, battery, globalScan, creatures)
    {
        this.id = id;
        this.position = new Vec2(x, y);
        this.emergency = emergency;
        this.battery = battery;
        this.globalScan = globalScan;
        this.speed = DRONE_SPEED;
        this.#seekType = 2;
        this.scan = new Set();
        this.radar = new Map();
        this.light = new Light();
        this.state = STATE.SINK;
        this.message = '';
        this.creatures = creatures;
    }

    update(x, y, emergency, battery, collection)
    {
        this.position.set(x, y);
        this.emergency = emergency;
        this.battery = battery;
        this.collection = collection;
        if (this.emergency)
            this.state = STATE.EMERGENCY;
    }

    get x()
    {
        return this.position.x;
    }

    get y()
    {
        return this.position.y;
    }

    get state()
    {
        return this.#state;
    }

    set state(state)
    {
        this.#state = state;
    }

    get target()
    {
        return this.#target ?? home(this.x);
    }

    set target(target)
    {
        this.#target = target;
    }

    get seekType()
    {
        return Math.max(0, this.#seekType);
    }
    set seekType(seekType)
    {
        this.#seekType = seekType;
    }

    seek(creatures)
    {
        const creaturesByTypes = { 0: [], 1: [], 2: [], '-1': [] };
        for (const id in creatures)
        {
            const creature = creatures[id];
            creaturesByTypes[creature.type].push(creature);
        }

        let newTarget;
        for (const type of [2, 1, 0])
        {
            if (!newTarget)
            {
                for (const creature of creaturesByTypes[type].sort((a, b) => {
                    if (this.isLefty)
                        return a.position.x - b.position.x;
                    else
                        return b.position.x - a.position.x;
                }))
                {
                    if (
                        this.globalScan.has(creature.id) ||
                        this.collection?.has(creature.id) ||
                        creature.isOut ||
                        this.friend.targetId == creature.id
                    )
                        continue;
                    newTarget = creature.position;
                    this.targetId = creature.id;
                    break;
                }
            }
            this.target = newTarget ?? home(this.x);
            this.message = this.targetId + ': ' + this.target.x + ' ' + this.target.y;
        }
        return this;
    }

    reset()
    {
        this.scan.clear();
        this.globalScan.clear();
        this.light.off();
        return this;
    }

    talk(message = this.message)
    {
        return message;
    }

    computeSmartTarget(monsters)
    {
        this.vector = new Vec2(this.target.x, this.target.y).subtract(this.position).normalize().multiply(this.speed);
        const fullCircle = 6.5;
        const radianStep = 0.1;
        for (let i = 0; i < fullCircle; i += radianStep)
        {
            let isCollide = false;
            for (const monster of monsters)
            {
                if (getCollision(this, monster))
                {
                    isCollide = true;
                    printErr(this.id, monster.id);
                }
            }
            if (isCollide)
                this.vector.rotate(i * (this.isLefty || this.isCloseTo('right')
                ? 1 : -1));
            else
                break;
        }

        return this.position.add(this.vector);
    }

    isCloseTo(side)
    {
        if (side === 'left')
            return this.x < this.speed;
        else
            return 10000 - this.x < this.speed;
    }

    isInTypeDepth()
    {
        const type = this.creatures[this.targetId]?.type ?? 2;
        if (this.y > depths[type] && this.y < (depths[type + 1] ?? 10000))
            return true;
    }

    handleLight()
    {
        const depthLevel = Math.ceil((this.y / 10000) * 4) - 2;
        if (depths[depthLevel] + 1500 - this.y < 100)
            return this.light.on();
        if (
            this.isInTypeDepth() &&
            ((this.target.x < 2000 && this.x < 2000) ||
                (this.target.x > 8000 && this.x > 8000) ||
                (this.target.y > 8000 && this.y > 8000))
        )
            this.light.on();
    }
}

class Light
{
    constructor()
    {
        this.state = 0;
    }

    on()
    {
        this.state = 1;
    }

    off()
    {
        this.state = 0;
    }
}
