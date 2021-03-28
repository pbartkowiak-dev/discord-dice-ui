import {
	CLOSE_CTHULHU_MODAL,
	CLOSE_CTHULHU_RESULTS_MODAL,
	CTHULHU_DICE_ROLLED,
	OPEN_CTHULHU_MODAL
} from "../actions/cthulhu.actions";

const initialState = {
	results: {},
	showModal: false,
	showResultsModal: false
};

function cthulhuReducer(state = initialState, action: any) {
	switch (action.type) {
		case OPEN_CTHULHU_MODAL:
			return {
				...state,
				showModal: true
			};
		case CLOSE_CTHULHU_MODAL:
			return {
				...state,
				showModal: close
			};
		case CTHULHU_DICE_ROLLED:
			return {
				...state,
				results: action.payload,
				showResultsModal: true
			};
		case CLOSE_CTHULHU_RESULTS_MODAL:
			return {
				...state,
				showResultsModal: false
			}
	}
	return state;
}

export default cthulhuReducer;
