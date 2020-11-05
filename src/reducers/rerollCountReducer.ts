import { ROLL_COUNTER_UPDATED, ROLL_SUBMITTED } from '../actions/roll.actions';

export default(state = 0, action: any) => {
	switch (action.type) {
		case ROLL_COUNTER_UPDATED:
			console.log('REROLL_REQUESTED - COUNTER_UPDATED reducer');
			return state + 1;
			// @TODO ADD PROPER ACTION FOR ZERO THE COUNTER
		case ROLL_SUBMITTED:
			return 0;
	}
	return state;
};
