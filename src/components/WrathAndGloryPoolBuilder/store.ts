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
	openModal: () => void
	closeModal: () => void
	rollDice: (pool: Pool) => void
	getPosition: () => number
	results: Result[]
	normalIcons: number
	exaltedIcons: number
	totalIcons: number
	wrathDieResult: number
	positionsTaken: number[]
}

const positionMin = 0;
export const positionMax = 35;

const useStore = create<State>(((set, get) => ({
	isModalOpen: false,
	results: [],
	normalIcons: 0,
	exaltedIcons: 0,
	totalIcons: 0,
	wrathDieResult: 0,
	positionsTaken: [],
	getPosition: () => {
		const store = get();

		const getUniqePosition = (): number => {
			let position = getRandom(positionMax, positionMin);
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
	openModal: () => set({
		isModalOpen: true,
		results: [],
		normalIcons: 0,
		exaltedIcons: 0,
		totalIcons: 0,
		wrathDieResult: 0,
		positionsTaken: [],

	}),
	closeModal: () => set({ isModalOpen: false }),
	rollDice: (pool: Pool) => {
		const store = get();

		const skillDice = pool[WRATH_AND_GLORY_SKILL_TEST]
		const d6 = pool[D6]
		const d3 = pool[D3]

		const results = getResultsArray(6, skillDice, undefined, false);
		const normalIcons = results.filter(val => val === 4 || val === 5).length;
		const exaltedIcons = results.filter(val => val === 6).length * 2;
		const totalIcons = normalIcons + exaltedIcons
		const wrathDieResult = results[0];

		console.log('results', results)
		console.log('normalIcons', normalIcons)
		console.log('exaltedIcons', exaltedIcons)
		console.log('totalIcons', totalIcons)
		console.log('wrathDieResult', wrathDieResult)
		console.log('get()', store)

		set({
			results: results.map((val, id) => ({ val, id, position: store.getPosition() })),
			normalIcons,
			exaltedIcons,
			totalIcons,
			wrathDieResult,
			isModalOpen: true
		})
	}

})));

export default useStore;
