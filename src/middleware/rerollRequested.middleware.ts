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
		const { lastRollOptions, poolSelected : pool} = state;

		store.dispatch(updateRollCounter());

		if (pool && Object.keys(pool).length) {
			store.dispatch(requestPoolRoll({
				pool
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
