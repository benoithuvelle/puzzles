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
        > direction N => case nord
    -   en fonction du mur [L ou R], tourner dans le sens horloger ou anti-horloger.

## Spécifications
