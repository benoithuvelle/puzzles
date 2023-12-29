# Brackets extreme edition

11 décembre 2023
https://www.codingame.com/ide/puzzle/brackets-extreme-edition

# stratégie

utils: créer une string contenant les 3 caractères ouvrant '({[', utilisée à la lecture de la string
pour déterminer si le caractère doit être considéré ou pas.

utils: maper les caractères fermants à leurs caractères ouvrants respectifs

déclarer un tableau vide (pour enregistrer les caractères ouvrant)
Parcourir tous les caractères de la string les uns après les autres
Ignorer tous les caractères qui ne sont ni des ouvertures, ni des fermetures.
Si caractère ouvrant (si la string des caractères ouvrant le contient) , ajouter le caractère à la fin du tableau
Si caractère fermant (si oject qui map contient cette valeur) , retirer le dernier caractère du tableau
si ce caractère extrait du tableau n'est pas l'équivalent ouvrant de ce caractère fermant, alors print false et return

A la fin de la string, si le tableau est vide, alors on est bon ==> print true
Sinon, il s'agit d'une erreur. ==> print false
