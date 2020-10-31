
export const SAVE_WARHAMMER_SL_MODE = 'SAVE_WARHAMMER_SL_MODE';
export const SELECT_DICE = 'SELECT_DICE';
export const SAVE_USER_SETTINGS = 'SAVE_USER_SETTINGS';

export function saveWarhammerSlMode(warhammerSlMode:any) {
	return {
		type: SAVE_WARHAMMER_SL_MODE,
		warhammerSlMode
		// payload: warhammerSlMode
	};
}

export function storeSelectedDice(selectedDice:any) {
	return {
		type: SELECT_DICE,
		selectedDice
		// payload: selectedDice
	};
}

export function saveUserSettings(userSettings:any) {
	return {
		type: SAVE_USER_SETTINGS,
		userSettings
		// payload: userSettings
	};
}

