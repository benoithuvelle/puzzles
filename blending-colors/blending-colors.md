# Blending Colors

https://www.codingame.com/ide/puzzle/blending-colors
02/10/2023

## Stratégie

Déterminer la couleur obtenue par le mélange de toutes les couches aux coordonnées x,y données.
Pour chaque point, il faut print la couleur obtenue, donc: - décomposer la couleur en R, G, B et les initialiser à 0 - pour chaque forme, ajouter la composante R, G, B de la forme à la couleur du point. - Remarquer si on est sur une bordure, alors d'office on print black - si dans le vide, on ne fait rien
Quand toutes les formes sont passées en revue, on compute la couleur et puis on print

## Spécifications

    SHAPE_TYPES : SQUARE | CIRCLE
    POSITION_TYPES : IN | ON | OUT
    COLOR_TYPES : WHITE | BLACK

    shapeObject = { x, y, len, R, G, B }
    shapes = [ shapeObject ]

## Code Structure

    FUNCTION get_point_position_from_shape ( shape )
        RETURN POSITION_TYPE
    END FUNCTION

    FUNCTION color ( R, G, B)
        return STR '(INT, INT, INT)'

    R = 0
    G = 0
    B = 0

    number_of_shape = 0

    LOOP OVER POINTS => POINT
        is_on_border = false
        pointX
        pointY

        LOOP OVER SHAPES => SHAPE
            position = get_point_position_from_shape( SHAPE )
            IF IN
                R += shape.R
                G += shape.G
                B += shape.B
                numberOfShapes++

            ELSE IF ON
                isOnBorder = true
                break

        END LOOP OVER SHAPES

        IF is_on_border
            print BLACK
        ELSE IF NOT number_of_shape
            print WHITE
        ELSE
            print color (R, G, B)
            console.log(`(${[R,G,B].map(c => Math.round(c/numberOfShapes)).join(', ')})`)
    }
