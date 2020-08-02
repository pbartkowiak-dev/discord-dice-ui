import React from 'react';
import { connect } from 'react-redux';
import { closeCoCModal, showMsgModal } from '../../actions/modals';
import CoCModal from './CoCModal';

const mapStateToProps = (state:any) => {
	return {
		userSettings: state.userSettings,
	};
};

const mapDispatchToProps = { closeCoCModal, showMsgModal };

type CoCModalContainerProps = {
	userSettings: any,
	closeCoCModal: Function,
	showMsgModal: Function
	showModal: boolean,
}

function CoCModalContainer({
	userSettings,
	closeCoCModal,
	showMsgModal,
	showModal
}:CoCModalContainerProps) {
	return (
		<>
			<CoCModal
				userSettings={userSettings}
				closeCoCModal={closeCoCModal}
				showMsgModal={showMsgModal}
				showModal={showModal}
			/>
		</>
	);

}

export default connect(mapStateToProps, mapDispatchToProps)(CoCModalContainer);
