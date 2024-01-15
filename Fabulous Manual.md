# Puzzle Fabulous Manual

1.  ne pas oublier de return dans un reduce
2.  .sort() compare simplement 2 éléments selon en ensemble de critères donnés dans la fonction de callback.
    => il est possible de trier en une fois sur plusieurs critères. ==> Si la taille est la même, alors check le poid, ...
3.  Ne pas oublier de parseInt les readline() si nécessaire
4.  Ne pas oublier de parseInt les méthodes qui travaillent sur des strings, genre String.match() !!!!!
5.  Ne pas for (let i = 0; i < readline();) ==> readline() sera executé à chaque tour
6.  Modulo se fait sur la longueur du tableau ==> [a,b,c,d,e] %5. + Eviter d'être dans les négatifs.
7.  Quand tu t'embourbes, arrête de t'embourber
8.  ne pas utiliser des valeurs d'un tableau que je suis entrain de modifier.
    ==> Créer un nouvel object, lui assigner des valeurs en fonction du tableau originel, et finalement merge les deux objects.
9.  Nice generateChildren

    const DIR = [
    [0, -1],
    [1, 0],
    [0, +1],
    [-1, 0],
    ]

        const [x, y] = coord;
        const nextCoords = DIR.map((c) => [c[0] + x, c[1] + y]);

10. Un reduce sans valeur initial assign arr[0] à l'accumulateur au tour 1. ==> Si on change de type (par exemple 'string' to charCode[int], ça foire un max)
11. Dormir dessus !!!!
