const BASE_INFORMATION_STRING = `34°45'21.8"N, 120°37'34.8"W, elevation: 46`; // !!! MODIFIED FROM INPUTS TO FIT THE REGEX
const MISSION_STRING = `Boadwine Farms Inc (South Dakota, USA) 43°44'41.7"N 96°49'37.4"W 496`;

function getLongitudeInDecimalDegree(string)
{
    const [, degrees, minutes, seconds] = string.match(/(\d+)°(\d+)'(\d+.\d+)"[WE]/m); // Inputs seems to match this format everytime
    const decimalDegree = +degrees + +minutes / 60 + +seconds / 3600;
    return decimalDegree;
}

console.debug(getLongitudeInDecimalDegree(BASE_INFORMATION_STRING));
console.debug(getLongitudeInDecimalDegree(MISSION_STRING));
