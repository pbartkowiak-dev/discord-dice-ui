import { requestParams } from './utils/request';

/* SETTINGS MODAL *************************/

export const OPEN_SETTINGS_MODAL = 'OPEN_SETTINGS_MODAL';
export const CLOSE_SETTINGS_MODAL = 'CLOSE_SETTINGS_MODAL';
export const SAVE_USER_SETTINGS = 'SAVE_USER_SETTINGS';

export function openSettingsModal() {
	return {
		type: OPEN_SETTINGS_MODAL
	};
}

export function closeSettingsModal() {
	return {
		type: CLOSE_SETTINGS_MODAL
	};
}

export function saveUserSettings(userSettings:any) {
	return {
		type: SAVE_USER_SETTINGS,
		userSettings
	};
}

/* WARHAMMER MODE *************************/

export const SAVE_WARHAMMER_SL_MODE = 'SAVE_WARHAMMER_SL_MODE';

export function saveWarhammerSlMode(warhammerSlMode:any) {
	return {
		type: SAVE_WARHAMMER_SL_MODE,
		warhammerSlMode
	};
}


/* MODIFIER MODAL *************************/

export const OPEN_MODIFIER_MODAL = 'OPEN_MODIFIER_MODAL';
export const CLOSE_MODIFIER_MODAL = 'CLOSE_MODIFIER_MODAL';

export function openModifierModal() {
	return {
		type: OPEN_MODIFIER_MODAL
	};
}

export function closeModifierModal() {
	return {
		type: CLOSE_MODIFIER_MODAL
	};
}

/* CoC MODAL *************************/

export const OPEN_COC_MODAL = 'OPEN_COC_MODAL';
export const CLOSE_COC_MODAL = 'CLOSE_COC_MODAL';


export function openCoCModal() {
	return {
		type: OPEN_COC_MODAL
	};
}

export function closeCoCModal() {
	return {
		type: CLOSE_COC_MODAL
	};
}

/* Warhammer4e MODAL *************************/

export const OPEN_WARHAMMER_MODAL = 'OPEN_WARHAMMER_MODAL';
export const CLOSE_WARHAMMER_MODAL = 'CLOSE_WARHAMMER_MODAL';


export function openWarhammerModal() {
	return {
		type: OPEN_WARHAMMER_MODAL
	};
}

export function closeWarhammerModal() {
	return {
		type: CLOSE_WARHAMMER_MODAL
	};
}

/* MSG ************************************/

export const SHOW_MSG = 'SHOW_MSG';
export const HIDE_MSG = 'HIDE_MSG';

export function showMsg(msgParams:requestParams) {
	return {
		type: SHOW_MSG,
		msgParams
	};
}

export function hideMsg() {
	return {
		type: HIDE_MSG
	};
}

/* DICE ***********************************/

export const SELECT_DICE = 'SELECT_DICE';

export function selectDice(selectedDice:any) {
	return {
		type: SELECT_DICE,
		selectedDice
	};
}