import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import {
	openSettingsModal,
	closeSettingsModal,
	openCopyrightModal
} from '../../actions/modals';

const mapDispatchToProps = {
	openSettingsModal,
	closeSettingsModal,
	openCopyrightModal
};

function HeaderContainer({
	openSettingsModal,
	openCopyrightModal
}:any) {
	return (
		<Header
			openSettingsModal={openSettingsModal}
			openCopyrightModal={openCopyrightModal}
		/>
	);
}

export default connect(undefined, mapDispatchToProps)(HeaderContainer);
