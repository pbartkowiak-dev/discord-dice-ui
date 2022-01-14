import {
  WARHAMMER_DICE_ROLLED,
  SAVE_WARHAMMER_SL_TYPE,
  CLOSE_WARHAMMER_MODAL,
  OPEN_WARHAMMER_MODAL,
  CLOSE_WARHAMMER_RESULTS_MODAL,
} from "../actions/warhammer.actions";

const initialState = {
  slType: "warhammer4eSL",
  results: {},
  showModal: false,
  showResultsModal: false,
};

function warhammerReducer(state = initialState, action: any) {
  switch (action.type) {
    case SAVE_WARHAMMER_SL_TYPE:
      return {
        ...state,
        slType: action.payload,
      };
    case OPEN_WARHAMMER_MODAL:
      return {
        ...state,
        showModal: true,
      };
    case CLOSE_WARHAMMER_MODAL:
      return {
        ...state,
        showModal: false,
      };
    case WARHAMMER_DICE_ROLLED:
      return {
        ...state,
        results: action.payload,
        showResultsModal: true,
      };
    case CLOSE_WARHAMMER_RESULTS_MODAL:
      return {
        ...state,
        showResultsModal: false,
      };
  }
  return state;
}

export default warhammerReducer;
