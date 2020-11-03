import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { saveWarhammerSlMode } from '../../actions';
import { closeWarhammerModal } from '../../actions/modals';
import WarhammerModal from './WarhammerModal';
import { requestRoll } from '../../actions/roll.actions';
import localStorageWarhammerSlModeManager from '../../utils/localStorageWarhammerSlModeManager';

const mapStateToProps = (state: any) => {
	return {
		warhammerSlMode: state.warhammerSlMode
	};
};

const mapDispatchToProps = {
	closeWarhammerModal,
	saveWarhammerSlMode,
	requestRoll
};

interface WarhammerModalContainerProps {
	showModal: boolean;
	closeWarhammerModal: () => void;
	saveWarhammerSlMode: Function;
	warhammerSlMode: string;
	requestRoll: Function;
}

function WarhammerModalContainer({
	showModal,
	closeWarhammerModal,
	saveWarhammerSlMode,
	warhammerSlMode,
	requestRoll
}:WarhammerModalContainerProps) {
	useEffect(() => {
		const localStorageWarhammerSlMode = localStorageWarhammerSlModeManager.load();
		if (localStorageWarhammerSlMode) {
			saveWarhammerSlMode(localStorageWarhammerSlMode);
		}
	}, [showModal, saveWarhammerSlMode]);

	return (
		<WarhammerModal
			closeWarhammerModal={closeWarhammerModal}
			warhammerSlMode={warhammerSlMode}
			requestRoll={requestRoll}
			showModal={showModal}
		/>
	);

}

export default connect(mapStateToProps, mapDispatchToProps)(WarhammerModalContainer);
