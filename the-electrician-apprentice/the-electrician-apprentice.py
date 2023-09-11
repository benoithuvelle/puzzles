import sys
import math

equipements = {}

c = int(input())
switches = []
for i in range(c):
    wiring = input().split(' ')
    curr = equipements[wiring.pop(0)] = []
    group = None
    serie = None
    for j in range(len(wiring)):
        part = wiring[j]
        if part == '-':
            serie = True
        elif part == '=':
            serie = False 
            group = []
            curr.append(group)
        elif serie: 
            curr.append([part])
        else:
            group.append(part)
a = int(input())
for i in range(a):
    switch = input()
    if switch in switches: 
        switches.remove(switch)
    else: 
        switches.append(switch)

# print(equipements)
for eq, path in equipements.items():
    # print(eq)
    # print(path)
    on = None
    for group in path:
        on = False
        for sw in group:
            if sw in switches:
                on = True
        if not on: 
            print(f'{eq} is OFF')
            break
    if on:        
        print(f'{eq} is ON')


