# dwarfs-standing-on-the-shoulders-of-giants

04.09.2023  
https://www.codingame.com/ide/puzzle/dwarfs-standing-on-the-shoulders-of-giants

## Cahier des charges

-   trouver la plus longue chaine d'influence

## Réflexion

-   enregistrer les influences
    ==> relation qui unie deux nodes
    ==> créer des objets nodes, enregistrés dans un map nodes

        nodes = { id : {id, children[] }}

## Conclusion

Facile, mais ... maitrise très vague des parcours de graph.
Ne pas oublier 2 étapes:

1. construction du graph ==> on enregistre les noeuds et on référencie les noeuds entre eux.
2. exploration du graph ==> on parcours les noeuds via leurs propres enfants, et on enregistre les valeurs éventuelles dont on aurait besoin. ==> ici, la profondeur.

==> Mais donc...
Quid de tourner sur chacun des noeuds ? Ne pourrait-on pas mémoizer des trucs ? Genre, savoir qu'un noeud a déjà été exploré ? ...
