import React from 'react';
import { connect } from 'react-redux';
import { closePoolBuilderModal } from '../../actions/modals';
import { submitRoll } from '../../actions/roll.actions';
import PoolBuilderModal from './PoolBuilderModal';
import { PoolBuilderModalPropTypes } from './PoolBuilderModalTypes';

const mapDispatchToProps = {
	closePoolBuilderModal,
	submitRoll
};

function PoolBuilderModalContainer({
	closePoolBuilderModal,
	submitRoll,
	showModal
}: any) {
	return (
		<PoolBuilderModal
			closePoolBuilderModal={closePoolBuilderModal}
			submitRoll={submitRoll}
			showModal={showModal}
		/>
	);
}

export default connect(undefined, mapDispatchToProps)(PoolBuilderModalContainer);
