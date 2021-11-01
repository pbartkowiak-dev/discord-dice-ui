import create from 'zustand';
import { TOR_SKILL_DIE, TOR_FEAT_DIE, TOR_SKILL_TEST, TorDice } from "../../consts/diceConstants";
import getResultsArray from "../../utils/getResultsArray";
import getRandom from "../../utils/getRandom";
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

export interface Result {
	id: number;
	val: number;
	isRerolled: boolean;
	type: TorDice;
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
	rerollSelected: () => void;
	results: Result[];
	selectedIds: number[];
	wasAllDiceRerolled: boolean;
}

interface GetNewResult {
	id: number;
	val: number;
	isFeatDie?: boolean;
}

const getNewResult = ({ val, id, isFeatDie }: GetNewResult): Result => {
	return {
		val,
		id,
		isRerolled: false,
		type: isFeatDie ? TOR_FEAT_DIE : TOR_SKILL_DIE,
	};
};

const useStore = create<State>(((set, get) => ({
	isModalOpen: false,
	isResultsModalOpen: false,
	results: [],
	selectedIds: [],
	wasAllDiceRerolled: false,

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
		// const skillDice = pool[TOR_SKILL_TEST];
		//
		// // Skill test
		// if (skillDice) {
			const featDiceAmount = isFavoured || isIllFavoured ? 2 : 1;
			const featDiceResults = getResultsArray(12, featDiceAmount, false, false);
			const skillDiceResults = getResultsArray(6, skillDiceAmount, false, false);

			// Get FEAT DICE score
			let featDiceScore: number;

			if (isFavoured) {
				featDiceScore = Math.max(...featDiceResults);
			} else if (isIllFavoured) {
				featDiceScore = Math.min(...featDiceResults);
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

		//
		// 	const resultsMapped = results.map((val, id) => getNewResult({ val, id  }));
		//
		// 	// Set results
		// 	set({
		// 		results: resultsMapped,
		// 		isModalOpen: true,
		// 		selectedIds: []
		// 	});
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
	toggleSelect: (id: number) => {
		const { selectedIds } = get();

		if (selectedIds.includes(id)) {
			set({
				selectedIds: selectedIds.filter(i => i !== id)
			});
		} else {
			set({
				selectedIds: [...selectedIds, id]
			});
		}

	},
	rerollAll: () => {
		const { rollDice, results } = get();

		// rollDice({
		// 		// Added dice cannot be rerolled
		// 		[TOR_SKILL_TEST]: results.length - diceAddedAmount
		// 	},
		// 	true
		// );

		set({ });
	},
	rerollSelected: () => {
		const { results, selectedIds } = get();

		// const rerolledResults = results.map(result => {
		// 	const newResult = { ...result };
		// 	if (selectedIds.includes(newResult.id)) {
		// 		newResult.val = getResultsArray(6)[0];
		// 		newResult.isRerolled = true;
		// 	}
		// 	return newResult;
		// });
		//
		// reduxStore.dispatch(requestMsgReady(
		// 	getDiscordMsgData({
		// 		results: rerolledResults,
		// 		skillDice: rerolledResults.length,
		// 		diceSelectedToReroll: selectedIds.length
		// 	})
		// ));
		//
		// set({
		// 	selectedIds: [],
		// 	wasAllDiceRerolled: false,
		// 	results: rerolledResults,
		// });
	},
})));

export default useStore;
