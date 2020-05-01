import React from 'react';
import { connect } from 'react-redux';
import { closeCoCModal, showMsg } from '../../actions';
import CoCModal from './CoCModal';

const mapStateToProps = (state:any) => {
	return {
		showCoCModal: state.showCoCModal,
		userSettings: state.userSettings,
	};
};

const mapDispatchToProps = { closeCoCModal, showMsg };

type CoCModalContainerProps = {
	userSettings: any,
	showCoCModal: boolean,
	closeCoCModal: Function,
	showMsg: Function
}

function CoCModalContainer({
	userSettings,
	showCoCModal,
	closeCoCModal,
	showMsg
}:CoCModalContainerProps) {
	return (
		<>
			<CoCModal
				userSettings={userSettings}
				showCoCModal={showCoCModal}
				closeCoCModal={closeCoCModal}
				showMsg={showMsg}
			/>
		</>
	);

}

export default connect(mapStateToProps, mapDispatchToProps)(CoCModalContainer);
