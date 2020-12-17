import {
	DICE_ROLL_REQUESTED,
	DICE_POOL_ROLL_REQUESTED,
	NARRATIVE_DICE_POOL_ROLL_REQUESTED
} from '../actions/roll.actions';
import { L5R_ROLL_REQUESTED } from '../actions/l5r.actions';

// Remembers last roll options
export default(state = {}, action: any) => {
	if (
		action.type === DICE_ROLL_REQUESTED
		|| action.type === DICE_POOL_ROLL_REQUESTED
		|| action.type === NARRATIVE_DICE_POOL_ROLL_REQUESTED
		|| action.type === L5R_ROLL_REQUESTED
	) {
		return action.payload;
	}
	return state;
};
