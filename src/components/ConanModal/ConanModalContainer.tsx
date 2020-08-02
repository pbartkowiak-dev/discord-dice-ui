import React from 'react';
import { connect } from 'react-redux';
import { closeConanModal, showMsgModal } from '../../actions/modals';
import ConanModal from './ConanModal';

const mapStateToProps = (state:any) => {
	return {
		userSettings: state.userSettings,
	};
};

const mapDispatchToProps = {
	closeConanModal,
	showMsgModal
};

type ConanModalContainerProps = {
	userSettings: any
	closeConanModal: Function
	showMsgModal: Function,
	showModal: boolean
}

function ConanModalContainer({
	userSettings,
	closeConanModal,
	showMsgModal,
	showModal
}:ConanModalContainerProps) {

	return (
		<>
			<ConanModal
				userSettings={userSettings}
				closeConanModal={closeConanModal}
				showMsgModal={showMsgModal}
				showModal={showModal}
			/>
		</>
	);

}

export default connect(mapStateToProps, mapDispatchToProps)(ConanModalContainer);
