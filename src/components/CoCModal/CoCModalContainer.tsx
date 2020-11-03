import React from 'react';
import { connect } from 'react-redux';
import { closeCoCModal } from '../../actions/modals';
import { requestRoll } from '../../actions/roll.actions';
import CoCModal from './CoCModal';

const mapDispatchToProps = {
	closeCoCModal,
	requestRoll
};

interface CoCModalContainerProps {
	closeCoCModal: () => void;
	requestRoll: Function;
	showModal: boolean;
}

function CoCModalContainer({
	closeCoCModal,
	requestRoll,
	showModal
}:CoCModalContainerProps) {
	return (
		<CoCModal
			closeCoCModal={closeCoCModal}
			requestRoll={requestRoll}
			showModal={showModal}
		/>
	);
}

export default connect(undefined, mapDispatchToProps)(CoCModalContainer);
