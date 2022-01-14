import {
  OPEN_CONAN_MODAL,
  CLOSE_CONAN_MODAL,
  OPEN_INFINITY_MODAL,
  CLOSE_INFINITY_MODAL,
  OPEN_MODIFIER_MODAL,
  CLOSE_MODIFIER_MODAL,
  OPEN_WARHAMMER_MONEY_MODAL,
  CLOSE_WARHAMMER_MONEY_MODAL,
  OPEN_SETTINGS_MODAL,
  CLOSE_SETTINGS_MODAL,
  OPEN_POOL_BUILDER_MODAL,
  CLOSE_POOL_BUILDER_MODAL,
  CLOSE_INFO_MODAL,
  OPEN_INFO_MODAL,
} from "../actions/modals";

export interface ModalsStateTypes {
  isConanModalOpen: boolean;
  isInfinityModalOpen: boolean;
  isModifierModalOpen: boolean;
  isSettingsModalOpen: boolean;
  isPoolBuilderModalOpen: boolean;
  isCopyrightModalOpen: boolean;
  isWarhammerMoneyModalOpen: boolean;
}

const initialState = {
  isConanModalOpen: false,
  isInfinityModalOpen: false,
  isModifierModalOpen: false,
  isSettingsModalOpen: false,
  isPoolBuilderModalOpen: false,
  isCopyrightModalOpen: false,
  isWarhammerMoneyModalOpen: false,
};

// @TODO UNIFY REDUCER CASES
function modalsReducer(state: ModalsStateTypes = initialState, action: any) {
  switch (action.type) {
    case CLOSE_SETTINGS_MODAL:
      return {
        ...state,
        isSettingsModalOpen: false,
      };
    case OPEN_SETTINGS_MODAL:
      return {
        ...state,
        isSettingsModalOpen: true,
      };
    case CLOSE_MODIFIER_MODAL:
      return {
        ...state,
        isModifierModalOpen: false,
      };
    case OPEN_MODIFIER_MODAL:
      return {
        ...state,
        isModifierModalOpen: true,
      };
    case CLOSE_CONAN_MODAL:
      return {
        ...state,
        isConanModalOpen: false,
      };
    case OPEN_CONAN_MODAL:
      return {
        ...state,
        isConanModalOpen: true,
      };
    case CLOSE_INFINITY_MODAL:
      return {
        ...state,
        isInfinityModalOpen: false,
      };
    case OPEN_INFINITY_MODAL:
      return {
        ...state,
        isInfinityModalOpen: true,
      };
    case OPEN_POOL_BUILDER_MODAL:
      return {
        ...state,
        isPoolBuilderModalOpen: true,
      };
    case CLOSE_POOL_BUILDER_MODAL:
      return {
        ...state,
        isPoolBuilderModalOpen: false,
      };
    case OPEN_INFO_MODAL:
      return {
        ...state,
        isCopyrightModalOpen: true,
      };
    case CLOSE_INFO_MODAL:
      return {
        ...state,
        isCopyrightModalOpen: false,
      };
    case OPEN_WARHAMMER_MONEY_MODAL:
      return {
        ...state,
        isWarhammerMoneyModalOpen: true,
      };
    case CLOSE_WARHAMMER_MONEY_MODAL:
      return {
        ...state,
        isWarhammerMoneyModalOpen: false,
      };
  }
  return state;
}

export default modalsReducer;
