import React from 'react';
import { connect } from 'react-redux';
import { closeConanModal, showMsg } from '../../actions';
import ConanModal from './ConanModal';

const mapStateToProps = (state:any) => {
	return {
		showConanModal: state.showConanModal,
		userSettings: state.userSettings,
	};
};

const mapDispatchToProps = {
	closeConanModal,
	showMsg
};

type ConanModalContainerProps = {
	userSettings: any
	showConanModal: boolean
	closeConanModal: Function
	showMsg: Function
}

function ConanModalContainer({
	userSettings,
	showConanModal,
	closeConanModal,
	showMsg
}:ConanModalContainerProps) {

	return (
		<>
			<ConanModal
				userSettings={userSettings}
				showConanModal={showConanModal}
				closeConanModal={closeConanModal}
				showMsg={showMsg}
			/>
		</>
	);

}

export default connect(mapStateToProps, mapDispatchToProps)(ConanModalContainer);
