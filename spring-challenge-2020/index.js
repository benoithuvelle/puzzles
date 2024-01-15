import { game } from './game.js';

const { maze, army, enemies } = game.init();
// game loop
let round = 0;
// eslint-disable-next-line no-constant-condition
while (true)
{
    round++;
    maze.reset();
    game.update(round, maze, army, enemies);

    for (const superPellet of maze.superPellets)
    {
        const bestPacId = superPellet.nearest(Object.values(army)).id;
        army[bestPacId].targetList.push(superPellet);
    }
    for (const id in army)
    {
        const pacman = army[id];
        if (!pacman.targetList.length)
            pacman.getToClosestUnseenCell();
        if (!pacman.abilityCoolDown)
        {
            pacman.speedUp();
            continue;
        }
        // const nearestEnemy = pacman.position.nearest(
        //     enemies.filter((e) => e.updatedAt === round).map((e) => e.position)
        // );
        // if (nearestEnemy)
        // {
        //     const enemy = enemies[nearestEnemy.id];
        //     if (pacman.position.distance(enemy.position) < 4)
        //     {
        //         printErr('should switch');
        //         pacman.switch(enemy);
        //     }
        //     continue;
        // }
        if (pacman.history.length && pacman.position.equal(pacman.history.at(-1)))
            pacman.randomMove();
        pacman.save();
        pacman.talk(pacman.target);
    }

    game.play(army);
    //maze.show();
}
