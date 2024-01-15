const nbTests = +readline();
const score = {
    won: {
        C: [20, 20, 20, 20, 20, 20, 20],
        D: [20, 20, 20, 20, 20, 20, 20],
        H: [30, 30, 30, 30, 30, 30, 30],
        S: [30, 30, 30, 30, 30, 30, 30],
        NT: [40, 30, 30, 30, 30, 30, 30],
    },
    lost: {
        NO_FACTOR: (isVulnerable) => (isVulnerable ? 100 : 50),
        NV: [50, 100, 100, 150, 150, 150, 150],
        V: [100, 150, 150, 150, 150, 150, 150],
    },
};
function getFactor(factor)
{
    if (factor === 'X')
        return 2;
    if (factor === 'XX')
        return 4;
    else
        return 1;
}

for (let i = 0; i < nbTests; i++)
{
    let total = 0;
    const [vulnerability, contract, actualTricksNumber] = readline().split(' ');
    const tricksWithValue = +actualTricksNumber - 6;
    const isVulnerable = vulnerability === 'V';
    let scoreGrid;
    if (contract === 'Pass')
    {
        console.log(total);
        continue;
    }

    const [, level, trump, factor] = contract.match(/(\d)([CDHS]|NT)(X*)/) ?? [];

    if (tricksWithValue >= +level)
    {
        // won
        scoreGrid = score.won[trump];
        // regular tricks
        for (let j = 0; j < +level; j++)
            total += scoreGrid[j] * getFactor(factor); // game bonus
        if (total >= 100)
            total += isVulnerable ? 500 : 300;
        else
            total += 50;

        // small slam bonus
        if (+level === 6)
            total += isVulnerable ? 750 : 500;

        // big slam bonus
        if (+level === 7)
            total += isVulnerable ? 1500 : 1000;

        // overtricks bonus
        for (let j = +level; j < tricksWithValue; j++)
        {
            total += factor ? 50 * (isVulnerable ? 2 : 1) * getFactor(factor) : scoreGrid[j];
        }
        // additional bonus
        if (factor)
            total += 25 * getFactor(factor);
    }
    else
    {
        //lost
        scoreGrid = score.lost;
        for (let j = 0; j < +level + 6 - +actualTricksNumber; j++)
            total -= !factor ? scoreGrid.NO_FACTOR(isVulnerable) : scoreGrid[vulnerability][j] * getFactor(factor);
    }
    console.log(total);
}

/**
 * conclusions
 * - un match renvoie des strings ==> parse si nécessaire !!!!
 * - une valeur de mes tableaux étaient fausse ==> relire les informations données
 */
