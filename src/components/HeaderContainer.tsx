import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { openSettingsModal, closeSettingsModal } from '../actions';

const mapStateToProps = (state:any) => {
	return {
		showSettingsModal: state.showSettingsModal
	};
};

const mapDispatchToProps = { openSettingsModal, closeSettingsModal };

function HeaderContainer({ openSettingsModal }:any) {
	return (
		<>
			<Header
				openSettingsModal={openSettingsModal}
			/>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);