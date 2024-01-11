// Latitude is the Y axis, longitude is the X axis
const ABDUCTION_SPEED_IN_KM_PER_SEC = 0.00981;
const DISTANCE_TO_EARTH_IN_KM = 0.5;
const MISSILE_SPEED = 6;
const MISSILE_MAX_ALTITUDE = 160; // ABOVE SEA LEVEL
const DEGREE_IN_KM = 111.11;
const BASE_INFORMATION_STRING = `34°45'21.8"N, 120°37'34.8"W, elevation: 46`; // !!! MODIFIED FROM INPUTS TO FIT THE REGEX

function getLongitudeInDecimalDegree(string)
{
    // O(1)
    const [, degrees, minutes, seconds] = string.match(/(\d+)°(\d+)'(\d+.\d+)"[WE]/m); // Inputs seems to match this format everytime
    const decimalDegree = +degrees + +minutes / 60 + +seconds / 3600;
    return decimalDegree;
}

function getLatitudeInDecimalDegree(string)
{
    // O(1)
    const [, degrees, minutes, seconds] = string.match(/(\d+)°(\d+)'(\d+.\d+)"[NS]/m); // Inputs seems to match this format everytime
    const decimalDegree = +degrees + +minutes / 60 + +seconds / 3600;
    return decimalDegree;
}

class Collector
{
    constructor(name, speed, capacity, levitationRate, cost)
    {
        this.name = name;
        this.speed = speed;
        this.capacity = capacity;
        this.levitationRate = levitationRate;
        this.cost = cost;
    }

    get abductionSpeed()
    {
        return ABDUCTION_SPEED_IN_KM_PER_SEC * this.levitationRate;
    }

    computeTravelingTime(missionAltitude)
    {
        return (MISSILE_MAX_ALTITUDE - DISTANCE_TO_EARTH_IN_KM - missionAltitude) / this.speed; // TIME = DISTANCE / SPEED
    }
}

const collectors = [
    new Collector('VaCoWM Cleaner', 44.7, 3, 0.8, 1),
    new Collector('L4nd MoWer', 22.38, 10, 1.2, 6),
    new Collector('Cow Harvester', 11.19, 20, 1.5, 14),
];
const BASE = {
    x: getLongitudeInDecimalDegree(BASE_INFORMATION_STRING),
    y: getLatitudeInDecimalDegree(BASE_INFORMATION_STRING),
    z: 0.046,
};

/**
 * let missionString be a string containing location, latitude and longitude informations
 * Extract those informations
 * Compute x, y from latitude, longitude, and z
 * Return an object defining location, x, y, z
 */
function parseMissionInformations(missionString)
{
    // O(1)
    const location = missionString.slice(0, missionString.indexOf(')') + 1);
    const x = getLongitudeInDecimalDegree(missionString); // longitude is X axis
    const y = getLatitudeInDecimalDegree(missionString); // latitude is Y axis
    const z = +missionString.match(/ \d+$/g)[0] / 1000;

    return { location, x, y, z };
}

/**
 * let x and y be coordinate point attributes from the mission location.
 * Compute the distance between the BASE position and the point located
 * at 160 km above the SEA LEVEL at x,y position
 * radians = degrees × π / 180
 */
function computeMissileTravelingTime(x, y)
{
    // O(1)
    const radianFromDegree = (((BASE.y + y) / 2) * Math.PI) / 180;
    const dx = (BASE.x - x) * DEGREE_IN_KM * Math.cos(radianFromDegree); // longitude
    const dy = (BASE.y - y) * DEGREE_IN_KM; // latitude
    const distanceToMission = Math.sqrt(dx ** 2 + dy ** 2);
    const missileDistance = Math.sqrt(distanceToMission ** 2 + (MISSILE_MAX_ALTITUDE - BASE.z) ** 2);
    const time = missileDistance / MISSILE_SPEED;
    return time;
}

const numberOfMissions = +readline();
for (
    let i = 0;
    i < numberOfMissions;
    i++ // O(numberOfMissions)
)
{
    let bestCollector;
    let maxCow = 0;

    const { location, x, y, z } = parseMissionInformations(readline());
    const missileTravelingTime = computeMissileTravelingTime(x, y);

    for (const collector of collectors)
    {
        // O(nbOfCollectors) ==> O(3)
        const simulation = {
            name: collector.name,
            duration: 0,
            numberOfCows: 0,
        };

        const timeToGetACow = DISTANCE_TO_EARTH_IN_KM / collector.abductionSpeed;
        // simulation duration has to be smaller than the missile traveling time
        // minus the time the collector needs to travel back
        // minus the time to get a cow (==> means if no more time, do not do it)
        while (simulation.duration + collector.computeTravelingTime(z) + timeToGetACow < missileTravelingTime)
        {
            // O(missileTravelingTime / O(1))
            if (simulation.numberOfCows >= collector.capacity)
                break;
            simulation.duration += timeToGetACow;
            simulation.numberOfCows++;
        }

        if (simulation.numberOfCows < collector.cost)
            continue;

        if (simulation.numberOfCows > maxCow)
        {
            bestCollector = simulation.name;
            maxCow = simulation.numberOfCows;
        }
    }

    if (!bestCollector)
        console.log(`${location}: impossible.`);
    else
        console.log(
            `${location}: possible. Send a ${bestCollector} to bring back ${maxCow} ${maxCow > 1 ? 'cows' : 'cow'}.`
        );
}

// O(numberOfMissions * (nbOfCollectors * max missileTravelingTime)
// ==> la complexité dépend du nombre de mission, du nombre de collector et de la distance de chaque mission)
