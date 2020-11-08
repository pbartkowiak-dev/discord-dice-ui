import {
	OPEN_COC_MODAL,
	CLOSE_COC_MODAL,
	OPEN_CONAN_MODAL,
	CLOSE_CONAN_MODAL,
	OPEN_MODIFIER_MODAL,
	CLOSE_MODIFIER_MODAL,
	OPEN_WARHAMMER_MODAL,
	CLOSE_WARHAMMER_MODAL,
	OPEN_SETTINGS_MODAL,
	CLOSE_SETTINGS_MODAL,
	OPEN_POOL_BUILDER_MODAL,
	CLOSE_POOL_BUILDER_MODAL
} from '../actions/modals';

export interface ModalsStateTypes {
	isCoCModalOpen: boolean;
	isConanModalOpen: boolean;
	isWarhammerModalOpen: boolean;
	isModifierModalOpen: boolean;
	isSettingsModalOpen: boolean;
	isPoolBuilderModalOpen: boolean;
}

const modalsState = {
	isCoCModalOpen: false,
	isConanModalOpen: false,
	isWarhammerModalOpen: false,
	isModifierModalOpen: false,
	isSettingsModalOpen: false,
	isPoolBuilderModalOpen: false
};

function modalsReducer(state: ModalsStateTypes = modalsState, action: any) {
	switch (action.type) {
		case CLOSE_COC_MODAL:
			return {
				...state,
				isCoCModalOpen: false
			};
		case OPEN_COC_MODAL:
			return {
				...state,
				isCoCModalOpen: true
			};
		case CLOSE_WARHAMMER_MODAL:
			return {
				...state,
				isWarhammerModalOpen: false
			};
		case OPEN_WARHAMMER_MODAL:
			return {
				...state,
				isWarhammerModalOpen: true
			};
		case CLOSE_SETTINGS_MODAL:
			return {
				...state,
				isSettingsModalOpen: false
			};
		case OPEN_SETTINGS_MODAL:
			return {
				...state,
				isSettingsModalOpen: true
			};
		case CLOSE_MODIFIER_MODAL:
			return {
				...state,
				isModifierModalOpen: false
			};
		case OPEN_MODIFIER_MODAL:
			return {
				...state,
				isModifierModalOpen: true
			};
		case CLOSE_CONAN_MODAL:
			return {
				...state,
				isConanModalOpen: false
			};
		case OPEN_CONAN_MODAL:
			return {
				...state,
				isConanModalOpen: true
			};
		case OPEN_POOL_BUILDER_MODAL:
			return {
				...state,
				isPoolBuilderModalOpen: true
			};
		case CLOSE_POOL_BUILDER_MODAL:
			return {
				...state,
				isPoolBuilderModalOpen: false
			};
	}
	return state;
}

export default modalsReducer;
