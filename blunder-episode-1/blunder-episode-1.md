# Blunder - episode 1

05/09/2023
https://www.codingame.com/ide/puzzle/blunder-episode-1

## Cahier des charges

B va parcourir les cases d'une grille de @ à $
Chaque case comporte un symbole. Il faut réagir de la bonne façon pour chaque symbole.

-   lui permettre d'avancer ==> en fonction de la direction actuelle, déterminer la case suivante
-   s'il rencontre un obstacle, alors il change de direction selon l'ordre établi
-   Réagir aux modifications de trajectoires
-   Réagir aux inverseurs de priorités (toggle)
-   Réagir aux bières (toggle)
-   Réagir aux T

-   il faut enregistrer son passage afin de s'assurer d'éviter de tourner en boucle. => Quand on arrive sur une case connue depuis le même parent, alors on tourne en boucle.

## Spécifications

    let steps be an array of the move B is gonna take. init to []
    let direction be a single char string representing B's current direction
    DIRECTIONS = ['SUD', 'EST', 'NORD', 'OUEST']
    dirToCoords = (direction, coords) => coords
    charToAction = {
        ''
    }

## Conclusion

Masse d'erreur dans tous les sens
Mais surout:

-   row était resté volontairement une string plutôt qu'un array en pensant ne pas devoir le modifier. ==> FAUX
