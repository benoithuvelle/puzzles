grid = 10.000 x 10.000

le poisson est automatiquement scan dans le rayon de lumière
possible d'upgrade ce rayon
alors la batterie diminue

Impératif de remonter à la surface pour valider le scan et gagner les points

## drone

distance max par tour : 600
sans moteur : coule de 300
rayon scanneur : 800
rayon upgraded : 2000
si rayon upgraded : batterie perd 5 par tour
si pas activé, batterie++

## mer

surface = y <= 500

## Radar

TL TR BR BL
Si même x, alors L
si même y, alors T

## Fish

speed: 200
rebondit sur les parois
Si deux poissons à moins de 600, alors ils changent de direction

## Fish type 0

2500 <= y <= 5000

## Fish type 1

5000 <= y <= 7500

## Fish type 2

7500 <= y <= 10000

## Score

Scan / Points / Points si premier à sauvegarder
Type 0 1 2
Type 1 2 4
Type 2 3 6
Tous les poissons d'une couleur 3 6
Tous les poissons d'un type 4 8

## QUESTIONS

-   radarBlipCount : uniquement nos drones ?

# Stratégie

-   Racler le fond type 2 en partant de mon coté jusqu'à l'autre coté en m'assurant de ne rien laisser me dépasser. Sinon, je le chope.
-   Remonter ensuite
-   Réitérer le process pour le niveau 1 et 0 sans remonter entre les 2 cette fois-ci.
-   Pour s'orienter, repérer des points stratégiques par niveau de fond marin. 4 points, à 1 rayon de distance des 4 vrais angles.
