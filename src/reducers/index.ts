import { combineReducers } from 'redux';
import userSettings from './userSettingsReducer';
import diceSelected from './diceSelectedReducer';
import warhammerSlMode from './warhammerSlModeReducer';
import modalsState from './modalsReducer';
import msg from './msgReducer';
import { reducer as form } from 'redux-form'
import lastRollOptions from './lastRollOptionsReducer';
import rerollCount from './rerollCountReducer';

export default combineReducers({
	userSettings,
	diceSelected,
	warhammerSlMode,
	modalsState,
	form,
	msg,
	lastRollOptions,
	rerollCount
});
