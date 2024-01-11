import Vec2 from 'vec2';
import { DRONE_SPEED, STATE, targetPoints, home } from './utils.js';

export default class Drone
{
	#state;
	#target;

	constructor(id, x, y, emergency, battery)
	{
		this.id = id;
		this.position = new Vec2(x, y);
		this.emergency = emergency;
		this.battery = battery;
		this.speed = DRONE_SPEED;
		this.scan = new Set();
		this.radar = new Map();
		this.light = 0;
		this.state = STATE.DRAWN;
	}

	update(x, y, emergency, battery, collection)
	{
		this.position.set(x, y);
		this.emergency = emergency;
		this.battery = battery;
		this.collection = collection;
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

	seek(creatures, type)
	{
		const order = [];
		for (const [creatureId, radar] of this.radar)
		{
			if (creatures[creatureId].type != type || this.scan.has(creatureId) || this.collection.has(creatureId))
			{
				continue;
			}
			if (radar.includes('L'))
			    order.unshift(radar);
			else
			    order.push(radar);
		}
		printErr(order);
		if (this.isLefty)
		{
			this.target = targetPoints[type][order[0]];
			return;
		}
		else
		    this.target = targetPoints[type][order.at(-1)];
		return;
	}
}
