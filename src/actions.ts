
export const SAVE_WARHAMMER_SL_MODE = 'SAVE_WARHAMMER_SL_MODE';
export const DICE_SELECTED = 'DICE_SELECTED';
export const SAVE_USER_SETTINGS = 'SAVE_USER_SETTINGS';

export function saveWarhammerSlMode(warhammerSlMode:any) {
	return {
		type: SAVE_WARHAMMER_SL_MODE,
		warhammerSlMode
		// payload: warhammerSlMode
	};
}

export function storeSelectedDice(payload: any) {
	return {
		type: DICE_SELECTED,
		payload
	};
}

export function saveUserSettings(userSettings:any) {
	return {
		type: SAVE_USER_SETTINGS,
		userSettings
		// payload: userSettings
	};
}

