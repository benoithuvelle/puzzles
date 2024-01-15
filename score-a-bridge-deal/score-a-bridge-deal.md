# score-a-bridge-deal

## Resume

### bidding phase

a bid is a contract = try to win a number of trick with a given suit as Trump
declaring side = highest bidder
2x2 players
52 cards
==> 13 tricks
minor suit = C and D
major suit = H and S

contrat

-   number of tricks over 6
-   suit (C, D, H, S, or NT)

ex: 2S = at least 8 tricks ==> 8 = 6 + 2

a contract can also be 'Pass'

=> contract example
'2S'
'Pass'
'7H'

Score depends on:

-   actual number of tricks own
-   vulnerability
-   factor (doubled or redoubled)

vulnerability can either be 'V' or 'NV'
factor can either be 'X' or 'XX'

### WON

won ==> at least the number of tricks declared

-   score is positive

Every trick over 6 gets scored

-   20 points if trump is minor
-   30 points if trump is major
-   40 points for the first then 30 points for the remaining ones if no trump

Apply the factor (1, 2, 4) for each scored tricks

on Total:
if total >= 100
game bonus ==> 300 if 'NV', else 500
if (total < 100)
game bonus === 50

contract level (every trick over 6)
==> ex: 6 is every tricks but one ==> 12

if level === 6
small slam bonus = 'NV' ? 500 : 750

if level === 7
grand slam bonus = 'NV' ? 1000 : 1500

for every overtricks
if factor 1
overtrick = normal trick score
if factor 2
overtrick = 'NV' ? 100 : 200
if factor 4
overtrick = 'NV' ? 200 : 400

if contract is doubled
additional bonus = 50
if contract is redoubled
additional bonus = 100

### LOST --> score is negative and depend on number of undertricks

each undertrick
if contract is normal
undertrick = 'NV' ? 50 : 100
if contract is double && NV
undertrick = 100 then 200 then remaining ones are 300
if contract is double && V
undertrick = 200 then 300 each remaining ones
if contract is redouble
==> double the double contract value

===> OK ==> Need to clean this a bit

## Code Structure

-   parse input
-
