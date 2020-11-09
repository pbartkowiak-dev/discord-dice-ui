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
		const { lastRollOptions, poolSelected } = state;

		console.log('REROLL_REQUESTED', lastRollOptions);

		store.dispatch(updateRollCounter());

		if (poolSelected && Object.keys(poolSelected).length) {
			store.dispatch(requestPoolRoll({
				poolSelected
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
