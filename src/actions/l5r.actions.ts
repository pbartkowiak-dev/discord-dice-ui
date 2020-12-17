export const L5R_REROLL_REQUESTED = 'L5R_REROLL_REQUESTED';
export const L5R_DICE_REROLLED = 'L5R_DICE_REROLLED';
export const L5R_ROLL_REQUESTED = 'L5R_ROLL_REQUESTED';
export const L5R_DICE_ROLLED = 'L5R_DICE_ROLLED';
export const L5R_KEEP_DICE = 'L5R_KEEP_DICE';
export const L5R_ALTER_DIE = 'L5R_ALTER_DIE';
export const L5R_ROLL_ADDITIONAL_DIE = 'L5R_ROLL_ADDITIONAL_DIE';
export const L5R_KEEP_ADDITIONAL_DIE = 'L5R_KEEP_ADDITIONAL_DIE';
export const L5R_CLEAR_DATA = 'L5R_CLEAR_DATA';
export const L5R_ADD_DIE = 'L5R_ADD_DIE';
export const L5R_SEND_STATE = 'L5R_SEND_STATE';

export function requestL5rRoll(payload: any) {
	return {
		type: L5R_ROLL_REQUESTED,
		payload
	}
}

export function requestL5rReroll(payload: any ) {
	return {
		type: L5R_REROLL_REQUESTED,
		payload
	};
}

export function l5rDiceRerolled(payload: any ) {
	return {
		type: L5R_DICE_REROLLED,
		payload
	};
}

export function l5rDiceRolled(payload: any) {
	return {
		type: L5R_DICE_ROLLED, 
		payload
	};
}

export function l5rKeepDice(payload: any) {
	return {
		type: L5R_KEEP_DICE, 
		payload
	};
}

export function l5rAlterDie(payload: any) {
	return {
		type: L5R_ALTER_DIE, 
		payload
	};
}

export function l5rAddDie(payload: any) {
	return {
		type: L5R_ADD_DIE,
		payload
	}
}

export function l5rRollAdditionalDie(payload: any) {
	return {
		type: L5R_ROLL_ADDITIONAL_DIE, 
		payload
	};
}

export function l5rKeepAdditionalDie(payload: any) {
	return {
		type: L5R_KEEP_ADDITIONAL_DIE, 
		payload
	};
}

export function l5rClearData() {
	return {
		type: L5R_CLEAR_DATA
	};
}

export function l5rSendState() {
	return {
		type: L5R_SEND_STATE
	};
}
