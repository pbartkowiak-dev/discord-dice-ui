import { POOL } from '../consts/diceConstants';
import { D6_CONAN, D20_CONAN_TEST, D20_CONAN_HL } from '../consts/consts';
import { D100_SL } from '../consts/consts';
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
	resetSelectedPool
} from '../actions/roll.actions';

const handleRoll = (store:any) => (next:any) => (action:any) => {
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

			store.dispatch(resetSelectedPool())

			if (action?.payload?.pool) {
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

export default handleRoll;
