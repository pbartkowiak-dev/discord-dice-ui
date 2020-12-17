
import {
	POOL,
	D100_SL,
	D6_CONAN,
	D20_CONAN_TEST,
	D20_CONAN_HL
} from '../consts/diceConstants';
import {
	openWarhammerModal,
	openCoCModal,
	openConanModal,
	openModifierModal,
	openPoolBuilderModal
} from '../actions/modals';
import {
	requestRoll,
	resetRollCounter,
	ROLL_SUBMITTED,
	resetSelectedDice,
	storeSelectedDice,
	requestPoolRoll,
	requestNarrativeDicePoolRoll
} from '../actions/roll.actions';
import { requestL5rRoll } from '../actions/l5r.actions';

export default (store:any) => (next:any) => (action:any) => {
	if (action.type === ROLL_SUBMITTED) {

		store.dispatch(resetRollCounter());
		store.dispatch(resetSelectedDice());

		const state = store.getState();
		const { form : { diceModuleForm } } = state;

		if (diceModuleForm) {
			const formValues = diceModuleForm.values || {}
			const { diceType, diceAmount } = action.payload;

			store.dispatch(storeSelectedDice({
				diceType,
				diceAmount
			}));



			if (action?.payload?.pool && formValues?.l5rMode) {
				store.dispatch(requestL5rRoll({
					...action.payload
				}));
			} else if (action?.payload?.pool && formValues?.narrativeDice) {
				store.dispatch(requestNarrativeDicePoolRoll({
					...action.payload
				}));
			} else if (action?.payload?.pool) {
				store.dispatch(requestPoolRoll({
					...action.payload
				}));
			} else if (formValues.cocMode && diceType === D100_SL) {
				store.dispatch(openCoCModal());
			} else if (formValues.warhammerMode && diceType === D100_SL) {
				openWarhammerModal();
				store.dispatch(openWarhammerModal())
			} else if (diceType === D20_CONAN_TEST) {
				store.dispatch(openConanModal());
			} else if (diceType === D6_CONAN || diceType === D20_CONAN_HL) {
				store.dispatch(requestRoll({
					diceType,
					diceAmount,
					modifier: 0
				}));
			} else if (diceType === POOL) {
				store.dispatch(openPoolBuilderModal());
			} else if (formValues.useModifier) {
				store.dispatch(openModifierModal());
			} else {
				store.dispatch(requestRoll({
					diceType,
					diceAmount,
					modifier: 0
				}));
			}
		}
	} else {
		next(action);
	}
};
