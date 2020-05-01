import { OPEN_COC_MODAL, CLOSE_COC_MODAL } from '../actions';

function cocModalReducer(state = false, action:any) {
	switch (action.type) {
		case CLOSE_COC_MODAL:
			return false;
		case OPEN_COC_MODAL:
			return true;
	}
	return state;
}

export default cocModalReducer;