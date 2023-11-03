# Insert-to-string

https://www.codingame.com/ide/puzzle/insert-to-string
16.10.2023

## Cahier des charges

Insert the changes to the string so they won't interfere with each other.

## Stratégie

1.  Parse la string de départ afin de créer un tableau à 2 dimensions
    <!--  -->

        text [line][column]

    ==> split par \n
    et ensuite split chaque ligne par '' afin de créer la deuxième dimension du tableau

2.  Trier les commandes par ligne en ordre décroissant. Trier les commandes sur une même ligne par ordre décroissant de colonne afin d'éviter les interférences.~~

3.  Pour chaque commande
    <!--  -->
        text[line].splice(column, 0, ...command)
4.  Join chaque line par '' + split('\n') + join par ''
