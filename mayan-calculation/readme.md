## Mayan Calculation

07.09.2023
https://www.codingame.com/ide/puzzle/mayan-calculation

# Cahier des charges

-   Comprendre l'encodage [base20, ascii]
-   enregistrer les representations des chiffres sous forme de string dans un tableau
-   lire les deux nombres et trouver leur valeur en base 10
-   réaliser l'opération et trouver la base 10
-   faire la représentation
    initialiser un tableau
    exp l'exposant
    n le reste
    -   tant que ma valeur est supérieur à 19, diviser par 20 => enregistrer le nombre de division. Ca me donne un n\*20^exp
    -   soustraire cette valeur à la valeur globale
    -   réitérer le processus
    -   Une fois le tableau complété, de la plus grande puissance à la plus petite, print le caractère ascii

# Spécifications

cyphers = [cypher]
power = [[power, base]]

## conclusion

Difficulté sur les bases arythmétiques. Est-ce vraiment the way to go ?
