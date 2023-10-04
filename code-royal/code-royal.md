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
-   class Leader extends Unit {}
-   class Knight extends Unit {}
-   class Archer extends Unit {}
-   mesurer la vitesse des archers
-   mesurer la vitesse des knights

### 1. Lire les inputs et créer les { Site } + queen globally + king globally

Pour chaque site, créer un object {Site} et l'inclure dans l'object sites { siteId: { Site } }
Créer la reine dans le scope global.

    const queen = new Leader(true)

Créer le roi dans le scope global.

    const king = new Leader(false)

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
        {
            const leader = OWNER_TYPES[ownerType] === OWNER_TYPES.ALLY ? queen : king
                leader.x
                leader.y
                leader.health
                if (leader.isAlly)
                    {
                        leader.gold
                        leader.touchedSite
                    }
        }
    else
        new UNIT_TYPE[unitType](x,y, unitType, owner, health)

    [unit.isAlly ? allies : enemies].push(unit)

A ce stade, nous avons les deux armées et les 2 leaders

### 4. Analyser la situation et choisir la meilleure action pour la reine

Si l'ennemi n'existe pas:

-   trouver un site lointain de ma base et la prendre en target

Sinon

-   trouver le site libre le plus proche de ma base et la prendre en target

### 5. Print les actions

-   move to target
-   train

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
        isAlly
        type
        health
        constructor(x, y, unitType, owner, health)
        {
            x
            y
            isAlly
            health
        }
    }

    class Leader extends Unit
    {
        constructor(isAlly)
        {
            this.isAlly = isAlly
        }

        baseX // x, y starting point of the leader
        baseY // x, y starting point of the leader
        money
        site () {return touchedSite or undefined}
        wait()
        move(target)
        get target()
        {
            const distances = sites.map(site => getDistanceBetweenObjects(this, site))
            return distances.sort()[0]
        }
        set target()
        get nearestSite()
        build(siteId, type)
        train(siteId)
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

    function getDistanceBetweenObjects(a,b)
    {
        return (a.y - b.y)² + (a.x - b.x)²
    }

## STRATEGIE V2

Inclure des tours et pas de géant !!!

Les géants sont trop chers. Je n'en construit pas. Trop cher = coute 8 cavaliers => 50 tours de dégat potentiel à l'ennemi
2 points stratégiques:

-   a: le plus proche du centre que je suis sûr d'obtenir
-   b: le plus proche du centre en rentrant dans ma base

a. j'y construis une tour de défense
b. j'y construis des cavaliers

L'idée est de se replier rapidement
