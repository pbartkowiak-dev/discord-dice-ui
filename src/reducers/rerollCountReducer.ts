import { ROLL_COUNTER_UPDATED, ROLL_COUNTER_RESET } from '../actions/roll.actions';
import { L5R_ROLL_REQUESTED, L5R_DICE_REROLLED } from '../actions/l5r.actions';

export default(state = 0, action: any) => {
	switch (action.type) {
		case ROLL_COUNTER_UPDATED:
		case L5R_DICE_REROLLED:
			return state + 1;
		case ROLL_COUNTER_RESET:
		case L5R_ROLL_REQUESTED:
			return 0;
	}
	return state;
};
