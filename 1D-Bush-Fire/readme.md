# 1D-Bush-Fire ==> One-shot === true

07.09.2023
https://www.codingame.com/ide/puzzle/1d-bush-fire

## Cahier des charges

Eteindre les foyers avec le moins de coups possible
1 coup éteint 3 cases (n-1 n n+1)
Pour chaque ligne, print le nombre de coups minimal

## Stratégie

Parcourir le champ de gauche à droite.
Dès qu'un foyer est détecté, envoyé à la case suivante ==> considérer que le foyer est à n-1 et donc couvrira n-1, n, n+1

ex:
....f....f.. => 5 10 => 2
.......fff => 8 => 1

## Code

let count
let i = 0
for let i = 0; i < field.length;
if (f) === 'f'
count++
i+=3
else
i++

## Conclusion

Easy-peasy
