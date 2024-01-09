/**
 * Save the Planet.
 * Use less Fossil Fuel.
 **/

let lastX;
let currentY;
let area;

const N = +readline(); // the number of points used to draw the surface of Mars.
for (let i = 0; i < N; i++)
{
    const [x, y] = readline()
        .split(' ')
        .map((x) => +x);
    if (y === currentY && x - lastX >= 1000)
        area = { x1: lastX, x2: x, cx: x + (lastX - x) / 2, y };
    else
    {
        lastX = x;
        currentY = y;
    }
}
printErr(area);

// game loop
let lastY;
while (true)
{
    const [x, y, hs, vs, fuel, angle, power] = readline()
        .split(' ')
        .map((x) => +x);
    printErr(x, area.cx);
    let rotate = angle + (hs + 1);
    printErr(rotate);

    let motor = 4;
    if (y > lastY)
        motor = 0;
    lastY = y;

    console.log(`${rotate} ${motor}`);
}
