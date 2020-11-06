import { SelectedDiceType } from '../../reducers/diceSelectedReducer';

export interface ResultsModalContainerPropTypes {
	hideMsg: () => void;
	msgData: any;
	diceSelected: SelectedDiceType;
}

export interface ResultsModalPropTypes extends ResultsModalContainerPropTypes {
	showModal: boolean;
}
