import Vec2 from 'vec2';
import Pacman from './Pacman.js';
import Maze from './Maze.js';
import { CONSTRUCTION_TYPES, hash } from './utils.js';

export const game = {
    init: function ()
    {
        const army = [];
        const enemies = [];
        const [width, height] = readline()
            .split(' ')
            .map((x) => +x);
        const grid = new Array(height).fill(0).map((_, i) =>
            readline()
                .split('')
                .map((symbol, j) => ({
                    id: hash(j, i),
                    symbol,
                    type: CONSTRUCTION_TYPES[symbol],
                    position: new Vec2(j, i),
                }))
        );
        const maze = new Maze(width, height, grid);
        return { maze, army, enemies };
    },
    update: function (round, maze, army, enemies)
    {
        const [myScore, opponentScore] = readline()
            .split(' ')
            .map((x) => +x);

        const visiblePacCount = parseInt(readline()); // all your pacs and enemy pacs in sight
        for (let i = 0; i < visiblePacCount; i++)
        {
            const props = readline().split(' ');
            const id = +props[0];
            const mine = +props[1];
            const group = mine ? army : enemies;
            if (group[id] === undefined)
                group[id] = new Pacman(...props, maze, army);
            else
                group[id].update(round, ...props);
        }

        const visiblePelletCount = parseInt(readline()); // all pellets in sight
        for (let i = 0; i < visiblePelletCount; i++)
            maze.set(
                ...readline()
                    .split(' ')
                    .map((x) => +x)
            ); // x, y, value
        return this;
    },
    play: function (army)
    {
        let str = '';
        for (const id in army)
        {
            const pacman = army[id];
            str += pacman.play() + ' ' + pacman.message + '|';
        }
        print(str);
    },
};
