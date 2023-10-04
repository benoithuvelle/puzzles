const OWNER_TYPES = { ME: 0 };
const UNIT_TYPES = { QUEEN: 'QUEEN', KNIGHT: 'KNIGHT', ARCHER: 'ARCHER', GIANT: 'GIANT' };
const UNIT_TYPES_TO_INT = { [UNIT_TYPES.QUEEN]: -1, [UNIT_TYPES.KNIGHT]: 0, [UNIT_TYPES.ARCHER]: 1 };
const COSTS = { KNIGHT: 80, ARCHER: 100, GIANT: 100 };
const ACTION_TYPES = { WAIT: 'WAIT', BUILD: 'BUILD', MOVE: 'MOVE', TRAIN: 'TRAIN' };
const STRUCTURE_TYPES = { BARRACKS: 'BARRACKS', TOWER: 'TOWER' };
const INT_TO_STRUCTURE_TYPES = { 1: 'TOWER', 2: 'BARRACKS' };

const sites = {};
const queen = {};

const numSites = +readline();
for (let i = 0; i < numSites; i++)
{
    const [id, x, y, radius] = readline()
        .split(' ')
        .map((x) => +x);
    sites[id] = { id, x, y };
}
// game loop
while (true)
{
    let hasBarracks;
    const inputs = readline().split(' ');
    let gold = +inputs[0];
    const touchedSite = +inputs[1]; // -1 if none
    for (let i = 0; i < numSites; i++)
    {
        const [siteId, ignore1, ignore2, type, owner, param1, param2] = readline()
            .split(' ')
            .map((x) => +x);
        const site = sites[siteId];
        site.isMine = owner === OWNER_TYPES.ME;
        site.type = INT_TO_STRUCTURE_TYPES[type];
        if (site.isMine)
        {
            site.isReady = param1 === 0;
            if (site.type === STRUCTURE_TYPES.BARRACKS)
                hasBarracks = true;
        }
    }

    const numUnits = +readline();
    for (let i = 0; i < numUnits; i++)
    {
        const [x, y, owner, unitType, health] = readline()
            .split(' ')
            .map((x) => +x);
        if (unitType === UNIT_TYPES_TO_INT[UNIT_TYPES.QUEEN] && owner === OWNER_TYPES.ME)
        {
            queen.x = x;
            queen.y = y;
        }
    }

    const buildSiteId = getClosestSiteId(queen.x, queen.y);
    const armyToTrain = [];
    if (gold >= COSTS.KNIGHT)
    {
        for (const siteId in sites)
        {
            const site = sites[siteId];
            if (site.isMine && site.isReady && gold >= COSTS.KNIGHT)
            {
                armyToTrain.push(siteId);
                gold -= COSTS.KNIGHT;
            }
        }
    }

    if (buildSiteId === undefined)
        console.log(ACTION_TYPES.WAIT);
    else
        console.log(
            ACTION_TYPES.BUILD,
            buildSiteId,
            hasBarracks ? STRUCTURE_TYPES.TOWER : `${STRUCTURE_TYPES.BARRACKS}-${UNIT_TYPES.KNIGHT}`
        );
    if (armyToTrain.length)
        console.log(ACTION_TYPES.TRAIN, armyToTrain.join(' '));
    else
        console.log(ACTION_TYPES.TRAIN);
}

/**
 * UTILS
 */

function getClosestSiteId(unitX, unitY)
{
    let closestSiteId;
    let min = Infinity;
    for (const siteId in sites)
    {
        const site = sites[siteId];
        if (site.isMine || site.type === STRUCTURE_TYPES.TOWER)
            continue;
        const dist = (site.x - unitX) ** 2 + (site.y - unitY) ** 2;
        if (dist < min)
        {
            min = dist;
            closestSiteId = site.id;
        }
    }
    return closestSiteId;
}
