import create from 'zustand';
import { WRATH_AND_GLORY_SKILL_TEST } from "../../consts/diceConstants";
import getResultsArray from "../../utils/getResultsArray";
import getRandom from "../../utils/getRandom";
import { requestMsgReady, requestPoolRoll } from "../../actions/roll.actions";
import reduxStore from '../../store';
import { getDiscordMsgData } from "./getDiscordMsgData";

interface Pool {
	WRATH_AND_GLORY_SKILL_TEST?: number;
	d6?: number
	d3?: number
}

export interface Result {
	id: number;
	val: number;
	position: number;
	isRerolled: boolean;
	isWrathDie?: boolean;
	isAdded: boolean;
	style: { [key: string]: string };
}

type State = {
	isModalOpen: boolean;
	wasAllDiceRerolled: boolean;
	areDiceAdded: boolean;
	wrathDiceNumber: number;
	closeModal: () => void
	rollDice: (pool: Pool, isRerollingAllDice?: boolean) => void
	getPosition: (positionMax: number) => number
	toggleSelect: (id: number) => void
	setHoverId: (id: number | null) => void
	setWrathDiceNumber: (wrathDiceNumber: number) => void
	rerollAll: () => void
	rerollSelected: () => void
	increaseDicePool: (amount: number) => void
	positionMax: number
	results: Result[]
	normalIcons: number
	exaltedIcons: number
	totalIcons: number
	wrathDieResults: number[]
	positionsTaken: number[]
	selectedIds: number[]
	hoverId: null | number
}

interface GetNewResult {
	val: number;
	id: number;
	position: number;
	isAdded?: boolean;
	isWrathDie?: boolean;
}

const getNewResult = ({ val, position, id, isAdded, isWrathDie = false }: GetNewResult): Result => {
	return {
		val,
		id,
		position,
		isRerolled: false,
		isWrathDie,
		isAdded: Boolean(isAdded),
		style: {
			transform: `rotate(${getRandom(90, -90)}deg) scale(.95) translate(${getRandom(5, -5)}px, ${getRandom(5, -5)}px)`
		}
	};
};

const useStore = create<State>(((set, get) => ({
	isModalOpen: false,
	wasAllDiceRerolled: false,
	areDiceAdded: false,
	wrathDiceNumber: 1,
	results: [],
	selectedIds: [],
	normalIcons: 0,
	exaltedIcons: 0,
	totalIcons: 0,
	wrathDieResults: [],
	positionMax: 0,
	hoverId: null,
	positionsTaken: [],
	getPosition: (positionMax) => {
		const { positionsTaken } = get();

		const getUniqePosition = (): number => {
			const position = getRandom(positionMax, 0);
			if (positionsTaken.includes(position)) {
				return getUniqePosition();
			}
			return position;
		}

		const position = getUniqePosition();

		set({
			positionsTaken: [...positionsTaken, position]
		});

		return position;
	},
	closeModal: () => set({ isModalOpen: false }),
	rollDice: (pool, isRerollingAllDice) => {
		const { getPosition, wrathDiceNumber } = get();

		// Prepere modal for results
		set({
			positionsTaken: [],
			wasAllDiceRerolled: false,
			areDiceAdded: false
		});

		const skillDice = pool[WRATH_AND_GLORY_SKILL_TEST]

		// Skill test
		if (skillDice) {
			const results = getResultsArray(6, skillDice, undefined, false);
			const normalIcons = results.filter(val => val === 4 || val === 5).length;
			const exaltedIcons = results.filter(val => val === 6).length;
			const totalIcons = normalIcons + (exaltedIcons * 2);
			// X first dice are designated as Wrath Dice
			const wrathDieResults = results.slice(0, wrathDiceNumber);

			const positionMax = results.length + 8;
			const resultsMapped = results.map((val, index) => getNewResult({
				val,
				id: index,
				position: getPosition(positionMax),
				isWrathDie: index + 1 <= wrathDiceNumber
			}));

			// Set results
			set({
				results: resultsMapped,
				normalIcons,
				exaltedIcons,
				totalIcons,
				wrathDieResults,
				positionMax,
				isModalOpen: true,
				selectedIds: []
			});

			reduxStore.dispatch(requestMsgReady(
				getDiscordMsgData({
					results: resultsMapped,
					totalIcons,
					exaltedIcons,
					normalIcons,
					wrathDieResults,
					skillDice,
					isRerollingAllDice: !!isRerollingAllDice
				})
			));

		// Numeral die roll
		} else {
			reduxStore.dispatch(requestPoolRoll({ pool }));
		}
	},
	toggleSelect: (id) => {
		const { selectedIds, results } = get();

		// Added dice cannot be rerolled
		if (!results.find(result => result.id === id && result.isAdded)) {
			if (selectedIds.includes(id)) {
				set({
					selectedIds: selectedIds.filter(i => i !== id)
				});
			} else {
				set({
					selectedIds: [...selectedIds, id]
				});
			}
		}
	},
	rerollAll: () => {
		const { rollDice, results } = get();
		const diceAddedAmount = results.filter(result => result.isAdded).length;

		rollDice({
				// Added dice cannot be rerolled
				[WRATH_AND_GLORY_SKILL_TEST]: results.length - diceAddedAmount
			},
			true
		);

		set({ wasAllDiceRerolled: true, areDiceAdded: false });
	},
	rerollSelected: () => {
		const { results, selectedIds } = get();

		const rerolledResults = results.map(result => {
			const newResult = { ...result };
			if (selectedIds.includes(newResult.id)) {
				newResult.val = getResultsArray(6)[0];
				newResult.isRerolled = true;
			}
			return newResult;
		});

		const normalIcons = rerolledResults.filter(({ val }) => val === 4 || val === 5).length;
		const exaltedIcons = rerolledResults.filter(({ val }) => val === 6).length;
		const totalIcons = normalIcons + (exaltedIcons * 2);
		const wrathDieResults = rerolledResults.filter(result => result.isWrathDie).map(result => result.val);

		reduxStore.dispatch(requestMsgReady(
			getDiscordMsgData({
				results: rerolledResults,
				totalIcons,
				exaltedIcons,
				normalIcons,
				wrathDieResults,
				skillDice: rerolledResults.length,
				diceSelectedToReroll: selectedIds.length
			})
		));

		set({
			selectedIds: [],
			wasAllDiceRerolled: false,
			results: rerolledResults,
			wrathDieResults,
			normalIcons,
			exaltedIcons,
			totalIcons
		});
	},
	increaseDicePool: (amount) => {
		const { results, getPosition, positionMax, normalIcons, exaltedIcons, totalIcons, wrathDieResults } = get();

		const addedDiceResults = getResultsArray(6, amount, undefined, false);

		const newNormalIcons = addedDiceResults.filter(val => val === 4 || val === 5).length;
		const newExaltedIcons = addedDiceResults.filter(val => val === 6).length;
		const newTotalIcons = newNormalIcons + (newExaltedIcons * 2);

		const newPositionMax = positionMax + addedDiceResults.length;

		const newResults = addedDiceResults
			.map((val, index) => getNewResult({
				val,
				id: index + 500,
				position: getPosition(newPositionMax),
				isAdded: true
			}));

		const resultsJoined = results.concat(newResults);
		const normalIconsSum = newNormalIcons + normalIcons;
		const totalIconsSum = newTotalIcons + totalIcons;
		const exaltedIconSum = newExaltedIcons + exaltedIcons;

		reduxStore.dispatch(requestMsgReady(
			getDiscordMsgData({
				results: resultsJoined,
				normalIcons: normalIconsSum,
				totalIcons: totalIconsSum,
				exaltedIcons: exaltedIconSum,
				wrathDieResults,
				diceAdded: amount,
				diceAddedResults: newResults,
			})
		));

		set({
			areDiceAdded : true,
			results: resultsJoined,
			normalIcons: normalIconsSum,
			exaltedIcons: exaltedIconSum,
			totalIcons: totalIconsSum,
			positionMax: positionMax + newResults.length
		});
	},
	setHoverId: (id) => {
		set({
			hoverId: id
		});
	},
	setWrathDiceNumber: (wrathDiceNumber) => {
		set({ wrathDiceNumber })
	}
})));

export default useStore;
