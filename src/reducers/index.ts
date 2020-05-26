import { combineReducers } from 'redux';
import settingsModalReducer from './settingsModalReducer';
import userSettingsReducer from './userSettingsReducer';
import modifierModalReducer from './modifierModalReducer';
import cocModalReducer from './cocModalReducer';
import warhammer4eModalReducer from './warhammer4eModalReducer';
import selectedDiceReducer from './selectedDiceReducer';
import msgReducer from './msgReducer';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
	showSettingsModal: settingsModalReducer,
	showModifierModal: modifierModalReducer,
	showCoCModal: cocModalReducer,
	showWarhammer4eModal: warhammer4eModalReducer,
	userSettings: userSettingsReducer,
	selectedDice: selectedDiceReducer,
	form: formReducer,
	msg: msgReducer
});