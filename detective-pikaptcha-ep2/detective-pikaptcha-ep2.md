# detective-pikaptcha-ep2

## Cahier des charges

Il faut sortir du labyrinthe [case départ]  
Pour ce faire, on longe le mur indiqué (L ou R) jusqu'à la sortie.
A chaque passage sur une case, on incrémente le nombre de passage sur la case.
On renvoie le labyrinthe modifié ou chaque case comporte le nombre de passage.

Tant que l'on a pas atteint la sortie:

-   vérifier que la case sur laquelle on se trouve n'est pas la case départ
-   générer les 4 cases voisines de la case sur laquelle on se trouve [N, E, S, W]
-   Parmi ces 4 cases, sélectionner la case sur laquelle on se rend
    -   il faut tenir compte de la direction actuelle: elle nous donne la première case à envisager
        > direction N => case ouest ==> checker direction -1.
        > A chaque check, on change de direction avec direction + 1\*side
    -   en fonction du mur [L ou R], tourner dans le sens horloger ou anti-horloger.
-   recommencer

> Pour L,

    >000# direction1 : check 0, check1, check2, check3
    #0#00
    00#0#

> Pour R,

    ###0# direction0 : check 1, check 0, check 3, check 4
    #000#
    #^###

>       R avec dir = 1 [0, 1, 2, 3] [0, 1, 2, 3] [0, 1, 2, 3] [0, 1, 2, 3]

                              ^         ^         ^                     ^

>       L avec dir = 0 [0, 1, 2, 3] [0, 1, 2, 3] [0, 1, 2, 3] [0, 1, 2, 3]

                                 ^   ^               ^               ^

> J'arrive sur une case avec ma direction.

-   je change ma direction
-   je check arr[direction + (i\*rotate)]
    > pour dir 1 avec L
-   je passe à 0
-   je check de 0, 1, 2, 3 => dir + i

=> side === 'R' : -1 : 1

## Spécifications

const WALL = '#'  
int way = -1|+1  
array arrowToDir = ['^','>', 'v', '<']  
array grid[row = y][column = x]  
array DIR [[deltaX, deltaY]]  
int currentDirection

    function getNextCoords(array coord[x,y])
        array coords [4]
        direction = direction + 1*side
        for i=0 to i < cells.length
            nextCoords = cells[(i+(dir*way))%4]
            nextCell = grid[y][x]
            if (nextCell !== WALL)
        return array nextCoords[x,y]

## Structure

    let coords = [initCoords]
    while (coords)
        value = grid[coords][]
        if (value in arrowToDir)
            break
        grid[][]++
        cell = nextCell()

    for row of grid
    ...print row.join('')

## Watch out

-   types : parseInt quand il faut

## Conclusion

-   beaucoup de temps perdu autour de ceci

    const dirToCheck = (4 + direction + i \* rotate) % 4;
    => modulo
