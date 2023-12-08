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

-   base = { x: convertDegreeStringToMeter(120°37'34.8"W), y: convertDegreeStringToMeter(34°45'21.8"N), elevation: 46 }

pour chaque mission

-   récupérer les 3 variables hors de la string
