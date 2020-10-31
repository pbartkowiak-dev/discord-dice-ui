import getDieNumberVal from '../utils/getDieNumberVal';
import { D6_CONAN, D20_CONAN_TEST, D20_CONAN_HL, CONAN } from '../consts/conanConstants';
import { D100_SL, WARHAMMER } from '../consts/warhammerConstants';
import { CLASSIC, D100 } from '../consts/diceConstants';
import { openWarhammerModal, openCoCModal, openConanModal, openModifierModal } from '../actions/modals';
import { storeSelectedDice } from '../actions';
import { requestDiceRoll, ROLL_SUBMITTED } from '../actions/roll.actions';
import rollDice from '../utils/rollDice';

const handleRoll = (store:any) => (next:any) => (action:any) => {
	if (action.type === ROLL_SUBMITTED) {
		const state = store.getState();
		console.log('state', state);
		const diceModuleForm = state.form.diceModuleForm;

		if (diceModuleForm) {
			console.log('diceModuleForm.values', diceModuleForm.values)
			const rollOptions = diceModuleForm.values || {}
			const { diceType, diceAmount } = action.payload;

			store.dispatch(storeSelectedDice({
				diceType,
				diceAmount
			}));

			console.log('diceType, diceAmount', diceType, 'x', diceAmount);

			if (rollOptions.cocMode && diceType === D100) {
				store.dispatch(openCoCModal());
			} else if (diceType === D100_SL) {
				openWarhammerModal();
				store.dispatch(openWarhammerModal())
			} else if (diceType === D20_CONAN_TEST) {
				openConanModal();
			} else if (diceType === D6_CONAN || diceType === D20_CONAN_HL) {
				rollOptions.useModifier = false;
			} else if (rollOptions.useModifier) {
				store.dispatch(openModifierModal());
			} else {

				rollOptions.rerolledTimes = 0;
				rollOptions.diceType = diceType;
				rollOptions.diceTypeNum = getDieNumberVal(diceType);
				rollOptions.diceTypeRaw = diceType;
				rollOptions.diceAmount = diceAmount;
		
				store.dispatch(requestDiceRoll({
					diceType,
					diceAmount,
					rollOptions,
					modifier: 0
				}));

				const result = rollDice({
					diceType,
					diceAmount,
					rollOptions,
					modifier: 0
				});
				
				// const requestMsg = getRequestMsg(result, rollOptions, userSettings);
				// const localMsg = getLocalMsg(result, rollOptions, userSettings);
		
				// showMsgModal(localMsg);
				// request(requestMsg);
			}
		}
	} else {
		next(action);
	}
};

export default handleRoll;
