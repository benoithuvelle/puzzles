import Vec2 from 'vec2';
import { PELLET_TYPES } from './utils.js';

class Maze
{
    #superPellets;

    constructor(width, height, grid)
    {
        this.width = width;
        this.height = height;
        this.grid = grid;
        this.#superPellets = [];
    }

    set(x, y, value)
    {
        this.grid[y][x].pellet = PELLET_TYPES[value];
        if (PELLET_TYPES[value] === '$')
            this.#superPellets.push(new Vec2(x, y));
    }

    reset()
    {
        this.#superPellets = [];
        for (const row of this.grid)
            for (const cell of row)
                cell.pellet = undefined;
    }

    show()
    {
        for (const row of this.grid)
        {
            let str = '';
            for (const cell of row)
                printErr((str += cell.pellet ?? cell.symbol));
        }
    }

    markAsExplored(position)
    {
        const { x, y } = position;
        this.grid[y][x].isExplored = true;
    }

    get superPellets()
    {
        return this.#superPellets;
    }
}

export default Maze;
