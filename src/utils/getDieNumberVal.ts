import {
	BOOST,
	DIFFICULTY,
	ABILITY,
	CHALLENGE,
	FORCE,
	PROFICIENCY,
	SETBACK
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
	return Number(
		diceType.replace(/\D/g,'')
	);
};
