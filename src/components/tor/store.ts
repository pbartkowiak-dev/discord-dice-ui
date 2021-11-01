import create from 'zustand';
import { TOR_SKILL_DIE, TOR_FEAT_DIE, TOR_SKILL_TEST, TorDice } from "../../consts/diceConstants";
import getResultsArray from "../../utils/getResultsArray";
import { requestMsgReady, requestPoolRoll } from "../../actions/roll.actions";
import reduxStore from '../../store';
import { getDiscordMsgData } from "./getDiscordMsgData";
import { EYE_SCORE, GANDALF_SCORE } from "../../consts/torDice";

export interface SkillRoll {
	tn: number;
	skillDiceAmount: number;
	isFavoured: boolean;
	isIllFavoured: boolean;
	isWeary: boolean;
	isMiserable: boolean;
	isAdversary: boolean;
}

export type State = {
	openModal: () => void;
	isModalOpen: boolean;
	isResultsModalOpen: boolean;

	openResultsModal: () => void;
	closeModal: () => void;
	closeResultsModal: () => void;

	rollDice: (skillRoll: SkillRoll, isRerollingAllDice?: boolean) => void;
	rerollAll: () => void;
	wasAllDiceRerolled: boolean;

	// Results
	isSuccess:  null | boolean;
	featDiceResults: null | number[];
	skillDiceResults: null | number[];
	featDiceScore: null | number;
	skillDiceScore: null | number;
	totalDiceScore: null |  number;
}

const useStore = create<State>(((set, get) => ({
	isModalOpen: false,
	isResultsModalOpen: false,
	results: [],
	wasAllDiceRerolled: false,

	// Results
	isSuccess: null,
	featDiceResults: null,
	skillDiceResults: null,
	featDiceScore: null,
	skillDiceScore: null,
	totalDiceScore: null,

	openModal: () => set({ isModalOpen: true }),
	openResultsModal: () => set({ isResultsModalOpen: true }),

	closeModal: () => set({ isModalOpen: false }),
	closeResultsModal: () => set({ isResultsModalOpen: false }),

	rollDice: ({
		tn,
		skillDiceAmount,
		isFavoured,
		isIllFavoured,
		isWeary,
		isMiserable,
		isAdversary}) => {

			const featDiceAmount = isFavoured || isIllFavoured ? 2 : 1;
			const featDiceResults = getResultsArray(12, featDiceAmount, false, false);
			const skillDiceResults = getResultsArray(6, skillDiceAmount, false, false);

			// Get FEAT DICE score
			let featDiceScore: number;

			if (isFavoured) {
				if (isAdversary && featDiceResults.includes(EYE_SCORE) ) {
					featDiceScore = EYE_SCORE;
				} else if (!isAdversary && featDiceResults.includes((GANDALF_SCORE))) {
					featDiceScore = GANDALF_SCORE;
				} else {
					featDiceScore = Math.max(...featDiceResults);
				}
			} else if (isIllFavoured) {
				if (isAdversary && featDiceResults.includes(GANDALF_SCORE) ) {
					featDiceScore = GANDALF_SCORE;
				} else if (!isAdversary && featDiceResults.includes((EYE_SCORE))) {
					featDiceScore = EYE_SCORE;
				} else {
					featDiceScore = Math.min(...featDiceResults);
				}
			} else {
				featDiceScore = featDiceResults[0];
			}

			// Get SKILL DICE score
			const skillDiceScore = skillDiceResults.reduce((previousValue, currentValue) => {
				if (isWeary && currentValue <= 3) {
					return previousValue;
				}
				return previousValue + currentValue;
			}, 0);

			// Get TOTAL DICE score
			let totalDiceScore: number;

			if (featDiceScore === EYE_SCORE || featDiceScore == GANDALF_SCORE) {
				totalDiceScore = skillDiceScore;
			} else {
				totalDiceScore = skillDiceScore + featDiceScore;
			}

			// Get SUCCESS result
			let isSuccess = totalDiceScore >= tn;

			// Auto failure
			if (isMiserable) {
				if (!isAdversary && featDiceScore === EYE_SCORE) {
					isSuccess = false;
				}
				if (isAdversary && featDiceScore === GANDALF_SCORE) {
					isSuccess = false;
				}
			}

			// Auto success
			if (!isAdversary && featDiceScore === GANDALF_SCORE) {
				isSuccess = true;
			} else if (isAdversary && featDiceScore === EYE_SCORE) {
				isSuccess = true;
				// Normal success calculation
			}

			// Set results
			set({
				isSuccess,
				featDiceResults,
				skillDiceResults,
				featDiceScore,
				skillDiceScore,
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
