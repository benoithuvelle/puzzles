# The weight of words

09.09.2023
https://www.codingame.com/ide/puzzle/the-weight-of-words

## Cahier des charges

Il faut décrypter une grille de caractères et print une fois décoder.

Pour chaque colonne:

-   il faut trouver le poids (w) de cette colonne
    ==> additionner la valeur de chaque caractère
-   'Faire tourner' cette colonne w fois vers le bas
    Pour chaque ligne:
-   il faut trouver le poids (w) de cette ligne
-   'Faire tourner' cette ligne w fois vers la droite

Repeter le process 'steps' fois

## Spécifications

grid = array[h][w]
getWeight = array => int

## Code

    for steps time
    	for w time
    		const column = []
    		for h time
    			column.push(grid[hi][w])
    		w = getWeight(column)
    		for w%column.length
    			column.pop
    			column.unshift
    		for h time
    			grid[][] = column[hi]
    	for h time
    		const row = grid[hi]
    		w = getWeight(row)
    		for w%row.length
    			row.pop
    			row.unshift
    for row of grid
    console.log(row)

## Conclusion

Erreur : ommetre la value initiale pour le reduce assign à acc le premier élement du tableau. ==> Ne pas oublier que je travaille avec des string.

Warning: Créer un tableau annexe pour manipuler plus à l'aise. ==> ne pas oublier de le réassigner.

Easy-peasy !!! Kind of one-shot !
