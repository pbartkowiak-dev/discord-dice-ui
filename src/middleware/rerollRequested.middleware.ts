import { REROLL_REQUESTED, requestRoll } from '../actions/roll.actions';
import { D6_CONAN } from '../consts/conanConstants';

const roll = (store:any) => (next:any) => (action:any) => {
	if (action.type === REROLL_REQUESTED) {
		const state = store.getState();
		const { form : { diceModuleForm } } = state;
		const { itemsToStay } = action.payload
		const formValues = diceModuleForm?.values || {};

		console.log('REROLL_REQUESTED', action.payload, diceModuleForm, itemsToStay);

		if (formValues.warhammerMode) {
			store.dispatch(requestRoll({
				diceType : 100,
				...action.payload
			}));
		} else if (formValues.conanMode && !(formValues.diceTypeRaw === D6_CONAN)) {
			store.dispatch(requestRoll({
				diceType: 20,
				diceAmount: Number(formValues.dice),
				itemsToStay,
				...action.payload,
				fortune: 0
			}));

		} else {
			store.dispatch(requestRoll({
				diceType: formValues.diceType,
				diceAmount: Number(formValues.diceAmount) || 1,
				itemsToStay,
				...action.payload
			}));
		}
	}
	next(action);
};

export default roll;
