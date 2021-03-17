import { CLOSE_MSG_MODAL } from '../actions/modals';
import {
	OPEN_INFINITY_TOKENS_MODAL,
	UPDATE_INFINITY_TOKENS_STATE,
	INFINITY_DICE_ROLLED
} from '../actions/infinity.actions';

import { InitialStateType } from './infinityTypes';

const initialState: InitialStateType = {
	showTokensModal: false,
	momentum: '0',
	heat: '0',
	assistanceDiceResults: []
};

export default (state = initialState, action: any) => {
	switch (action.type) {
		case UPDATE_INFINITY_TOKENS_STATE: {
			return {
				...state,
				momentum: action.payload.momentum,
				heat: action.payload.heat,
				showTokensModal: false
			};
		}
		case INFINITY_DICE_ROLLED: {
			const { payload: { result } } = action;
			const { assistanceDiceResults } = result;

			return {
				...state,
				assistanceDiceResults
			};
		}
		case OPEN_INFINITY_TOKENS_MODAL: {
			return {
				...state,
				showTokensModal: true
			};
		}
		case CLOSE_MSG_MODAL: {
			return {
				...state,
				showTokensModal: false
			};
		}
	}
	return state;
};
