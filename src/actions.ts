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

/* MSG ************************************/

export const SHOW_MSG = 'SHOW_MSG';

export function showMsg(msgParams:requestParams) {
	return {
		type: SHOW_MSG,
		msgParams
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