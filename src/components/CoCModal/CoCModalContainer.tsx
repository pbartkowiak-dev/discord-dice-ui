import React from 'react';
import { connect } from 'react-redux';
import { closeCoCModal } from '../../actions/modals';
import { requestRoll } from '../../actions/roll.actions';
import CoCModal from './CoCModal';
import { CoCModalPropTypes } from './CoCModalTypes';

const mapDispatchToProps = {
	closeCoCModal,
	requestRoll
};

function CoCModalContainer({
	closeCoCModal,
	requestRoll,
	showModal
}: CoCModalPropTypes) {
	return (
		<CoCModal
			closeCoCModal={closeCoCModal}
			requestRoll={requestRoll}
			showModal={showModal}
		/>
	);
}

export default connect(undefined, mapDispatchToProps)(CoCModalContainer);
