import create from 'zustand';
import { TOR_SUCCESS_DIE, TOR_FEAT_DIE, TOR_SKILL_TEST, TorDice } from "../../consts/diceConstants";
import getResultsArray from "../../utils/getResultsArray";
import { requestMsgReady, requestPoolRoll } from "../../actions/roll.actions";
import reduxStore from '../../store';
import { getDiscordMsgData } from "./getDiscordMsgData";
import { EYE_SCORE, GANDALF_SCORE } from "../../consts/torDice";

export type State = {
	openModal: () => void;
	isModalOpen: boolean;
	isResultsModalOpen: boolean;

	openResultsModal: () => void;
	closeModal: () => void;
	closeResultsModal: () => void;

	rollDice: (isRerollingAllDice?: boolean) => void;
	rerollAll: () => void;
	wasAllDiceRerolled: boolean;

	tn: string;
	skillDiceAmount: string;
	isFavoured: boolean;
	isIllFavoured: boolean;
	isWeary: boolean;
	isMiserable: boolean;
	isAdversary: boolean;

	setTn: (tn: string) => void;
	setIsFavoured: (isFavoured: boolean) => void;
	setIsIllFavoured: (isIllFavoured: boolean) => void;
	setIsWeary: (isWeary: boolean) => void;
	setIsMiserable: (isMiserable: boolean) => void;
	setIsAdversary: (isAdversary: boolean) => void;
	setSkillDiceAmount: (skillDiceAmount: string) => void;

	// Results
	isSuccess:  null | boolean;
	featDiceResults: number[];
	skillDiceResults: number[];
	featDieScore: null | number;
	totalDiceScore: null |  number;
}

const useStore = create<State>(((set, get) => ({
	isModalOpen: false,
	isResultsModalOpen: false,
	wasAllDiceRerolled: false,
	tn: '',
	skillDiceAmount: '',
	isFavoured: false,
	isIllFavoured: false,
	isWeary: false,
	isMiserable: false,
	isAdversary: false,

	// Results
	isSuccess: null,
	featDiceResults: [],
	skillDiceResults: [],
	featDieScore: null,
	totalDiceScore: null,

	openModal: () => set({ isModalOpen: true }),
	openResultsModal: () => set({ isResultsModalOpen: true }),

	closeModal: () => set({ isModalOpen: false }),
	closeResultsModal: () => set({ isResultsModalOpen: false }),

	setTn: (tn) => set({ tn }),
	setIsFavoured: (isFavoured) => set({ isFavoured }),
	setIsIllFavoured: (isIllFavoured) => set({ isIllFavoured }),
	setIsWeary: (isWeary) => set({ isWeary }),
	setIsMiserable: (isMiserable) => set({ isMiserable }),
	setIsAdversary: (isAdversary) => set({ isAdversary }),
	setSkillDiceAmount: (skillDiceAmount) => set({ skillDiceAmount }),

	rollDice: () => {
		const {
			tn,
			isFavoured,
			isIllFavoured,
			skillDiceAmount,
			isAdversary,
			isWeary,
			isMiserable,
		} = get();

		const featDiceAmount = isFavoured || isIllFavoured ? 2 : 1;
		const featDiceResults = getResultsArray(12, featDiceAmount, false, false);
		const skillDiceResults = getResultsArray(6, Number(skillDiceAmount), false, false);

		// Get FEAT DICE score
		const FAVOURED_DIE = isAdversary ? EYE_SCORE : GANDALF_SCORE;
		const ILL_FAVOURED_DIE = isAdversary ? GANDALF_SCORE : EYE_SCORE;
		let featDieScore: number;

		if (isFavoured) {
			if (featDiceResults.includes(FAVOURED_DIE) ) {
				featDieScore = FAVOURED_DIE;
			} else {
				featDieScore = Math.max(...featDiceResults);
			}
		} else if (isIllFavoured) {
			if (featDiceResults.includes(ILL_FAVOURED_DIE) ) {
				featDieScore = ILL_FAVOURED_DIE;
			} else {
				featDieScore = Math.min(...featDiceResults);
			}
		} else {
			featDieScore = featDiceResults[0];
		}

		// Get SUCCESS DICE score
		const skillDiceScore = skillDiceResults.reduce((previousValue, currentValue) => {
			if (isWeary && currentValue <= 3) {
				return previousValue;
			}
			return previousValue + currentValue;
		}, 0);

		// Get TOTAL DICE score
		let totalDiceScore: number;

		if (featDieScore === EYE_SCORE || featDieScore == GANDALF_SCORE) {
			totalDiceScore = skillDiceScore;
		} else {
			totalDiceScore = skillDiceScore + featDieScore;
		}

		// Get SUCCESS result
		let isSuccess = totalDiceScore >= Number(tn);

		// Auto failure
		if (isMiserable) {
			if (featDieScore === ILL_FAVOURED_DIE) {
				isSuccess = false;
			}
		}

		// Auto success
		if (featDieScore === FAVOURED_DIE) {
			isSuccess = true;
		}

		// Set results
		set({
			isSuccess,
			featDiceResults,
			skillDiceResults,
			featDieScore,
			totalDiceScore,
			isResultsModalOpen: true,
		});
		//
		// 	reduxStore.dispatch(requestMsgReady(
		// 		getDiscordMsgData({
		// 			results: resultsMapped,
		// 			// skillDice,
		// 			// isRerollingAllDice: !!isRerollingAllDice
		// 		})
		// 	));
		//
		// 	// Numeral die roll
		// } else {
		// 	reduxStore.dispatch(requestPoolRoll({ pool }));
		// }
	},

	rerollAll: () => {
		const { rollDice } = get();

		// rollDice({
		// 		// Added dice cannot be rerolled
		// 		[TOR_SKILL_TEST]: results.length - diceAddedAmount
		// 	},
		// 	true
		// );

		set({ });
	}
})));

export default useStore;
