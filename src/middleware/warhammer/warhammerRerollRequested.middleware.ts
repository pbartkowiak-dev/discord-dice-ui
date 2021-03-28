import { updateRollCounter } from '../../actions/roll.actions';
import { WARHAMMER_REROLL_REQUESTED, requestWarhammerRoll } from "../../actions/warhammer.actions";

export default (store :any) => (next :any) => (action :any) => {
	if (action.type === WARHAMMER_REROLL_REQUESTED) {
		const state = store.getState();
		const { lastRollOptions } = state;

		store.dispatch(updateRollCounter());
		store.dispatch(requestWarhammerRoll(lastRollOptions));

	}
	next(action);
};
