// INIT
const SHAPE_TYPES = {
    SQUARE: 'SQUARE',
    CIRCLE: 'CIRCLE',
};
const POSITION_TYPES = { IN: 'IN', OUT: 'OUT' };
const COLOR_TYPES = { BLACK: '(0, 0, 0)', WHITE: '(255, 255, 255)' };

function getPointPositionFromShape(point, shape)
{
    // COMPLEXITY : 0(POSITION_TYPES * sideTest(4)) ==> O(POSITION_TYPES)
    const [pointX, pointY] = point;
    const shapeX = shape.x;
    const shapeY = shape.y;
    const len = shape.len;

    switch (shape.name)
    {
        case SHAPE_TYPES.SQUARE: {
            if (pointX < shapeX || shapeX + len < pointX || pointY < shapeY || shapeY + len < pointY)
                return POSITION_TYPES.OUT;
            if (shapeX < pointX && pointX < shapeX + len && shapeY < pointY && pointY < shapeY + len)
                return POSITION_TYPES.IN;
            break;
        }
        case SHAPE_TYPES.CIRCLE: {
            const dist = (shapeX - pointX) ** 2 + (shapeY - pointY) ** 2;
            if (dist > len ** 2)
                return POSITION_TYPES.OUT;
            if (dist < len ** 2)
                return POSITION_TYPES.IN;
            break;
        }
    }
    throw COLOR_TYPES.BLACK;
}

function computeColor(r, g, b, n)
{
    // O(1)
    const red = Math.round(r / n);
    const green = Math.round(g / n);
    const blue = Math.round(b / n);
    return `(${red}, ${green}, ${blue})`;
}

// BODY
const [nbOfShapes, nbOfPoints] = readline() // O(readline().length)
    .split(' ')
    .map((x) => +x);

const shapes = new Array(nbOfShapes).fill(0).map(() => {
    // O(nbOfShapes)
    const parameters = readline().split(' ');
    const name = parameters.shift();
    const [x, y, len, R, G, B] = parameters.map((x) => +x);
    return { name, x, y, len, R, G, B };
});

// O(nbOfPoints)
const points = new Array(nbOfPoints).fill(0).map(() =>
    readline()
        .split(' ')
        .map((x) => +x)
);

for (const point of points) { // O(nbOfPoints)
    let R = 0;
    let G = 0;
    let B = 0;
    let N = 0;

    try
    {
        for (const shape of shapes) { // O(nbOfShapes)
            const positionType = getPointPositionFromShape(point, shape);
            if (positionType === POSITION_TYPES.IN)
            {
                R += shape.R;
                G += shape.G;
                B += shape.B;
                N++;
            }
        }
        if (!N)
            console.log(COLOR_TYPES.WHITE);
        else
            console.log(computeColor(R, G, B, N));
    }
    catch (errorColor)
    {
        console.log(errorColor);
    }
}

// COMPLEXITY : O(nbOfPoints * nbOfShapes * nbOfPositionTypes)
