import React from 'react';
import { connect } from 'react-redux';
import { closeCopyrightModal } from '../../actions/modals';
import CopyrightModal from './CopyrightModal';

const mapDispatchToProps = {
	closeCopyrightModal
};

function CopyrightModalContainer({
	showModal,
	closeCopyrightModal
}: any) {

	return (
		<CopyrightModal
			showModal={showModal}
			closeCopyrightModal={closeCopyrightModal}
		/>
	);

}

export default connect(undefined, mapDispatchToProps)(CopyrightModalContainer);
