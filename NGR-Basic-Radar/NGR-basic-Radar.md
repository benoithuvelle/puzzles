# NGR-basic-Radar

06.09.2023
https://www.codingame.com/ide/puzzle/1--ngr---basic-radar

## Cahier des charges

Trouver les voitures qui roulent à plus de 130km et les printer dans l'ordre alphabétique de leur plaque
Enregistrer les plaques et leur passages
Faire la différence de timestamp en millisecondes
Si la durée est inférieure à 6min (6*60*1000 => 360000ms) alors elle est trop rapide et donc l'enregistrer dans un nouveau set
sort le set
et print

## Spécifications

carSet = { id: [timestamp, timestamp]}
fastCar = [[id, time], [id, time], [id, time]].sort()

## Conclusion

easy-peasy but ...
sort alphabetical ==> utiliser localeCompare ==> Why ???
durée en ms to vitesse ... mmmh, ok
