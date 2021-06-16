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
}

type State = {
	isModalOpen: boolean;
	closeModal: () => void
	rollDice: (pool: Pool) => void
	getPosition: (positionMax: number) => number
	toggleSelect: (id: number) => void
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
	rollDice: (pool: Pool) => {
		const store = get();

		const skillDice = pool[WRATH_AND_GLORY_SKILL_TEST]
		const d6 = pool[D6]
		const d3 = pool[D3]

		const results = getResultsArray(6, skillDice, undefined, false);
		const normalIcons = results.filter(val => val === 4 || val === 5).length;
		const exaltedIcons = results.filter(val => val === 6).length;
		const totalIcons = normalIcons + (exaltedIcons * 2);
		const wrathDieResult = results[0];

		console.log('results', results)
		console.log('normalIcons', normalIcons)
		console.log('exaltedIcons', exaltedIcons)
		console.log('totalIcons', totalIcons)
		console.log('wrathDieResult', wrathDieResult)
		console.log('get()', store)

		const positionMax = results.length + 8;

		set({
			results: results.map((val, id) => ({ val, id, position: store.getPosition(positionMax) })),
			normalIcons,
			exaltedIcons,
			totalIcons,
			wrathDieResult,
			positionMax,
			positionsTaken: [],
			isModalOpen: true
		})
	},
	toggleSelect: (id) => {
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
	}

})));

export default useStore;
