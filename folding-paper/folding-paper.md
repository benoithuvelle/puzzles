# Folding-paper

## Objectif

A sheet of paper is folded several times. The goal is to determine how many layers of paper are visible from one side of the obtained folding.

Folding motions are:
R for Right: take the right side and fold it on the left side.
L for Left: take the left side and fold it on the right side.
U for Up: take the high side and fold it on the low side.
D for Down: take the low side and fold it on the high side.
Entrée
Line 1: a fold string order: several letters R, L, U and D with no space in-between
Line 2: side: a single character R, L, U or D
Sortie
n: the number of layers of paper visible from side
Contraintes
2 characters ≤ length of order ≤ 8 characters
(Try to fold a sheet more than 6 times!)
Exemple
Entrée
UL
D
Sortie
4

## Cahier des charges

### Simulations

| n         | motion |  U  |  R  |  D  |  L  |
| --------- | ------ | :-: | :-: | :-: | :-: |
| 0         | /      |  1  |  1  |  1  |  1  |
| 1         | U      |  1  |  2  |  2  |  2  |
| 2         | U      |  1  |  4  |  3  |  4  |
| 3         | U      |  1  |  8  |  4  |  8  |
| 4 (guess) | U      |  1  | 16  |  5  | 16  |
| formule   | U      |  1  | 2^n |  n  | 2^n |

| n         | motion |  U  |  R  |  D  |  L  |
| --------- | ------ | :-: | :-: | :-: | :-: |
| 0         | /      |  1  |  1  |  1  |  1  |
| 1         | U      |  1  |  2  |  2  |  2  |
| 2         | R      |  2  |  1  |  4  |  4  |
| 3         | L      |  4  |  5  |  8  |  1  |
| 4 (guess) | D      | 12  |  8  |  1  |  2  |
| formule   | U      |  1  |  4  | 13  | 16  |

| n         | motion |  U  |  R  |  D  |  L  |
| --------- | ------ | :-: | :-: | :-: | :-: |
| 0         | /      |  1  |  1  |  1  |  1  |
| 1         | U      |  1  |  2  |  2  |  2  |
| 2         | R      |  2  |  1  |  4  |  4  |
| 3         | U      |     |     |     |     |
| 4 (guess) | R      |     |     |     |     |
| formule   | U      |     |     |     |     |

> Celui qui est plié retourne à 2^0  
> l'opposé à la somme de lui-même + son opposé  
> les autres (adjacent) se voit incrémenter leur exposant => 2^n ==> n^n++

exemple:

    [2^0, 2^0, 2^0, 2^0] ([U,R,D,L])
    Je plie R (index: 1)
    [2^1, 2^0, 2^1, (2^0+2^0)^1]
    Je plie D (index: 2)
    [2^1+2^0, 2^1, 2^0, (2^0+2^0)^2]

### Réflexions

Pour chaque pli, je dois enregistrer le résultat. => combien de façe visible pour chaque coté.
Pour ce faire, il faut se baser sur la situation existante (avant le pli) et sur le coté plié.

### Stratégie

1. trouvé l'index du coté plié dans la suite U, R, D, L
2. faire la différence de l'index par rapport à l'index évalué
   Donc, je plie U (index 0), différence avec U => 0, différence avec R => 1, avec D => 2
   (S'arranger pour valeur absolue et modulo)
3. Modifier arr[i] en fonction de la différence.

    si diff == 2, alors sum
    else
    this^n++

exemple:

    const sides = [1,1,1,1]
        [U, R, D, L]
    for motion of motions
        const sideIndex = sides.indexOf(motion)
        for (let i = 0; i < 4; i++)
            const diff = Math.abs(sideIndex-i) // check le modulo
            sides[i] = diff === 2 ? sides[i] + sides[i+2] // check le modulo : sides[i]^diff // mas o menos

## Spécifications

    sides['U','R','D','L']
    const paper[1,1,1,1]
    fold [
        (x) => 1,
        (x) => x*2,
        (x, i) => x + paper[(4 + i+2)%4 ],
        (x) => x*2
    ]

## Code

    for (const input of inputs)
        const current = sides.indexOf(input)
        for (let i = 0; i < 4; i++)
            const value = paper[i]
            paper[(4 + current+i) % 4] = fold[i](value, i))

    console.log(paper[sides.indexOf(input)])

## Conclusion

1.  ne pas utiliser des valeurs d'un tableau que je suis entrain de modifier.
    ==> Créer un nouvel object, lui assigner des valeurs en fonction du tableau originel, et finalement merge les deux objects.
