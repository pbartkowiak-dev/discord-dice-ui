import { ROLL_COUNTER_UPDATED, ROLL_COUNTER_RESET } from '../actions/roll.actions';
import { L5R_ROLL_REQUESTED, L5R_DICE_REROLLED } from '../actions/l5r.actions';
import { ROLL_AND_KEEP_REROLL_REQUESTED } from '../actions/rollAndKeep.actions';

export default(state = 0, action: any) => {
	switch (action.type) {
		case ROLL_COUNTER_UPDATED:
		case L5R_DICE_REROLLED:
		case ROLL_AND_KEEP_REROLL_REQUESTED:
			return state + 1;
		case ROLL_COUNTER_RESET:
		case L5R_ROLL_REQUESTED:
			return 0;
	}
	return state;
};
