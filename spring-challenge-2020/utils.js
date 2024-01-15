export const ACTION_TYPES = {
	MOVE: 'MOVE',
	SPEED: 'SPEED',
};

export const PAC_TYPES = {
	PAPER: 'PAPER',
	ROCK: 'ROCK',
	SCISSORS: 'SCISSORS',
};

export const PELLET_TYPES = {
	1: '*',
	10: '$',
};

export const CONSTRUCTION_TYPES = {
	'#': 'WALL',
	' ': 'FLOOR',
};

export function hash(x, y)
{
	return `${x}|${y}`;
}
