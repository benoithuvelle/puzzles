# Faro-shuffle

22 septembre 2023
https://www.codingame.com/training/easy/faro-shuffle

## Specifications

N = nb of shuffle
let deck[card]

## Code Structure

    for n
    	const shuffle = []
    	for i = 0 to deck.length
    		shuffle[i] = deck.splice(i%2 === 0 ? 0 : Math.ceil(deck.length/2), 1)
    	deck = shuffle

### Complexity

O(N\*deck.length²)

## Code Structure Variant

    len = deck.length
    for n
    	shuffle = []
    	temp = [deck.splice(0, Math.ceil(len/2)).reverse(), deck.reverse()]
    	for i = 0; i < len; i++
    		shuffle.push(deck[i%2].pop())
    	deck = shuffle

### Complexity

O(N\*deck.length)

## Code Structure Variant 2

    len = deck.length
    for n
    	shuffle = []
    	for i 0 ==> i < Math.ceil(len/2)
    		shuffle.push(deck[i])
    		shuffle.push(deck[Math.ceil(len/2)+i])
    	if len%2
    		shuffle.pop()
    	deck = shuffle

### Complexity

O(N\*deck.length)

## Conclusion
error: write good pseudo code so I do not mess up i with j
