import { CLOSE_MSG_MODAL } from "../actions/modals";
import {
  L5R_DICE_ROLLED,
  L5R_DICE_REROLLED,
  L5R_KEEP_DICE,
  L5R_ALTER_DIE,
  L5R_ADD_DIE,
  L5R_ROLL_ADDITIONAL_DIE,
  L5R_KEEP_ADDITIONAL_DIE,
  L5R_CLEAR_DATA,
} from "../actions/l5r.actions";

import { InitialStateType } from "../components/L5rResultsModal/L5rResultsModalTypes";

const initialState: InitialStateType = {
  showModal: false,

  results: [],
  resultsKept: [],
  resultsKeptIndexesAltered: [],
  resultsKeptIndexesExploded: [],

  additionalDiceRolled: [],
  additionalDiceIndexesKept: [],
  additionalDiceIndexesDropped: [],
  additionalDiceIndexesExploded: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case L5R_DICE_ROLLED:
    case L5R_DICE_REROLLED: {
      return {
        ...state,
        results: action.payload,
        showModal: true,
      };
    }
    case L5R_KEEP_DICE: {
      return {
        ...state,
        resultsKept: action.payload,
      };
    }
    case L5R_ALTER_DIE: {
      const { resultsKept, resultsKeptIndexesAltered } = action.payload;
      return {
        ...state,
        resultsKept,
        resultsKeptIndexesAltered,
      };
    }
    case L5R_ADD_DIE: {
      const { results, resultsKept } = action.payload;
      return {
        ...state,
        results,
        resultsKept,
      };
    }
    case L5R_ROLL_ADDITIONAL_DIE: {
      const {
        additionalDiceRolled,
        resultsKeptIndexesExploded,
        additionalDiceIndexesExploded,
      } = action.payload;

      return {
        ...state,
        additionalDiceRolled,
        resultsKeptIndexesExploded,
        additionalDiceIndexesExploded,
      };
    }
    case L5R_KEEP_ADDITIONAL_DIE: {
      const { additionalDiceIndexesKept, additionalDiceIndexesDropped } =
        action.payload;
      return {
        ...state,
        additionalDiceIndexesDropped,
        additionalDiceIndexesKept,
      };
    }
    case CLOSE_MSG_MODAL: {
      return {
        ...state,
        showModal: false,
      };
    }
    case L5R_CLEAR_DATA: {
      return {
        ...state,
        results: [],
        resultsKept: [],
        resultsKeptIndexesAltered: [],
        resultsKeptIndexesExploded: [],

        additionalDiceRolled: [],
        additionalDiceIndexesKept: [],
        additionalDiceIndexesDropped: [],
        additionalDiceIndexesExploded: [],
      };
    }
  }
  return state;
};
