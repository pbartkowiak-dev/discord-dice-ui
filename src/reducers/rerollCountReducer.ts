import { ROLL_COUNTER_UPDATED, ROLL_COUNTER_RESET } from '../actions/roll.actions';

export default(state = 0, action: any) => {
	switch (action.type) {
		case ROLL_COUNTER_UPDATED:
			return state + 1;
		case ROLL_COUNTER_RESET:
			return 0;
	}
	return state;
};
