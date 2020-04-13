import { OPEN_MODIFIER_MODAL, CLOSE_MODIFIER_MODAL } from '../actions';

function modifierModalReducer(state = false, action:any) {
	switch (action.type) {
		case CLOSE_MODIFIER_MODAL:
			return false;
		case OPEN_MODIFIER_MODAL:
			return true;
	}
	return state;
}

export default modifierModalReducer;