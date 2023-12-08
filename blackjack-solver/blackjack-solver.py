import sys
import math

# bank_cards = input().split(' ')
# player_cards = input().split(' ')

# def get_score(cards):
# 	score = 0
# 	for card in cards:
# 		print(card)
# 	return score

# myScore = getScore(bank_cards)
# bankScore = getScore(player_cards)
myScore = 21
bankScore = 21

if myScore > 21 or (bankScore <= 21 and bankScore > myScore):
	print('Bank')
elif myScore == bankScore:
	print('Draw')
else:
	print('Player')