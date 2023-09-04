# The fall - episode 1

## Cahier des charges

Indy tombe de pièce en pièce.
Pour chaque pièce, il faut déterminer la pièce suivante sur laquelle Indy se rendra.
Une fois la pièce déterminée, print les coordonnées de la pièce.

### réflexion

## Spécifications

    grid[h][w]
    types[
    	0: undefined,
    	1: '0 -1'
    	2: position => position === 'RIGHT' ? '-1 0' : '1 0',
    	3: '0 -1',
    	4: position => position === 'TOP' ? '-1 0' : '0 -1',
    	5: position => position === 'TOP' ? '1 0' : '0 -1',
    	6: position => position === 'RIGHT' ? '-1 0' : '1 0',
    	7: '0 -1',
    	8: '0 -1',
    	9: '0 -1',
    	10: '-1 0',
    	11: '1 0',
    	12: '0 -1'
    ]

## Code

    while(true)
    	x,y, position
    	const type = grid[y][x]
    	const [deltaX, deltaY] = types[type](position).split(' ').map(x => +x)
    	console.log(x+deltaX, y+deltaY)

## conclusion

Easy-peasy
