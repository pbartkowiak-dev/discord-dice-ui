export const DIE_CLICKED = 'DIE_CLICKED';
export const ROLL_SUBMITTED = 'ROLL_SUBMITTED';
export const DICE_ROLL_REQUESTED = 'DICE_ROLL_REQUESTED';
export const DICE_ROLL = 'DICE_ROLL';
export const DICE_ROLLED = 'DICE_ROLLED';
export const LOCAL_MSG_READY = 'LOCAL_MSG_READY';
export const REQUEST_MSG_READY = 'REQUEST_MSG_READY';

export function submitRoll({ diceType, diceAmount }:any) {
	return {
		type: ROLL_SUBMITTED,
		payload: {
			diceType,
			diceAmount
		}
	};
}

export function requestDiceRoll({ diceType, diceAmount, rollOptions, modifier }:any ) {
	return {
		type: DICE_ROLL_REQUESTED,
		payload: {
			diceType,
			diceAmount,
			rollOptions,
			modifier
		}
	};
}

export function diceRolled(payload:any) {
	return {
		type: DICE_ROLLED, 
		payload
	};
}

export function localMsgReady(payload:any) {
	return {
		type: LOCAL_MSG_READY, 
		payload
	};
}

export function requestMsgReady(payload:any) {
	return {
		type: REQUEST_MSG_READY, 
		payload
	};
}
