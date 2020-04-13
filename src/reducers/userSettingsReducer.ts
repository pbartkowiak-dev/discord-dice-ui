import { SAVE_USER_SETTINGS } from '../actions';

type userSettingsType = {
	username: string,
	hookUrl: string,
	userColor: number
}

const initialState:userSettingsType = {
	username: '',
	hookUrl: '',
	userColor: 3559404
};

function userSettingsReducer(state = initialState, action:any) {
	switch (action.type) {
		case SAVE_USER_SETTINGS:
			return action.userSettings;
	}
	return state;
}

export default userSettingsReducer;