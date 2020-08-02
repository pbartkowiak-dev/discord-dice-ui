import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { openSettingsModal, closeSettingsModal } from '../../actions/modals';

const mapDispatchToProps = { openSettingsModal, closeSettingsModal };

function HeaderContainer({ openSettingsModal }:any) {
	return <Header openSettingsModal={openSettingsModal} />;
}

export default connect(undefined, mapDispatchToProps)(HeaderContainer);
