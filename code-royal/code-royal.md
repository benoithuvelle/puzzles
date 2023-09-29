# Code Royal

https://www.codingame.com/ide/puzzle/code-royale
25 septembre 2023

## Contraintes

w = 1920
h = 1000
Les sites de construction sont des cercles
les KNIGHTS avancent plus vite que la reine

## Stratégie

Prendre comme cap un site de construction libre.
Si une unité ennemie est trop proche (les cavaliers me prennent 30pas par tour et on 25 tours de vie), alors, momentanément, je m'écarte de mon cap (je me tiens à distance) et ce, tant que l'ennemi est présent.

## Code Structure

0. Préparer les Classes et les fonctions utilitaires
1. Lire les inputs et créer les object
2. Pour chaque tour, actualiser les sites
3. Pour chaque tour, créer/actualiser les Units
4. Analyser la situation et choisir la meilleure action pour la reine
5. Print les actions

### 0. Préparer les classes et les fonctions utilitaires

-   class Site {}
-   class Unit {}
-   class Queen extends Unit {}
-   class Knight extends Unit {}
-   class Archer extends Unit {}
-   mesurer la vitesse des archers
-   mesurer la vitesse des knights

### 1. Lire les inputs et créer les { Site }

Pour chaque site, créer un object {Site} et l'inclure dans l'object sites { siteId: { Site } }
Créer la reine dans le scope global.
const queen = new Queen()

### 2. Pour chaque tour, actualiser les sites

Récuperer le `{ Site }` dans `sites` et créer un object de type `structureType`

    if (!STRUCTURE_TYPES[structureTypes])
        continue
    const updatedSite = new [STRUCTURE_TYPES[structureType]](site)
    site.owner = OWNER_TYPES[owner] // set owner
    site.waitingTime = +param1
    site.army = ARMY_TYPES[+param2]

    sites[siteId] // set new Site to {sites}

A ce stade, nous avons dans le scope globale tous les sites

### 3. Pour chaque tour, créer les Units

Par facilité, les recréer dans la boucle while à chaque tour. ==> Pas d'historique possible, ...
Collecter mon armée
Collecter l'armée ennemie
Créer un nouvel object de type unitType

    const allies = {}
    const enemies = {}

    let unit
    if (UNIT_TYPE < 0)
        new Queen(x,y, owner, health)
    else
        new UNIT_TYPE[unitType](x,y, unitType, owner, health)

    [OWNER_TYPES[ownerType] === OWNER_TYPES.ALLY ? allies : enemies].push(unit)

A ce stade, nous avons les deux armées

### 4. Analyser la situation et choisir la meilleure action pour la reine

Si l'ennemie n'existe pas:

-   trouver un site lointain de ma base et la prendre en target

Sinon

### 5. Print les actions

-   move to target
-   train

-   trouver le site libre le plus proche de ma base et la prendre en target

## Spécifications

    const sites = {Site}

    class Site
    {
        constructor({ Site })
        {
        }
    }

    class Barrack extends Site
    {
        string army [ARMY_TYPE]
        int waitingTime
    }

    class Unit
    {
        x
        y
        owner
        type
        health
    }


    class Queen extends Unit
    {
        base // x, y starting point of the queen
        money
        site () {return touchedSite or undefined}
        wait()
        move(target)
        get target()
        set target()
        get nearestSite()
        build(siteId, type)
        train(siteId)
        getDistancesToSites() // Return the manhattan distance from this to every sites
        getClosestFreeSiteFromBase()
    }

    class Knight extends Unit
    {
        speed
    }

    class Archer extends Unit
    {
        speed
    }

### utils

    const STRUCTURE_TYPES = [null, null, 'Barrack']
    const OWNER_TYPES = ['ALLY','ENEMY']
    const ARMY_TYPES = ['KNIGHT', 'ARCHER']
