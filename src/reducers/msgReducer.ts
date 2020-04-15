import { SHOW_MSG, HIDE_MSG } from '../actions';

function msgReducer(state = {
	showMsg: false,
	msgParams: {}
}, action:any) {
	switch (action.type) {
		case SHOW_MSG:
			return {
				...state,
				msgParams: action.msgParams,
				showMsg: true
			};
		case HIDE_MSG:
			return {
				msgParams: {},
				showMsg: false
			};
	}
	return state;

}

export default msgReducer;