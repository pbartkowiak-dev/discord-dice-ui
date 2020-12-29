import { CLOSE_MSG_MODAL } from '../actions/modals';
import {
	OPEN_TOKENS_MODAL,
	UPDATE_TOKENS_STATE
} from '../actions/conan.actions';

import { InitialStateType } from './conanTypes';

const initialState: InitialStateType = {
	showTokensModal: false,
	momentum: '0',
	doom: '0',
};

export default (state = initialState, action: any) => {
	switch (action.type) {
		case UPDATE_TOKENS_STATE: {
			return {
				...state,
				momentum: action.payload.momentum,
				doom: action.payload.doom,
				showTokensModal: false
			}
		}
		case OPEN_TOKENS_MODAL: {
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
