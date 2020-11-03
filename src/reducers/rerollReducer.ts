import { CLOSE_MSG_MODAL } from '../actions/modals';
import { REROLL_REQUESTED } from '../actions/roll.actions';

export default(state = 0, action: any) => {
	switch (action.type) {
		case REROLL_REQUESTED:
			return state + 1;
			// @TODO ADD PROPER ACTION FOR ZERO THE COUNTER
		case CLOSE_MSG_MODAL:
			return 0;
	}
	return state;
};
