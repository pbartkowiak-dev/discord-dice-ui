import {
	REROLL_REQUESTED,
	requestRoll,
	updateRollCounter
} from '../actions/roll.actions';

const rerollRequested = (store:any) => (next:any) => (action:any) => {
	if (action.type === REROLL_REQUESTED) {
		const state = store.getState();
		const { itemsToStay } = action.payload
		const { lastRollOptions } = state;

		store.dispatch(updateRollCounter());

		store.dispatch(requestRoll({
			...lastRollOptions,
			itemsToStay
		}));

	}
	next(action);
};

export default rerollRequested;
