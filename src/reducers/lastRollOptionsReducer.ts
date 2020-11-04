import { DICE_ROLL_REQUESTED } from '../actions/roll.actions';

// Remembers last roll options
export default(state = {}, action: any) => {
	if (action.type === DICE_ROLL_REQUESTED) {
		console.log('REDUCER action', action);
		return action.payload;
	}
	return state;
};
