import { SAVE_USER_SETTINGS } from '../actions';

type userSettingsType = {
	username: string,
	hookUrl: string
}

const initialState:userSettingsType = {
	username: '',
	hookUrl: ''
};

function userSettingsReducer(state = initialState, action:any) {
	switch (action.type) {
		case SAVE_USER_SETTINGS:
			return action.userSettings;
	}
	return state;
}

export default userSettingsReducer;