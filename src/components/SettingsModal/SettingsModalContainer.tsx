import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { openSettingsModal, closeSettingsModal, saveUserSettings } from '../../actions';
import SettingsModal from './SettingsModal';
import localStorageUserSettingsManager from '../../utils/localStorageUserSettingsManager';
import queryParamsManager from '../../utils/queryParamsManager';
import getRandomUserColor from '../../utils/getRandomUserColor';
import { DISCORD_DICE_URL } from '../../consts/urls';

const mapStateToProps = (state:any) => {
	return {
		showSettingsModal: state.showSettingsModal,
		userSettings: state.userSettings,
	};
};

const mapDispatchToProps = {
	openSettingsModal,
	closeSettingsModal,
	saveUserSettings
};


function SettingsModalContainer({
	openSettingsModal,
	showSettingsModal,
	closeSettingsModal,
	saveUserSettings,
	userSettings
}:any) {

	useEffect(() => {
		const queryHookUrl = queryParamsManager.get('q');
		const queryUsername = queryParamsManager.get('username');
		const localStorageUserSettings = localStorageUserSettingsManager.load() || {};

		if (queryHookUrl) {
			const userSettings = {
				hookUrl: DISCORD_DICE_URL + queryHookUrl,
				username: queryUsername || localStorageUserSettings.username,
				userColor: localStorageUserSettings.userColor || getRandomUserColor()
			}
			saveUserSettings(userSettings);
			if (!userSettings.username) openSettingsModal();
			return;
		}

		if (localStorageUserSettings && localStorageUserSettings.hookUrl) {
			saveUserSettings(localStorageUserSettings);
			if (!localStorageUserSettings.username) openSettingsModal();
		} else {
			openSettingsModal();
		}
	}, []);

	return (
		<>
			<SettingsModal
				showSettingsModal={showSettingsModal}
				closeSettingsModal={closeSettingsModal}
				saveUserSettings={saveUserSettings}
				userSettings={userSettings}
			/>
		</>
	);

}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModalContainer);
