import React from 'react';
import { connect } from 'react-redux';
import { requestCthulhuRoll, closeCthulhuModal } from '../../actions/cthulhu.actions';
import CthulhuModal from './CthulhuModal';
import { CthulhuModalPropTypes } from './CthulhuModalTypes';

const mapDispatchToProps = {
	closeCthulhuModal,
	requestCthulhuRoll
};

function CthulhuModalContainer({
	closeCthulhuModal,
	requestCthulhuRoll,
	showModal
}: CthulhuModalPropTypes) {
	return (
		<CthulhuModal
			closeCthulhuModal={closeCthulhuModal}
			requestCthulhuRoll={requestCthulhuRoll}
			showModal={showModal}
		/>
	);
}

export default connect(undefined, mapDispatchToProps)(CthulhuModalContainer);
