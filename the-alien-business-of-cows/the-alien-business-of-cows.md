# The alien business of cows

https://www.codingame.com/training/easy/the-alien-business-of-cows
5th december 2023

## informations

earth launchs missile

    missile max speed : 6km/s
    missile max altitude : 160km
    base coordinates (y, x, elevation): 34°45'21.8"N, 120°37'34.8"W, elevation: 46 meters
    base latitude (y) : 34°45'21.8"N
    base longitude (x) : 120°37'34.8"W
    base elevation : 46 m

Jupiter (me) throws collectors

    collectors types :
    moon orbit : 385 000km
    collectors speed until moon orbit : [collectorSpeed]
    stop at 500m from the earth
    collectors have a [collector maximum capacity]
    callectors have a [collector levitation efficiency parameter]
    raw abduction speed : 9.81m/s
    abduction bandwidth : 1
    real abduction speed : raw abduction speed * collector levitation efficiency parameter

On abduction start:
missile is launch
from base to max altitude right above collectors target at fullSpeed then [fall vertical]
if collision
...

Mission
name of the destination
latitude always N ==> (y) ==> 0 < latitude <= 90
longitude (x) ==> 0 < 180
elevation

    mission succeeds if collector can abduct cows and leave

Collectors types

    VaCoWM Cleaner
        speed: 44.7 km/s
        capacity: 3 cows
        levitation parameter: 0.8
        minimum number of cow to succeed: 1

    L4nd MoWer
        speed: 22.38 km/s
        capacity: 10 cows
        levitation parameter: 1.2
        minimum number of cow to succeed: 6

    Cow Harvester
        speed: 11.19 km/s
        capacity: 20 cows
        levitation parameter: 1.5
        minimum number of cow to succeed: 14

## GOAL: Send the more profitable collector

## HELP

Decimal Degrees = degrees + (minutes/60) + (seconds/3600).

-   One degree in latitude is equal to 111.11 km.
-   One degree in longitude between two points is equal to 111.11\*cos( (latitude1+latitude2) /2).

gravity: 9.81 m/s^2

## utils:

ABDUCTION_SPEED_IN_KM_PER_SEC = 0.00981
MODIFIED_ABUDCTION_SPEED_IN_KM_PER_SEC = ABDUCTION_SPEED_IN_KM_PER_SEC \* LEVITATION_EFFICIENTY
DISTANCE_TO_EARTH_IN_KM = 0.5

computeAbductionTypeForASingleCow(modifiedSpeed)
{
return modifiedSpeed \* DISTANCE_TO_EARTH_IN_KM
}

creer une regex qui match les 3 variables hors de ma string ==> TODO: fabriquer la regex
convertDegreeStringToDecimal(degreeString) return float

        const [degree, minutes, second] = regex.test(degreeString) ==> TODO: fabriquer la regex
        const decimal = degree + minutes / 60 + seconds / 3600
        return decimal

getLatitudeInMeter(decimal)

        return decimal * 111110

getLongitudeInMeter(decimal)

        return decimal * 111110 * cos((latitude1 + latitude2) / 2)

## Code structure :

base = { x: convertDegreeStringToMeter(120°37'34.8"W), y: convertDegreeStringToMeter(34°45'21.8"N), elevation: 46 }
spaceships = { type : { speed, capacity, levitationRate } } ==> enregister les vaisseaux et leurs caractéristiques

pour chaque mission

simulations : [{ TYPE, NB_OF_COWS, PROFIT_IN_COW }] ==> enregistre les simulations de chaque vaisseau pour chaque mission

-   récupérer 'NAME_OF_THE_LOCATION', latitude, longitude
-   convertir les coordonnées de la mission en décimal
-   convertir les coordonées de la mission degrés en distance (km)
    !!! la fonction cos !!!! ==> units ? - latitude : 1 degré = 111,11km ==> - longitude : 1 degré between 2 points = 111,11km x cos((latitude1 + latitude2) / 2)
-   trouver la distance entre la base et l'aplomb de la mission, altitude 160 km
-   calculer MISSILE_TIME = le temps que le missile destructeur met pour parcourir cette distance

-   Pour chaque type de vaisseau spacial, évaluer le nombre de vache qu'il peut ramener en fonction de MISSILE_TIME

    -   TOTAL_MISSION_TIME = le temps total que dure la mission. Initialisé à 0. Unité : seconde
    -   NUMBER_OF_COW = le nombre de vache ramenée. Initialisé à 0. Unité : vache
    -   calculer TRAVELING_TIME = le trajet du vaisseau jusqu'à l'altitude maximale
    -   tant que TOTAL_MISSION_TIME - TRAVELING_TIME < MISSILE_TIME
        ( utiliser une boucle sur i avec incrémentation sur le computeAbductionTypeForASingleCow)
        -   ajouter une vache à NUMBER_OF_COW
    -   enregistrer la simulation

-   définir le meilleur vaisseau à envoyer

    -   BEST_SPACE_SHIP = undefined
    -   MAX_COW = 0
    -   BEST_PROFIT = 0

    -   Pour chaque simulation
        -   si le minimum de vache n'est pas atteint, alors on continue
        -   si le NB_OF_COWS est plus grand que MAX_COW
            -   assigner TYPE simulé à BEST_SPACE_SHIP
            -   assigner NB_OF_COWS à MAX_COW
        -   si NB_OF_COWS est égal à MAX_COW
            -   si PROFIT_IN_COW par la simulation est plus grand que BEST_PROFIT
                -   calculer SIMULATION_PROFIT et l'assigner à BEST_PROFIT

-   compute la string attendue
    -   if BEST_SPACE_SHIP
    -   `${name of the location}:possible. Send a ${collector type} to bring back ${number of abducted} cows {number of abducted cow > 1 ? cow: cows}`
