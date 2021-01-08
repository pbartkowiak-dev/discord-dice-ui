import React from 'react';
import { connect } from 'react-redux';
import { closeWarhammerMoneyModal, warhammerMoneyRecalculated } from '../../actions/modals';
import WarhammerMoneyModal from './WarhammerMoneyModal';

const mapDispatchToProps = {
	closeWarhammerMoneyModal,
	warhammerMoneyRecalculated
};

function WarhammerMoneyModalContainer({
	showModal,
	closeWarhammerMoneyModal,
	warhammerMoneyRecalculated
}: any) {

	return (
		<WarhammerMoneyModal
			showModal={showModal}
			closeModal={closeWarhammerMoneyModal}
			warhammerMoneyRecalculated={warhammerMoneyRecalculated}
		/>
	);
}

export default connect(undefined, mapDispatchToProps)(WarhammerMoneyModalContainer);
