import { SELECT_DICE } from '../actions';

type userSettingsType = {
	diceType: number,
	diceAmount: number
}

const initialState:userSettingsType = {
	diceType: 6,
	diceAmount: 1
};

function storeSelectedDiceReducer(state = initialState, action:any) {
	switch (action.type) {
		case SELECT_DICE:
			return {
				...state,
				...action.selectedDice
			};
	}
	return state;
}

export default storeSelectedDiceReducer;