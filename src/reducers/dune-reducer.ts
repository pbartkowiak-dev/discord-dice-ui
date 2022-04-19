import { CLOSE_MSG_MODAL } from "../actions/modals";
import {
  DUNE_DICE_ROLLED,
  OPEN_DUNE_TOKENS_MODAL,
  UPDATE_DUNE_TOKENS_STATE,
} from "../actions/dune.actions";
import { DuneState } from "./2d20-types";

const initialState: DuneState = {
  showTokensModal: false,
  momentum: "0",
  threat: "0",
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_DUNE_TOKENS_STATE: {
      return {
        ...state,
        momentum: action.payload.momentum,
        threat: action.payload.threat,
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
