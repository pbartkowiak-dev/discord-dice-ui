import {
	POOL,
	D100_SL,
	D6_CONAN,
	D20_CONAN_TEST,
	D20_CONAN_HL,
	CONAN_TOKENS,
	D6_INFINITY,
	D20_INFINITY_TEST,
	D20_INFINITY_HL,
	INFINITY_TOKENS,
	NARRATIVE_TOKENS,
	WARHAMMER_MONEY,
	CTHULHU_SHEET_MODAL,
	COMBAT_TRACKER
} from '../consts/diceConstants';
import {
	openConanModal,
	openInfinityModal,
	openModifierModal,
	openPoolBuilderModal,
	openWarhammerMoneyModal
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
import { requestRollAndKeepRoll } from '../actions/rollAndKeep.actions';
import { requestL5rRoll } from '../actions/l5r.actions';
import { openConanTokensModal } from '../actions/conan.actions';
import { openInfinityTokensModal } from '../actions/infinity.actions';
import { openNarrativeTokensModal } from '../actions/narrativeDice.actions';
import { openWarhammerModal } from "../actions/warhammer.actions";
import { openCthulhuModal, openCthulhuSheetModal } from '../actions/cthulhu.actions';
import useCombatTrackerStore from "../components/CombatTracker/store";

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
			if (action?.payload?.pool && formValues.rollAndKeepMode) {
				store.dispatch(requestRollAndKeepRoll({
					...action.payload
				}));
			} else if (action?.payload?.pool && formValues.l5rMode) {
				store.dispatch(requestL5rRoll({
					...action.payload
				}));
			} else if (action?.payload?.pool && formValues.narrativeDice) {
				store.dispatch(requestNarrativeDicePoolRoll({
					...action.payload
				}));
			} else if (action?.payload?.pool) {
				store.dispatch(requestPoolRoll({
					...action.payload
				}));
			} else if (diceType === COMBAT_TRACKER) {
				// @ts-ignore
				useCombatTrackerStore.setState({ isModalOpen: true });
			} else if (formValues.cthulhuMode && diceType === D100_SL) {
				store.dispatch(openCthulhuModal());
			} else if (formValues.warhammerMode && diceType === D100_SL) {
				store.dispatch(openWarhammerModal())
			} else if (diceType === D20_CONAN_TEST) {
				store.dispatch(openConanModal());
			} else if (diceType === D20_INFINITY_TEST) {
				store.dispatch(openInfinityModal());
			} else if (diceType === D6_CONAN || diceType === D20_CONAN_HL) {
				store.dispatch(requestRoll({
					diceType,
					diceAmount,
					modifier: 0
				}));
			} else if (diceType === D6_INFINITY || diceType === D20_INFINITY_HL) {
				store.dispatch(requestRoll({
					diceType,
					diceAmount,
					modifier: 0
				}));
			} else if (diceType === POOL) {
				store.dispatch(openPoolBuilderModal());
			} else if (diceType === CONAN_TOKENS) {
				store.dispatch(openConanTokensModal());
			} else if (diceType === INFINITY_TOKENS) {
				store.dispatch(openInfinityTokensModal());
			} else if (diceType === NARRATIVE_TOKENS) {
				store.dispatch(openNarrativeTokensModal());
			} else if (diceType === WARHAMMER_MONEY) {
				store.dispatch(openWarhammerMoneyModal());
			} else if (diceType === CTHULHU_SHEET_MODAL) {
				store.dispatch(openCthulhuSheetModal());
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
