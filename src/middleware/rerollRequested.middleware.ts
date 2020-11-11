import {
	REROLL_REQUESTED,
	requestRoll,
	updateRollCounter,
	requestPoolRoll
} from '../actions/roll.actions';

const rerollRequested = (store:any) => (next:any) => (action:any) => {
	if (action.type === REROLL_REQUESTED) {
		const state = store.getState();
		const { itemsToStay } = action.payload
		const { lastRollOptions } = state;

		store.dispatch(updateRollCounter());

		if (lastRollOptions.pool && Object.keys(lastRollOptions.pool).length) {
			store.dispatch(requestPoolRoll({
				pool: lastRollOptions.pool,
				modifier: lastRollOptions.modifier
			}));
		} else {
			store.dispatch(requestRoll({
				...lastRollOptions,
				itemsToStay
			}));
		}
	}
	next(action);
};

export default rerollRequested;
