import {
	BOOST,
	DIFFICULTY,
	ABILITY,
	CHALLENGE,
	FORCE,
	PROFICIENCY,
	SETBACK,
	RING_DIE,
	SKILL_DIE
} from '../consts/diceConstants';

export default (diceType: string | number): number => {
	if (typeof diceType === 'number') {
		return diceType;
	}

	// handle narrative dice
	if (diceType === BOOST || diceType === SETBACK) {
		return 6;
	} else if (diceType === ABILITY || diceType === DIFFICULTY) {
		return 8;
	} else if (diceType === PROFICIENCY || diceType === CHALLENGE || diceType === FORCE) {
		return 12;
	}

	// handle l5r dice
	if (diceType === RING_DIE) {
		return 6;
	} else if (diceType === SKILL_DIE) {
		return 12;
	}

	return Number(
		diceType.replace(/\D/g,'')
	);
};
