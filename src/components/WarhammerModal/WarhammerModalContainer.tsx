import React from 'react';
import { connect } from 'react-redux';
import { closeWarhammerModal, showMsg } from '../../actions';
import WarhammerModal from './WarhammerModal';

const mapStateToProps = (state:any) => {
	return {
		showWarhammerModal: state.showWarhammerModal,
		userSettings: state.userSettings,
	};
};

const mapDispatchToProps = { closeWarhammerModal, showMsg };

type WarhammerModalContainerProps = {
	userSettings: any,
	showWarhammerModal: boolean,
	closeWarhammerModal: Function,
	showMsg: Function
}

function WarhammerModalContainer({
	userSettings,
	showWarhammerModal,
	closeWarhammerModal,
	showMsg
}:WarhammerModalContainerProps) {
	return (
		<>
			<WarhammerModal
				userSettings={userSettings}
				showWarhammerModal={showWarhammerModal}
				closeWarhammerModal={closeWarhammerModal}
				showMsg={showMsg}
			/>
		</>
	);

}

export default connect(mapStateToProps, mapDispatchToProps)(WarhammerModalContainer);
