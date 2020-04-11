import { combineReducers } from 'redux';
import settingsModalReducer from './settingsModalReducer';
import userSettingsReducer from './userSettingsReducer';
import msgReducer from './msgReducer';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
	showSettingsModal: settingsModalReducer,
	userSettings: userSettingsReducer,
	form: formReducer,
	msg: msgReducer
});