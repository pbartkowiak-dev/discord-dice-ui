import { RING_DIE, SKILL_DIE } from "./diceConstants";

export const EXPLOSIVE_SUCCESS = 'explosive_success';
export const OPPORTUNITY = 'opportunity';
export const STRIFE = 'strife';
export const SUCCESS = 'success';
export const BLANK = 'blank';

export default {
	[EXPLOSIVE_SUCCESS]: {
		symbolType: EXPLOSIVE_SUCCESS,
		label: 'Explosive Success'
	},
	[OPPORTUNITY]: {
		symbolType: OPPORTUNITY,
		label: 'Opportunity'
	},
	[STRIFE]: {
		symbolType: STRIFE,
		label: 'Strife'
	},
	[SUCCESS]: {
		symbolType: SUCCESS,
		label: 'Success'
	},
	[BLANK]: {
		symbolType: BLANK,
		label: 'Blank'
	}
};

export const l5rResults = {
	[`${BLANK}_${RING_DIE}`]: 'Blank',
	[`${OPPORTUNITY}_${STRIFE}_${RING_DIE}`]: 'Opportunity, Strife',
	[`${OPPORTUNITY}_${RING_DIE}`]: 'Opportunity',
	[`${SUCCESS}_${STRIFE}_${RING_DIE}`]: 'Success, Strife',
	[`${SUCCESS}_${RING_DIE}`]: 'Success',
	[`${EXPLOSIVE_SUCCESS}_${STRIFE}_${RING_DIE}`]: 'Explosive Success, Strife',

	[`${BLANK}_${SKILL_DIE}`]: 'Blank',
	[`${OPPORTUNITY}_${SKILL_DIE}`]: 'Opportunity',
	[`${SUCCESS}_${STRIFE}_${SKILL_DIE}`]: 'Success, Strife',
	[`${SUCCESS}_${SKILL_DIE}`]: 'Success',
	[`${SUCCESS}_${OPPORTUNITY}_${SKILL_DIE}`]: 'Success, Opportunity',
	[`${EXPLOSIVE_SUCCESS}_${OPPORTUNITY}_${SKILL_DIE}`]: 'Explosive Success, Opportunity',
	[`${EXPLOSIVE_SUCCESS}_${SKILL_DIE}`]: 'Explosive Success'
};
