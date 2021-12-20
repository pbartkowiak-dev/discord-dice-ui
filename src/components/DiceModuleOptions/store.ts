import create from 'zustand';
import { persist } from "zustand/middleware";
import addStorePrefix from "../../utils/addStorePrefix";

type Mode =
|	'none'
|	'warhammerMode'
|	'cthulhuMode'
|	'conanMode'
|	'infinityMode'
|	'narrativeDice'
|	'rollAndKeepMode'
|	'l5rMode'
|	'fateMode'
|	'wrathAndGloryMode'
|	'torMode'

type State = {
	useModifier: boolean
	mode: Mode
	toggleMode: (mode: Mode) => void
	toggleModifier: () => void
}

const useStore = create<State>(persist(((set, get) => ({
	useModifier: false,
	mode: 'none',
	toggleMode: (mode) => set({ mode }),
	toggleModifier: () => {
		const state = get();
		set({ useModifier: !state.useModifier });
	}
})), {
	name: addStorePrefix('module-options')
}));

export default useStore;
