function isKingInCheck(pieceType, piecePosition, kingPosition)
{
    const [pieceX, pieceY] = piecePosition;
    const [kingX, kingY] = kingPosition;
    const deltaX = Math.abs(pieceX - kingX);
    const deltaY = Math.abs(pieceY - kingY);

    switch (pieceType)
    {
        case 'B':
            if (deltaX === deltaY)
                return true;
            break;
        case 'N':
            if ((deltaX === 1 && deltaY === 2) || (deltaX === 2 && deltaY === 1))
                return true;
            break;
        case 'R':
            if (!deltaX || !deltaY)
                return true;
            break;
        case 'Q':
            if (!deltaX || !deltaY || deltaX === deltaY)
                return true;
            break;
        default:
            return false;
    }
    return false;
}

let kingPosition, piecePosition, pieceType;

for (let i = 0; i < 8; i++)
{
    if (kingPosition && piecePosition)
        break;
    const chessRow = readline().split(' ');
    for (let j = 0; j < chessRow.length; j++)
    {
        const cellValue = chessRow[j];
        if (cellValue === '_')
            continue;
        else if (cellValue === 'K')
            kingPosition = [j, i];
        else
        {
            pieceType = cellValue;
            piecePosition = [j, i];
        }
    }
}

console.log(isKingInCheck(pieceType, piecePosition, kingPosition) ? 'Check' : 'No Check');
