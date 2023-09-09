# Hidden message in images

07.09.2023
https://www.codingame.com/training/easy/hidden-messages-in-images

## Cahier des charges

Pour chaque pixel d'une grille à 2 dimensions

-   parse to Int
-   to binary
-   take only the last bit

then

-   flatten the grid
-   split by 8
-   this to ascii
-   join to string
-   print

## Spécifications

grid[h][w]

## Conclusion

A tatons mais assez straight forward
String manipulation
==> string to binary ===> n.toString(2) ==> easy !
binary to int ==> parseInt(n, 2)
