import { SHOW_MSG } from '../actions';

function msgReducer(state = {
	showMsg: false,
	msgParams: {}
}, action:any) {
	return state;

	switch (action.type) {
		case SHOW_MSG:
			return state;
	return state;
	}
}

export default msgReducer;