import {
	REROLL_REQUESTED,
	requestRoll,
	updateRollCounter,
	requestPoolRoll,
	requestNarrativeDicePoolRoll
} from '../actions/roll.actions';

const rerollRequested = (store:any) => (next:any) => (action:any) => {
	if (action.type === REROLL_REQUESTED) {
		const state = store.getState();
		const { form : { diceModuleForm } } = state;
		const { lastRollOptions } = state;
		const { itemsToStay } = action.payload
		const formValues = diceModuleForm.values || {}

		store.dispatch(updateRollCounter());
		if (lastRollOptions.pool && formValues?.narrativeDice) {
			store.dispatch(requestNarrativeDicePoolRoll({
				pool: lastRollOptions.pool
			}));
		} else if (lastRollOptions.pool && Object.keys(lastRollOptions.pool).length) {
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
