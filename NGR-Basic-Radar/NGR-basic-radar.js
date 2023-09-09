const N = +readline();
const carSet = {};
for (let i = 0; i < N; i++)
{
    const [plate, , timestamp] = readline().split(' ');
    if (!carSet[plate])
        carSet[plate] = [+timestamp];
    else
        carSet[plate].push(+timestamp);
}

const fastCar = [];
for (const plate in carSet)
{
    const [a, b] = carSet[plate];
    const time = Math.abs(a - b);
    if (!Number.isNaN(time) && time < 6 * 60 * 1000)
        fastCar.push([plate, time]);
}

fastCar
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([plate, time]) => print(plate, Math.floor(13 / (time / 1000 / 60 / 60))));
