import { SelectedDiceType } from "../../reducers/dice-selected-reducer";

export interface ResultsModalContainerPropTypes {
  hideMsg: () => void;
  msgData: any;
  diceSelected: SelectedDiceType;
}

export interface ResultsModalPropTypes extends ResultsModalContainerPropTypes {
  showModal: boolean;
}
