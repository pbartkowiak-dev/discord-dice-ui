import { DICE_SELECTED } from '../actions';
import { CLOSE_MSG_MODAL } from '../actions/modals';

export interface SelectedDiceType {
	diceType: string;
	diceAmount: number;
}

const initialState = {
	diceType: '',
	diceAmount: 0
} as SelectedDiceType;

function diceSelectedReducer(state = initialState, action: any) {
	switch (action.type) {
		case DICE_SELECTED:
			return action.payload;
		case CLOSE_MSG_MODAL:
				return {
					diceType: '',
					diceAmount: 0
				};
	}
	return state;
}

export default diceSelectedReducer;
