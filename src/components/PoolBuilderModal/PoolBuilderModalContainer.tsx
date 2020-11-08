import React from 'react';
import { connect } from 'react-redux';
import { closePoolBuilderModal } from '../../actions/modals';
import { requestRoll } from '../../actions/roll.actions';
import PoolBuilderModal from './PoolBuilderModal';
import { PoolBuilderModalPropTypes } from './PoolBuilderModalTypes';

const mapDispatchToProps = {
	closePoolBuilderModal,
	requestRoll
};

function PoolBuilderModalContainer({
	closePoolBuilderModal,
	requestRoll,
	showModal
}: any) {
	return (
		<PoolBuilderModal
			closePoolBuilderModal={closePoolBuilderModal}
			requestRoll={requestRoll}
			showModal={showModal}
		/>
	);
}

export default connect(undefined, mapDispatchToProps)(PoolBuilderModalContainer);
