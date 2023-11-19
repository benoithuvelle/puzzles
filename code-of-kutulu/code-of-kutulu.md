# Code of kutulu

25 octbore 2023
https://www.codingame.com/multiplayer/bot-programming/code-of-kutulu

# Stratégie 1

Rester le plus proche possible du pote qui a le plus de vie

## Specs / Code

bestLife = 0
friendId = undefined
for friend of friends
if friend.life > bestLife
bestLife = friend.life
friendId = friend.id

if (friend)
move friend.x friend.y
else
wait

# Stratégie 2 / Code

Evaluer l'interet de joindre un ami s'il est target par un fantome.
=> Si l'ami est target, j'évalue sa vie life \* 0.5

## Specs

...strat 1
...
for friend of friends
friendLife = friend.life \* friend.isTarget ? 0.5 : 1

Strat vue ensemble
Calculer le score de chaque case sur les voisines directe + 1
