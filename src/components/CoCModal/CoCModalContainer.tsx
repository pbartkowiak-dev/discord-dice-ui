import React from 'react';
import { connect } from 'react-redux';
import { closeCoCModal } from '../../actions/modals';
import { requestDiceRoll } from '../../actions/roll.actions';
import CoCModal from './CoCModal';

const mapDispatchToProps = {
	closeCoCModal,
	requestDiceRoll
};

interface CoCModalContainerProps {
	closeCoCModal: (event?: React.MouseEvent<HTMLElement>) => void;
	requestDiceRoll: Function;
	showModal: boolean;
}

function CoCModalContainer({
	closeCoCModal,
	requestDiceRoll,
	showModal
}:CoCModalContainerProps) {
	return (
		<CoCModal
			closeCoCModal={closeCoCModal}
			requestDiceRoll={requestDiceRoll}
			showModal={showModal}
		/>
	);
}

export default connect(undefined, mapDispatchToProps)(CoCModalContainer);
