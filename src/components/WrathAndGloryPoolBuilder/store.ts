import create from 'zustand';
import { D3, D6, WRATH_AND_GLORY_SKILL_TEST } from "../../consts/diceConstants";
import getResultsArray from "../../utils/getResultsArray";
import getRandom from "../../utils/getRandom";

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
	isAdded: boolean;
	style: { [key: string]: string };
}

type State = {
	isModalOpen: boolean;
	isRerolled: boolean;
	areDiceAdded: boolean;
	closeModal: () => void
	rollDice: (pool: Pool, isReroll?: boolean) => void
	getPosition: (positionMax: number) => number
	toggleSelect: (id: number) => void
	setHoverId: (id: number | null) => void
	rerollAll: () => void
	rerollSelected: () => void
	increaseDicePool: (amount: number) => void
	positionMax: number
	results: Result[]
	normalIcons: number
	exaltedIcons: number
	totalIcons: number
	wrathDieResult: number
	positionsTaken: number[]
	selectedIds: number[]
	hoverId: null | number
}

interface GetNewResult {
	val: number;
	id: number;
	position: number;
	isReroll?: boolean;
	isAdded?: boolean;
}

const getNewResult = ({ val, position, isReroll, id, isAdded }: GetNewResult): Result => {
	return {
		val,
		id,
		position,
		isRerolled: Boolean(isReroll),
		isAdded: Boolean(isAdded),
		style: {
			transform: `rotate(${getRandom(90, -90)}deg) scale(.95) translate(${getRandom(5, -5)}px, ${getRandom(5, -5)}px)`
		}
	};
};

const useStore = create<State>(((set, get) => ({
	isModalOpen: false,
	isRerolled: false,
	areDiceAdded: false,
	results: [],
	selectedIds: [],
	normalIcons: 0,
	exaltedIcons: 0,
	totalIcons: 0,
	wrathDieResult: 0,
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

		// @FIXME DICE ADDED DON'T GET UNIQE POSITION
		const position = getUniqePosition()

		set({
			positionsTaken: [...positionsTaken, position]
		});

		return position;
	},
	closeModal: () => set({ isModalOpen: false }),
	rollDice: (pool, isReroll) => {
		const { getPosition } = get();

		// Open modal
		set({
			positionsTaken: [],
			isModalOpen: true,
			isRerolled: false,
			areDiceAdded: false
		});

		const skillDice = pool[WRATH_AND_GLORY_SKILL_TEST]
		const d6 = pool[D6]
		const d3 = pool[D3]

		const results = getResultsArray(6, skillDice, undefined, false);
		const normalIcons = results.filter(val => val === 4 || val === 5).length;
		const exaltedIcons = results.filter(val => val === 6).length;
		const totalIcons = normalIcons + (exaltedIcons * 2);
		const wrathDieResult = results[0];

		const positionMax = results.length + 8;

		// Set results
		set({
			results: results.map((val, index) => getNewResult({
				val,
				id: index,
				position: getPosition(positionMax),
				isReroll
			})),
			normalIcons,
			exaltedIcons,
			totalIcons,
			wrathDieResult,
			positionMax,
			selectedIds: []
		});

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

		set({ isRerolled : true });
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

		set({
			isRerolled: true,
			areDiceAdded: false,
			selectedIds: [],
			results: rerolledResults
		});
	},
	increaseDicePool: (amount) => {
		const { results, getPosition, positionMax, normalIcons, exaltedIcons, totalIcons } = get();

		const diceResults = getResultsArray(6, amount, undefined, false);

		const newNormalIcons = diceResults.filter(val => val === 4 || val === 5).length;
		const newExaltedIcons = diceResults.filter(val => val === 6).length;
		const newTotalIcons = newNormalIcons + (newExaltedIcons * 2);

		const newPositionMax = positionMax + diceResults.length;

		const newResults = diceResults
			.map((val, index) => getNewResult({
				val,
				id: index + 200,
				position: getPosition(newPositionMax),
				isAdded: true
			}));

		set({
			areDiceAdded : true,
			results: results.concat(newResults),
			normalIcons: newNormalIcons + normalIcons,
			exaltedIcons: newExaltedIcons + exaltedIcons,
			totalIcons: newTotalIcons + totalIcons,
			positionMax: positionMax + newResults.length
		});
	},
	setHoverId: (id) => {
		set({
			hoverId: id
		});
	}
})));

export default useStore;
