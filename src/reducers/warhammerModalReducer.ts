import { OPEN_WARHAMMER_MODAL, CLOSE_WARHAMMER_MODAL } from '../actions';

function warhammerModalReducer(state = false, action:any) {
	switch (action.type) {
		case CLOSE_WARHAMMER_MODAL:
			return false;
		case OPEN_WARHAMMER_MODAL:
			return true;
	}
	return state;
}

export default warhammerModalReducer;