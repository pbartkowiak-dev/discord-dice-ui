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
}

type State = {
	isModalOpen: boolean;
	isRerolled: boolean
	closeModal: () => void
	rollDice: (pool: Pool, isReroll?: boolean) => void
	getPosition: (positionMax: number) => number
	toggleSelect: (id: number) => void
	rerollAll: () => void
	rerollSelected: () => void
	positionMax: number
	results: Result[]
	normalIcons: number
	exaltedIcons: number
	totalIcons: number
	wrathDieResult: number
	positionsTaken: number[]
	selectedIds: number[]
}

const useStore = create<State>(((set, get) => ({
	isModalOpen: false,
	isRerolled: false,
	results: [],
	selectedIds: [],
	normalIcons: 0,
	exaltedIcons: 0,
	totalIcons: 0,
	wrathDieResult: 0,
	positionMax: 0,
	positionsTaken: [],
	getPosition: (positionMax) => {
		const store = get();

		const getUniqePosition = (): number => {
			let position = getRandom(positionMax, 0);
			if (store.positionsTaken.includes(position)) {
				return getUniqePosition();
			}
			return position;
		}

		const position = getUniqePosition()

		set({
			positionsTaken: [...store.positionsTaken, position]
		});

		return position;
	},
	closeModal: () => set({ isModalOpen: false }),
	rollDice: (pool, isReroll) => {
		const store = get();

		const skillDice = pool[WRATH_AND_GLORY_SKILL_TEST]
		const d6 = pool[D6]
		const d3 = pool[D3]

		const results = getResultsArray(6, skillDice, undefined, false);
		const normalIcons = results.filter(val => val === 4 || val === 5).length;
		const exaltedIcons = results.filter(val => val === 6).length;
		const totalIcons = normalIcons + (exaltedIcons * 2);
		const wrathDieResult = results[0];

		const positionMax = results.length + 8;

		set({
			results: results.map((val, id) => ({
				val,
				id,
				position: store.getPosition(positionMax),
				isRerolled: Boolean(isReroll),
				isAdded: false
			})),
			normalIcons,
			exaltedIcons,
			totalIcons,
			wrathDieResult,
			positionMax,
			positionsTaken: [],
			selectedIds: [],
			isModalOpen: true,
			isRerolled: false
		})
	},
	toggleSelect: (id) => {
		const { selectedIds, isRerolled } = get();

		if (!isRerolled) {
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
		const store = get();

		store.rollDice({
				[WRATH_AND_GLORY_SKILL_TEST]: store.results.length
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
			isRerolled : true,
			selectedIds: [],
			results: rerolledResults
		});
	},
})));

export default useStore;
