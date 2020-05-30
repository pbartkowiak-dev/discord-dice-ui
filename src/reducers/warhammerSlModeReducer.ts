import { SAVE_WARHAMMER_SL_MODE } from '../actions';
import { warhammerSlModeType } from '../utils/localStorageWarhammerSlModeManager';

const initialState:warhammerSlModeType = {
	fastSL: false,
	darkHeresySL: false,
	warhammer4eSL: true,
	warhammer2eSL: false
};

function warhammerSlModeReducer(state = initialState, action:any) {
	switch (action.type) {
		case SAVE_WARHAMMER_SL_MODE:
			return action.warhammerSlMode;
	}
	return state;
}

export default warhammerSlModeReducer;