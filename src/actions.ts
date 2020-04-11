import { requestParams } from './utils/request';

export const OPEN_SETTINGS_MODAL = 'OPEN_SETTINGS_MODAL';
export const CLOSE_SETTINGS_MODAL = 'CLOSE_SETTINGS_MODAL';
export const SAVE_USER_SETTINGS = 'SAVE_USER_SETTINGS';
export const SHOW_MSG = 'SHOW_MSG';

export function openSettingsModal() {
	console.log('openSettingsModal')
	return {
		type: OPEN_SETTINGS_MODAL
	};
}

export function closeSettingsModal() {
	console.log('closeSettingsModal')
	return {
		type: CLOSE_SETTINGS_MODAL
	};
}

export function saveUserSettings(userSettings:any) {
	console.log('saveUserSettings', userSettings)
	return {
		type: SAVE_USER_SETTINGS,
		userSettings
	};
}

export function showMsg(msgParams:requestParams) {
	console.log('showMsg', msgParams)
	return {
		type: SHOW_MSG,
		msgParams
	};
}