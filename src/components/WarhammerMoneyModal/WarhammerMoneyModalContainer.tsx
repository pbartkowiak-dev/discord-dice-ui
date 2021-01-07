import React from 'react';
import { connect } from 'react-redux';
import { openWarhammerMoneyModal, closeWarhammerMoneyModal } from '../../actions/modals';
import WarhammerMoneyModal from './WarhammerMoneyModal';

const mapDispatchToProps = { closeWarhammerMoneyModal };

function WarhammerMoneyModalContainer({
	showModal,
	closeWarhammerMoneyModal
}:any) {

	return (
		<WarhammerMoneyModal
			showModal={showModal}
			closeModal={closeWarhammerMoneyModal}
		/>
	);

}

export default connect(undefined, mapDispatchToProps)(WarhammerMoneyModalContainer);
