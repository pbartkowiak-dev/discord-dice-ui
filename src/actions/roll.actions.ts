export const DIE_CLICKED = 'DIE_CLICKED';
export const ROLL_SUBMITTED = 'ROLL_SUBMITTED';
export const DICE_POOL_ROLL_REQUESTED = 'DICE_POOL_ROLL_REQUESTED';
export const DICE_POOL_ROLLED = 'DICE_POOL_ROLLED';
export const DICE_ROLL_REQUESTED = 'DICE_ROLL_REQUESTED';
export const DICE_ROLL = 'DICE_ROLL';
export const DICE_ROLLED = 'DICE_ROLLED';
export const LOCAL_MSG_READY = 'LOCAL_MSG_READY';
export const REQUEST_MSG_READY = 'REQUEST_MSG_READY';
export const COC_DICE_ROLLED = 'COC_DICE_ROLLED';
export const WARHAMMER_DICE_ROLLED = 'WARHAMMER_DICE_ROLLED';
export const CONAN_DICE_ROLLED = 'CONAN_DICE_ROLLED';
export const REROLL_REQUESTED = 'REROLL_REQUESTED';
export const ROLL_COUNTER_UPDATED = 'ROLL_COUNTER_UPDATED';
export const ROLL_COUNTER_RESET = 'ROLL_COUNTER_RESET';
export const DICE_SELECTED = 'DICE_SELECTED';
export const DICE_SELECTED_RESET = 'DICE_SELECTED_RESET';
export const POOL_SELECTED = 'POOL_SELECTED';
export const POOL_SELECTED_RESET = 'POOL_SELECTED_RESET';

export function submitRoll(payload: any) {
	return {
		type: ROLL_SUBMITTED,
		payload
	};
}

export function requestRoll(payload: any ) {
	return {
		type: DICE_ROLL_REQUESTED,
		payload
	};
}

export function requestPoolRoll(payload: any ) {
	return {
		type: DICE_POOL_ROLL_REQUESTED,
		payload
	};
}

export function requestReroll(payload: any ) {
	return {
		type: REROLL_REQUESTED,
		payload
	};
}

export function diceRolled(payload: any) {
	return {
		type: DICE_ROLLED, 
		payload
	};
}

export function dicePoolRolled(payload: any) {
	return {
		type: DICE_POOL_ROLLED, 
		payload
	};
}

export function cocDiceRolled(payload: any) {
	return {
		type: COC_DICE_ROLLED,
		payload
	}
}

export function warhammerDiceRolled(payload: any) {
	return {
		type: WARHAMMER_DICE_ROLLED,
		payload
	}
}

export function conanDiceRolled(payload: any) {
	return {
		type: CONAN_DICE_ROLLED,
		payload
	}
}

export function localMsgReady(payload: any) {
	return {
		type: LOCAL_MSG_READY, 
		payload
	};
}

export function requestMsgReady(payload: any) {
	return {
		type: REQUEST_MSG_READY, 
		payload
	};
}

export function updateRollCounter() {
	return {
		type: ROLL_COUNTER_UPDATED
	};
}

export function resetRollCounter() {
	return {
		type: ROLL_COUNTER_RESET
	};
}

export function storeSelectedDice(payload: any) {
	return {
		type: DICE_SELECTED,
		payload
	};
}

export function resetSelectedDice() {
	return {
		type: DICE_SELECTED_RESET
	};
}

export function storeSelectedPool(payload: any) {
	return {
		type: POOL_SELECTED,
		payload
	};
}

export function resetSelectedPool() {
	return {
		type: POOL_SELECTED_RESET
	};
}
