
export const SAVE_WARHAMMER_SL_MODE = 'SAVE_WARHAMMER_SL_MODE';
export const SELECT_DICE = 'SELECT_DICE';
export const SAVE_USER_SETTINGS = 'SAVE_USER_SETTINGS';

export function saveWarhammerSlMode(warhammerSlMode:any) {
	return {
		type: SAVE_WARHAMMER_SL_MODE,
		warhammerSlMode
	};
}

export function selectDice(selectedDice:any) {
	return {
		type: SELECT_DICE,
		selectedDice
	};
}

export function saveUserSettings(userSettings:any) {
	return {
		type: SAVE_USER_SETTINGS,
		userSettings
	};
}
