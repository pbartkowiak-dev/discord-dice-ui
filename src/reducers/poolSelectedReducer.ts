import { POOL_SELECTED, POOL_SELECTED_RESET } from '../actions/roll.actions';

export interface SelectedPoolType {
	[dieType: string]: number;
}

const initialState = {} as SelectedPoolType;

function poolSelectedReducer(state = initialState, action: any) {
	switch (action.type) {
		case POOL_SELECTED:
			return action.payload || {};
		case POOL_SELECTED_RESET:
			return {};
	}
	return state;
}

export default poolSelectedReducer;
