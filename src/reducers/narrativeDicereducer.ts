import { CLOSE_MSG_MODAL } from "../actions/modals";
import {
  OPEN_NARRATIVE_TOKENS_MODAL,
  UPDATE_NARRATIVE_TOKENS_STATE,
} from "../actions/narrativeDice.actions";

const initialState: any = {
  showTokensModal: false,
  destinyDark: "0",
  destinyLight: "0",
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_NARRATIVE_TOKENS_STATE: {
      return {
        ...state,
        destinyDark: action.payload.destinyDark,
        destinyLight: action.payload.destinyLight,
        showTokensModal: false,
      };
    }
    case OPEN_NARRATIVE_TOKENS_MODAL: {
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
