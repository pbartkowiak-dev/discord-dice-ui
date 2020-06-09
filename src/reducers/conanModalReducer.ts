import { OPEN_CONAN_MODAL, CLOSE_CONAN_MODAL } from '../actions';

function conanModalReducer(state = false, action:any) {
	switch (action.type) {
		case CLOSE_CONAN_MODAL:
			return false;
		case OPEN_CONAN_MODAL:
			return true;
	}
	return state;
}

export default conanModalReducer;