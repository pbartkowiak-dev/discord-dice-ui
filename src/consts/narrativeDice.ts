import {
	BOOST,
	DIFFICULTY,
	ABILITY,
	CHALLENGE,
	FORCE,
	PROFICIENCY,
	SETBACK,
	D100
} from './diceConstants';

export default {
	[ABILITY]: {
		diceType: ABILITY,
		label: 'Ability Die'
	},
	[PROFICIENCY]: {
		diceType: PROFICIENCY,
		label: 'Proficiency Die'
	},
	[DIFFICULTY]: {
		diceType: DIFFICULTY,
		label: 'Difficulty Die'
	},
	[CHALLENGE]: {
		diceType: CHALLENGE,
		label: 'Challenge Die'
	},
	[BOOST]: {
		diceType: BOOST,
		label: 'Boost Die'
	},
	[SETBACK]: {
		diceType: SETBACK,
		label: 'Setback Die'
	},
	[FORCE]: {
		diceType: FORCE,
		label: 'Force Die'
	},
	[D100]: {
		diceType: D100,
		label: 'Percentile Dice'
	}
};
