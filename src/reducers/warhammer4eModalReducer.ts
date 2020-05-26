import { OPEN_WARHAMMER4E_MODAL, CLOSE_WARHAMMER4E_MODAL } from '../actions';

function warhammer4eModalReducer(state = false, action:any) {
	switch (action.type) {
		case CLOSE_WARHAMMER4E_MODAL:
			return false;
		case OPEN_WARHAMMER4E_MODAL:
			return true;
	}
	return state;
}

export default warhammer4eModalReducer;