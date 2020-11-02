export const DIE_CLICKED = 'DIE_CLICKED';
export const ROLL_SUBMITTED = 'ROLL_SUBMITTED';
export const DICE_ROLL_REQUESTED = 'DICE_ROLL_REQUESTED';
export const DICE_ROLL = 'DICE_ROLL';
export const DICE_ROLLED = 'DICE_ROLLED';
export const LOCAL_MSG_READY = 'LOCAL_MSG_READY';
export const REQUEST_MSG_READY = 'REQUEST_MSG_READY';
export const COC_DICE_ROLLED = 'COC_DICE_ROLLED';
export const WARHAMMER_DICE_ROLLED = 'WARHAMMER_DICE_ROLLED';
export const CONAN_DICE_ROLLED = 'CONAN_DICE_ROLLED';

export function submitRoll(payload: any) {
	return {
		type: ROLL_SUBMITTED,
		payload
	};
}

export function requestDiceRoll(payload: any ) {
	return {
		type: DICE_ROLL_REQUESTED,
		payload
	};
}

export function diceRolled(payload: any) {
	return {
		type: DICE_ROLLED, 
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
