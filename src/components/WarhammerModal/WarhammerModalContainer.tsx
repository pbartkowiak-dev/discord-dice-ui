import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { closeWarhammerModal, showMsg, saveWarhammerSlMode } from '../../actions';
import WarhammerModal from './WarhammerModal';
import localStorageWarhammerSlModeManager, { warhammerSlModeType } from '../../utils/localStorageWarhammerSlModeManager';

const mapStateToProps = (state:any) => {
	return {
		showWarhammerModal: state.showWarhammerModal,
		userSettings: state.userSettings,
		warhammerSlMode: state.warhammerSlMode
	};
};

const mapDispatchToProps = {
	closeWarhammerModal,
	showMsg,
	saveWarhammerSlMode
};

type WarhammerModalContainerProps = {
	userSettings: any
	showWarhammerModal: boolean
	closeWarhammerModal: Function
	showMsg: Function
	saveWarhammerSlMode: Function
	warhammerSlMode: warhammerSlModeType
}

function WarhammerModalContainer({
	userSettings,
	showWarhammerModal,
	closeWarhammerModal,
	showMsg,
	saveWarhammerSlMode,
	warhammerSlMode
}:WarhammerModalContainerProps) {
	useLayoutEffect(() => {
		const localStorageWarhammerSlMode = localStorageWarhammerSlModeManager.load();
		if (localStorageWarhammerSlMode) {
			saveWarhammerSlMode(localStorageWarhammerSlMode);
		}
	}, [showWarhammerModal]);

	return (
		<>
			<WarhammerModal
				userSettings={userSettings}
				showWarhammerModal={showWarhammerModal}
				closeWarhammerModal={closeWarhammerModal}
				showMsg={showMsg}
				warhammerSlMode={warhammerSlMode}
			/>
		</>
	);

}

export default connect(mapStateToProps, mapDispatchToProps)(WarhammerModalContainer);
