import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { saveslType, closeWarhammerModal, requestWarhammerRoll } from '../../actions/warhammer.actions';
import WarhammerModal from './WarhammerModal';
import localStorageWarhammerSlModeManager from '../../utils/localStorageWarhammerSlModeManager';
import { WarhammerModalContainerPropTypes } from './WarhammerModalTypes';

const mapStateToProps = ({ warhammerState }: any) => {
	return {
		slType: warhammerState.slType
	};
};

const mapDispatchToProps = {
	closeWarhammerModal,
	saveslType,
	requestWarhammerRoll
};

function WarhammerModalContainer({
	showModal,
	closeWarhammerModal,
	saveslType,
	slType,
	requestWarhammerRoll
}: WarhammerModalContainerPropTypes) {
	useEffect(() => {
		const localStorageslType = localStorageWarhammerSlModeManager.load()
		if (localStorageslType) {
			saveslType(localStorageslType);
		}
	}, [showModal, saveslType]);

	return (
		<WarhammerModal
			closeWarhammerModal={closeWarhammerModal}
			slType={slType}
			requestWarhammerRoll={requestWarhammerRoll}
			showModal={showModal}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(WarhammerModalContainer);
