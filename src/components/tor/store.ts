import create from 'zustand';
import { TOR_SKILL_DIE, TOR_FEAT_DIE, TOR_SKILL_TEST } from "../../consts/diceConstants";
import getResultsArray from "../../utils/getResultsArray";
import getRandom from "../../utils/getRandom";
import { requestMsgReady, requestPoolRoll } from "../../actions/roll.actions";
import reduxStore from '../../store';
import { getDiscordMsgData } from "./getDiscordMsgData";

interface Pool {
	TOR_SKILL_TEST?: number;
	d6?: number
}

type TOR_DICE = 'TOR_SKILL_DIE' | 'TOR_FEAT_DIE'

export interface Result {
	id: number;
	val: number;
	isRerolled: boolean;
	type: TOR_DICE;
}

type State = {
	openModal: () => void;
	isModalOpen: boolean;
	isResultsModalOpen: boolean;

	openResultsModal: () => void;
	closeModal: () => void;
	closeResultsModal: () => void;

	rollDice: (pool: Pool, isRerollingAllDice?: boolean) => void;
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

	rollDice: (pool, isRerollingAllDice) => {
		const skillDice = pool[TOR_SKILL_TEST];

		// Skill test
		if (skillDice) {
			const results = getResultsArray(6, skillDice, undefined, false);

			const resultsMapped = results.map((val, id) => getNewResult({ val, id  }));

			// Set results
			set({
				results: resultsMapped,
				isModalOpen: true,
				selectedIds: []
			});

			reduxStore.dispatch(requestMsgReady(
				getDiscordMsgData({
					results: resultsMapped,
					// skillDice,
					// isRerollingAllDice: !!isRerollingAllDice
				})
			));

			// Numeral die roll
		} else {
			reduxStore.dispatch(requestPoolRoll({ pool }));
		}
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
