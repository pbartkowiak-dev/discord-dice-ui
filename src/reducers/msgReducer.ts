import { OPEN_MSG_MODAL, CLOSE_MSG_MODAL } from '../actions/modals';

function msgReducer(state = {
	showMsg: false,
	msgParams: {}
}, action:any) {
	switch (action.type) {
		case OPEN_MSG_MODAL:
			return {
				...state,
				msgParams: action.msgParams,
				showMsg: true
			};
		case CLOSE_MSG_MODAL:
			return {
				msgParams: {},
				showMsg: false
			};
	}
	return state;

}

export default msgReducer;
