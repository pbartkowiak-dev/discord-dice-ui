import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { openSettingsModal, closeSettingsModal, saveUserSettings } from '../actions';
import SettingsModal from './SettingsModal';
import localStorageUserSettingsManager from '../utils/localStorageUserSettingsManager';


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
		const localStorageUserSettings = localStorageUserSettingsManager.load();
		if (localStorageUserSettings && localStorageUserSettings.hookUrl) {
			saveUserSettings(localStorageUserSettings);
		} else {
			// open popup on start if there are no user settings stored
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
