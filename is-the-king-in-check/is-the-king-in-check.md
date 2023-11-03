# Is the king in Check ?

https://www.codingame.com/ide/puzzle/is-the-king-in-check-part-1
30.10.23

## Strategy

-   find opponent on grid
-   according to the opponent type, find if my king is in check

## Specs

function isKingInCheck(pieceType, piecePosition, kingPosition)
{ // return true if kin in check, else return false
deltaX = abs (piecePosition.x - kingPosition.x)
deltaY = abs (piecePosition.y - kingPosition.y)
switch pieceType
B:
deltaX === deltaY
N:
deltaX === 1 && deltaY === 2 || deltaX === 2 && deltaY === 1
R:
!deltaX || !deltaY
Q:
deltaX === deltaY || !deltaX || !deltaY

}

## Code Structure

1. find piece position and king position
   let kingPosition
   let pieceType
   let piecePosition

`	for every row[] in grid
		for every cell
			if cell === '_'				
				continue
			else if cell === 'k'
				set kingPosition
			else 
				set piecePosition
				set pieceType`

2. check if is check with isKingInCheck
3. print isInCheck
