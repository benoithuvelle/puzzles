import Vec2 from 'vec2';
import { ACTION_TYPES, PAC_TYPES } from './utils.js';

class Pacman
{
    #targetList;
    #action;

    constructor(id, mine, x, y, type, speedTurnsLeft, abilityCoolDown, maze, friends)
    {
        this.id = +id;
        this.mine = +mine;
        this.position = new Vec2(+x, +y);
        this.position.id = this.id;
        this.type = type;
        this.speedTurnsLeft = +speedTurnsLeft;
        this.abilityCoolDown = +abilityCoolDown;
        this.#targetList = [];
        this.#action = ACTION_TYPES.MOVE;
        this.maze = maze;
        this.updatedAt = 0;
        this.friends = friends;
        this.history = [new Vec2(x, y)];
        this.message = '';
    }

    update(round, id, mine, x, y, type, speedTurnsLeft, abilityCoolDown)
    {
        this.updatedAt = round;
        this.#targetList = [];
        this.position.set(+x, +y);
        this.action = ACTION_TYPES.MOVE;
        this.type = type;
        this.speedTurnsLeft = +speedTurnsLeft;
        this.abilityCoolDown = +abilityCoolDown;
        this.maze.markAsExplored(this.position);
    }

    play()
    {
        switch (this.action)
        {
            case ACTION_TYPES.MOVE:
                return `MOVE ${this.id} ${this.target.x} ${this.target.y}`;
            case ACTION_TYPES.SPEED:
                return `SPEED ${this.id}`;
            case ACTION_TYPES.SWITCH:
                return `SWITCH ${this.id} ${this.type}`;
        }
    }

    talk(message)
    {
        this.message = message;
    }

    save()
    {
        this.history.push(this.position.clone());
    }

    get x()
    {
        return this.position.x;
    }

    get y()
    {
        return this.position.y;
    }

    // target has to be an array of Vec2 instances
    get targetList()
    {
        return this.#targetList;
    }
    set targetList(targetList)
    {
        this.#targetList = targetList;
    }

    get target()
    {
        return this.#targetList[0] ?? new Vec2().zero();
    }

    get action()
    {
        return this.#action;
    }
    set action(action)
    {
        this.#action = action;
    }

    speedUp()
    {
        printErr('Speed UP');
        this.#action = ACTION_TYPES.SPEED;
    }

    switch(enemy)
    {
        let newType;
        const enemyType = enemy.type;
        switch (enemyType)
        {
            case PAC_TYPES.ROCK:
                if (this.type !== PAC_TYPES.PAPER)
                    newType = PAC_TYPES.PAPER;
                break;
            case PAC_TYPES.SCISSORS:
                if (this.type !== PAC_TYPES.ROCK)
                    newType = PAC_TYPES.ROCK;
                break;
            case PAC_TYPES.PAPER:
                if (this.type !== PAC_TYPES.SCISSORS)
                    newType = PAC_TYPES.SCISSORS;
        }
        if (newType)
        {
            this.action = ACTION_TYPES.SWITCH;
            this.type = newType;
        }
        else
            this.speedUp();
    }

    getToClosestUnseenCell()
    {
        for (let i = 0; i < 2; i++)
        {
            const cells = this.maze.grid
                .flat()
                .filter(
                    (c) =>
                        !c.isExplored &&
                        c.type === 'FLOOR' &&
                        !c.position.equal(this.targetList[0] ?? new Vec2().zero())
                )
                .map((c) => c.position);
            const closest = this.position.nearest(cells);
            this.targetList.unshift(closest);
        }
        printErr(this.targetList);
    }

    randomMove()
    {
        const randomCell =
            this.maze.grid[Math.floor(Math.random() * this.maze.height)][Math.floor(Math.random() * this.maze.width)];
        this.targetList = [randomCell.position];
    }
}

export default Pacman;
