import { CLOSE_MSG_MODAL } from '../actions/modals';
import { LOCAL_MSG_READY } from '../actions/roll.actions';

function msgReducer(
	state = {
		showMsg: false,
		msgParams: {}
	},
	action: any
) {
	switch (action.type) {
		case LOCAL_MSG_READY:
		console.log('msgReducer', action);
			return {
				...state,
				msgParams: action.payload,
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
