import { DICE_SELECTED, DICE_SELECTED_RESET } from "../actions/roll.actions";

export interface SelectedDiceType {
  diceType: string;
  diceAmount: number;
}

const initialState = {
  diceType: "",
  diceAmount: 0,
} as SelectedDiceType;

function diceSelectedReducer(state = initialState, action: any) {
  switch (action.type) {
    case DICE_SELECTED:
      return action.payload;
    case DICE_SELECTED_RESET:
      return {
        diceType: "",
        diceAmount: 0,
      };
  }
  return state;
}

export default diceSelectedReducer;
