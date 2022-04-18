import { CLOSE_MSG_MODAL } from "../actions/modals";
import { InitialStateType } from "./conanTypes";
import {
  DUNE_DICE_ROLLED,
  OPEN_DUNE_TOKENS_MODAL,
  UPDATE_DUNE_TOKENS_STATE,
} from "../actions/dune.actions";

const initialState: InitialStateType = {
  showTokensModal: false,
  momentum: "0",
  doom: "0",
  assistanceDiceResults: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_DUNE_TOKENS_STATE: {
      return {
        ...state,
        momentum: action.payload.momentum,
        doom: action.payload.doom,
        showTokensModal: false,
      };
    }
    case DUNE_DICE_ROLLED: {
      return {
        ...state,
      };
    }
    case OPEN_DUNE_TOKENS_MODAL: {
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
