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


// import { CLOSE_MSG_MODAL } from '../actions/modals';
// import { REROLL_REQUESTED } from '../actions/roll.actions';

// // Remembers last selected die type
// export default(state = '', action: any) => {
// 	switch (action.type) {
// 		case REROLL_REQUESTED:
// 			if (action.payload) {
// 				return action.payload;
// 			} else {
// 				return '';
// 			}			
// 		case CLOSE_MSG_MODAL:
// 			return '';
// 	}
// 	return state;
// };
