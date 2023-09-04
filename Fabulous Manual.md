# Puzzle Fabulous Manual

1. ne pas oublier de return dans un reduce
2. .sort() compare simplement 2 éléments selon en ensemble de critères donnés dans la fonction de callback.
   => il est possible de trier en une fois sur plusieurs critères. ==> Si la taille est la même, alors check le poid, ...
3. Ne pas oublier de parseInt les readline() si nécessaire
4. Ne pas for (let i = 0; i < readline();) ==> readline() sera executé à chaque tour
5. Modulo se fait sur la longueur du tableau ==> [a,b,c,d,e] %5. + Eviter d'être dans les négatifs.
6. Quand tu t'embourbes, arrête de t'embourber
7. ne pas utiliser des valeurs d'un tableau que je suis entrain de modifier.
   ==> Créer un nouvel object, lui assigner des valeurs en fonction du tableau originel, et finalement merge les deux objects.
