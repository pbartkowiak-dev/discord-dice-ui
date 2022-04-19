import { CLOSE_MSG_MODAL } from "../actions/modals";
import {
  OPEN_CONAN_TOKENS_MODAL,
  UPDATE_CONAN_TOKENS_STATE,
  CONAN_DICE_ROLLED,
} from "../actions/conan.actions";
import { ConanState } from "./2d20-types";

const initialState: ConanState = {
  showTokensModal: false,
  momentum: "0",
  doom: "0",
  assistanceDiceResults: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_CONAN_TOKENS_STATE: {
      return {
        ...state,
        momentum: action.payload.momentum,
        doom: action.payload.doom,
        showTokensModal: false,
      };
    }
    case CONAN_DICE_ROLLED: {
      const {
        payload: { result },
      } = action;
      const { assistanceDiceResults } = result;

      return {
        ...state,
        assistanceDiceResults,
      };
    }
    case OPEN_CONAN_TOKENS_MODAL: {
      return {
        ...state,
        showTokensModal: true,
      };
    }
    case CLOSE_MSG_MODAL: {
      return {
        ...state,
        showTokensModal: false,
      };
    }
  }
  return state;
};
