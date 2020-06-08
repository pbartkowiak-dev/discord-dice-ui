import { SAVE_WARHAMMER_SL_MODE } from '../actions';

function warhammerSlModeReducer(state = 'warhammer4eSL', action:any) {
	switch (action.type) {
		case SAVE_WARHAMMER_SL_MODE:
			return action.warhammerSlMode;
	}
	return state;
}

export default warhammerSlModeReducer;