import { D6_CONAN, D20_CONAN_TEST, D20_CONAN_HL } from '../consts/conanConstants';
import { D100_SL } from '../consts/warhammerConstants';
import {  D100 } from '../consts/diceConstants';
import { openWarhammerModal, openCoCModal, openConanModal, openModifierModal } from '../actions/modals';
import { storeSelectedDice } from '../actions';
import { requestDiceRoll, ROLL_SUBMITTED } from '../actions/roll.actions';

const handleRoll = (store:any) => (next:any) => (action:any) => {
	if (action.type === ROLL_SUBMITTED) {
		const state = store.getState();
		const { form : { diceModuleForm } } = state;

		if (diceModuleForm) {
			console.log('diceModuleForm.values', diceModuleForm.values)
			const formValues = diceModuleForm.values || {}
			const { diceType, diceAmount } = action.payload;

			store.dispatch(storeSelectedDice({
				diceType,
				diceAmount
			}));

			console.log('diceType, diceAmount', diceType, 'x', diceAmount);

			if (formValues.cocMode && diceType === D100) {
				store.dispatch(openCoCModal());
			} else if (diceType === D100_SL) {
				openWarhammerModal();
				store.dispatch(openWarhammerModal())
			} else if (diceType === D20_CONAN_TEST) {
				openConanModal();
			} else if (diceType === D6_CONAN || diceType === D20_CONAN_HL) {
				formValues.useModifier = false;
			} else if (formValues.useModifier) {
				store.dispatch(openModifierModal());
			} else {

				formValues.rerolledTimes = 0;
		
				store.dispatch(requestDiceRoll({
					diceType,
					diceAmount,
					modifier: 0,
					rerolledTimes: 0
				}));
			}
		}
	} else {
		next(action);
	}
};

export default handleRoll;
