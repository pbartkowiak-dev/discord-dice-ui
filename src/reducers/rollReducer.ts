import { ROLL_SUBMITTED } from '../actions/roll.actions';

function rollReducer(state = {}, action:any) {
	switch (action.type) {
		case ROLL_SUBMITTED:
			return {

			};
	}
	return state;
}

export default rollReducer;
