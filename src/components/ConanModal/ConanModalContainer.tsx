import React from 'react';
import { connect } from 'react-redux';
import { closeConanModal } from '../../actions/modals';
import { requestRoll } from '../../actions/roll.actions';
import ConanModal from './ConanModal';
import { ConanModalPropTypes } from './ConanModalTypes';

const mapDispatchToProps = {
	closeConanModal,
	requestRoll
};


const ConanModalContainer = ({
	closeConanModal,
	showModal,
	requestRoll
}: ConanModalPropTypes) => (
	<ConanModal
		closeConanModal={closeConanModal}
		showModal={showModal}
		requestRoll={requestRoll}
	/>
);

export default connect(undefined, mapDispatchToProps)(ConanModalContainer);
