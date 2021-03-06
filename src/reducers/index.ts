import { combineReducers } from 'redux';
import userSettings from './userSettingsReducer';
import diceSelected from './diceSelectedReducer';
import warhammerState from './warhammerReducer';
import cthulhuState from './cthulhuReducer';
import modalsState from './modalsReducer';
import msg from './msgReducer';
import rollAndKeepData from './rollAndKeepReducer';
import l5rData from './l5rReducer';
import conanData from './conanReducer';
import infinityData from './infinityReducer';
import narrativeDiceData from './narrativeDicereducer';
import { reducer as form } from 'redux-form'
import lastRollOptions from './lastRollOptionsReducer';
import rerollCount from './rerollCountReducer';

export default combineReducers({
	userSettings,
	diceSelected,
	warhammerState,
	cthulhuState,
	modalsState,
	form,
	msg,
	rollAndKeepData,
	l5rData,
	conanData,
	infinityData,
	narrativeDiceData,
	lastRollOptions,
	rerollCount
});
