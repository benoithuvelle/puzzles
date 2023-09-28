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
1. lire les inputs et créer les object
2. Pour chaque tour, actualiser les sites
3. Pour chaque tour, créer/actualiser les Units
4. Analyser la situation et choisir la meilleure action pour la reine
5. Print les actions

### 0. Préparer les classes et les fonctions utilitaires

-   classe Site
-   classe Unit
-   classe Queen extends Unit
-   classe Knight extends Unit
-   classe Archer extends Unit

### Lire les inputs et créer les objects

Pour chaque site, créer un object Site et l'inclure dans l'object sites { siteId: { Site } }
new Site()

### Pour chaque tour, actualiser les sites

## Spécifications

    classe Queen
    {
        x
        y
        money
        site () {return touchedSite or undefined}
        wait()
        move(target)
        get target()
        set target()
        get nearestSite()
        build(siteId, type)
        train(siteId)
    }

    classe Site
    {
        id
        radius
        x
        y
        type [SITE_TYPES]
        subType [ARMY_TYPES]
        owner
        roundLeft
    }

    class Unit
    {
        x
        y
        owner
        type
        health
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

    const SITE_TYPES = {0: undefined, 1: undefined, 2: 'BARRAKS'}
    const OWNER_TYPES = {-1: null, 0: 'SELF', 1: 'ENNEMY'}
    const ARMY_TYPES = ['KNIGHT', 'ARCHER']
