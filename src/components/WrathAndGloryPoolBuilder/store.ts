import create from 'zustand';
import { persist } from "zustand/middleware"
import addStorePrefix from "../../utils/addStorePrefix";
import { D3, D6, WRATH_AND_GLORY_SKILL_TEST } from "../../consts/diceConstants";

interface Pool {
	WRATH_AND_GLORY_SKILL_TEST?: number;
	d6?: number
	d3?: number
}

type State = {
	isModalOpen: boolean;
	openModal: () => void
	closeModal: () => void
	rollDice: (pool: Pool) => void
}

const useStore = create<State>(persist(((set, get) => ({
	isModalOpen: false,
	openModal: () => set({ isModalOpen: false}),
	closeModal: () => set({ isModalOpen: false }),
	rollDice: (pool: Pool) => {
		console.log('pool', pool)

		const skillDice = pool[WRATH_AND_GLORY_SKILL_TEST]
		const d6 = pool[D6]
		const d3 = pool[D3]

		console.log(skillDice)
		console.log(d6)
		console.log(d3)
	}

})), {
	name: addStorePrefix('wrath-and-glory')
}));

export default useStore;
