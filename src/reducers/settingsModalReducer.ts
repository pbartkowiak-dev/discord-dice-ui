import { OPEN_SETTINGS_MODAL, CLOSE_SETTINGS_MODAL } from '../actions';

function settingsModalReducer(state = false, action:any) {
	switch (action.type) {
		case CLOSE_SETTINGS_MODAL:
			return false;
		case OPEN_SETTINGS_MODAL:
			return true;
	}
	return state;
}

export default settingsModalReducer;