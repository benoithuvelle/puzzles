import sys
import math

n = int(input())

grid = [ [' ' for _ in range(2*(2*n)-1) ] for _ in range(2*n)]

grid[0][0] = '.'

for root in [ [n, n-1], [0, 2*n-1], [2*n, 2*n-1] ]:
	x = root[0]
	y = root[1]
	for i in range(n):
		for j in range(2*(n-i)-1):
			grid[y-i][x+j+i] = '*'

for row in grid:
	print(''.join(row).rstrip())