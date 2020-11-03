import { combineReducers } from 'redux';
import userSettingsReducer from './userSettingsReducer';
import diceSelectedReducer from './diceSelectedReducer';
import warhammerSlModeReducer from './warhammerSlModeReducer';
import modalsReducer from './modalsReducer';
import msgReducer from './msgReducer';
import { reducer as formReducer } from 'redux-form'
import rollReducer from './rollReducer';

export default combineReducers({
	userSettings: userSettingsReducer,
	diceSelected: diceSelectedReducer,
	warhammerSlMode: warhammerSlModeReducer,
	modalsState: modalsReducer,
	form: formReducer,
	msg: msgReducer,

	roll: rollReducer
});
