import { REROLL_REQUESTED, requestRoll, updateRollCounter } from '../actions/roll.actions';

const rerollRequested = (store:any) => (next:any) => (action:any) => {
	if (action.type === REROLL_REQUESTED) {
		const state = store.getState();
		const { form : { diceModuleForm } } = state;
		const { itemsToStay } = action.payload
		const formValues = diceModuleForm?.values || {};
		const { lastRollOptions } = state;

		store.dispatch(updateRollCounter());

		console.log('REROLL_REQUESTED middleware');
		store.dispatch(requestRoll({
			...lastRollOptions,
			itemsToStay
		}));

		// if (formValues.warhammerMode) {
		// 	store.dispatch(requestRoll({
		// 		diceType : D100_SL,
		// 		...action.payload
		// 	}));
		// } else if (formValues.conanMode && !(formValues.diceTypeRaw === D6_CONAN)) {
		// 	store.dispatch(requestRoll({
		// 		diceType: D20_CONAN,
		// 		diceAmount: Number(formValues.diceAmount),
		// 		itemsToStay,
		// 		...action.payload,
		// 		fortune: 0
		// 	}));

		// } else {
		// 	store.dispatch(requestRoll({
		// 		diceType: formValues.diceType,
		// 		diceAmount: Number(formValues.diceAmount) || 1,
		// 		itemsToStay,
		// 		...action.payload
		// 	}));
		// }
	}
	next(action);
};

export default rerollRequested;
