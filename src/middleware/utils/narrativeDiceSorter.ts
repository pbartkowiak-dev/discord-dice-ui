import {
	ABILITY,
	BOOST,
	CHALLENGE,
	D100,
	DIFFICULTY,
	FORCE,
	PROFICIENCY,
	SETBACK
} from '../../consts/diceConstants';

export default (a: string, b: string) => {
	if (a === BOOST) {
		return -1;
	}
	if (b === BOOST) {
		return 1;
	}
	if (b === D100) {
		return -1;
	}
	if (a !== D100 && b === FORCE) {
		return -1;
	}
	if (a === FORCE && b !== D100) {
		return 1;
	}
	if (a === ABILITY && b !== BOOST) {
		return -1;
	}
	if (a === PROFICIENCY && b !== BOOST && b !== ABILITY) {
		return -1;
	}
	if (a === SETBACK && (b === CHALLENGE || b === DIFFICULTY)) {
		return -1;
	}
	if (a === DIFFICULTY && b === CHALLENGE) {
		return -1;
	}
	if (a === CHALLENGE && (b === DIFFICULTY || b === SETBACK || b === ABILITY || b === DIFFICULTY || b === CHALLENGE || b === FORCE)) {
		return 1;
	}
	return 0;
};
