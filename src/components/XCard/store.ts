import create from 'zustand';
import { requestMsgReady } from "../../actions/roll.actions";
import reduxStore from '../../store';
import { getDiscordMsgData } from "./getDiscordMsgData";

export type State = {
	openModal: () => void;
	isModalOpen: boolean;
	closeModal: () => void;
	throwXCard: () => void;
	isAnonymous: boolean;
	setIsAnonymous: (isAnonymous: boolean) => void;
}

const useStore = create<State>(((set, get) => ({
	isModalOpen: false,
	isAnonymous: false,

	openModal: () => set({ isModalOpen: true }),

	closeModal: () => set({ isModalOpen: false }),

	setIsAnonymous: (isAnonymous) => set({ isAnonymous }),

	throwXCard() {
		const {	isAnonymous } = get();

		reduxStore.dispatch(requestMsgReady(
			getDiscordMsgData({ isAnonymous })
		));
	},
})));

export default useStore;
