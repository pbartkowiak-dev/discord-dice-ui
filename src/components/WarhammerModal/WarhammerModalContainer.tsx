import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { saveWarhammerSlMode } from '../../actions';
import { closeWarhammerModal, showMsgModal } from '../../actions/modals';
import WarhammerModal from './WarhammerModal';
import localStorageWarhammerSlModeManager from '../../utils/localStorageWarhammerSlModeManager';

const mapStateToProps = (state:any) => {
	return {
		userSettings: state.userSettings,
		warhammerSlMode: state.warhammerSlMode
	};
};

const mapDispatchToProps = {
	closeWarhammerModal,
	showMsgModal,
	saveWarhammerSlMode
};

type WarhammerModalContainerProps = {
	userSettings: any
	showModal: boolean
	closeWarhammerModal: Function
	showMsgModal: Function
	saveWarhammerSlMode: Function
	warhammerSlMode: string
}

function WarhammerModalContainer({
	userSettings,
	showModal,
	closeWarhammerModal,
	showMsgModal,
	saveWarhammerSlMode,
	warhammerSlMode
}:WarhammerModalContainerProps) {
	useLayoutEffect(() => {
		const localStorageWarhammerSlMode = localStorageWarhammerSlModeManager.load();
		if (localStorageWarhammerSlMode) {
			saveWarhammerSlMode(localStorageWarhammerSlMode);
		}
	}, [showModal, saveWarhammerSlMode]);
	console.log('warhammerSlMode', warhammerSlMode);
	return (
		<>
			<WarhammerModal
				userSettings={userSettings}
				showModal={showModal}
				closeWarhammerModal={closeWarhammerModal}
				showMsgModal={showMsgModal}
				warhammerSlMode={warhammerSlMode}
			/>
		</>
	);

}

export default connect(mapStateToProps, mapDispatchToProps)(WarhammerModalContainer);
