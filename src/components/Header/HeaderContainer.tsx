import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import {
	openSettingsModal,
	closeSettingsModal,
	openCopyrightModal
} from '../../actions/modals';

function mapStateToProps(state:any) {
	return {
		userSettings: state.userSettings
	};
}

const mapDispatchToProps = {
	openSettingsModal,
	closeSettingsModal,
	openCopyrightModal
};

function HeaderContainer({
	openSettingsModal,
	openCopyrightModal,
	userSettings
}:any) {
	return (
		<Header
			userSettings={userSettings}
			openSettingsModal={openSettingsModal}
			openCopyrightModal={openCopyrightModal}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
