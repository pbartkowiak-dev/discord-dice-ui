import create from 'zustand';
import { persist } from "zustand/middleware";
import addStorePrefix from "../../utils/addStorePrefix";

type State = {
	state: {
		useModifier: boolean
		warhammerMode: boolean
		cthulhuMode: boolean
		conanMode: boolean
		infinityMode: boolean
		narrativeDice: boolean
		rollAndKeepMode: boolean
		l5rMode: boolean
		fateMode: boolean
		wrathAndGloryMode: boolean
	}
	toggle: (key: string) => void
}

const useStore = create<State>(persist(((set, get) => ({
	state: {
		useModifier: false,
		warhammerMode: false,
		cthulhuMode: false,
		conanMode: false,
		infinityMode: false,
		narrativeDice: false,
		rollAndKeepMode: false,
		l5rMode: false,
		fateMode: false,
		wrathAndGloryMode: false
	},
	toggle: (key) => {
		const { state } = get();
		// @ts-ignore
		const newState = {
			...state,
			// @ts-ignore
			[key]: !state[key]
		};

		set({
			state: newState
		});
	}
})), {
	name: addStorePrefix('module-options')
}));

export default useStore;
