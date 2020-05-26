import React from 'react';
import { connect } from 'react-redux';
import { closeWarhammer4eModal, showMsg } from '../../actions';
import Warhammer4eModal from './Warhammer4eModal';

const mapStateToProps = (state:any) => {
	return {
		showWarhammer4eModal: state.showWarhammer4eModal,
		userSettings: state.userSettings,
	};
};

const mapDispatchToProps = { closeWarhammer4eModal, showMsg };

type Warhammer4eModalContainerProps = {
	userSettings: any,
	showWarhammer4eModal: boolean,
	closeWarhammer4eModal: Function,
	showMsg: Function
}

function Warhammer4eModalContainer({
	userSettings,
	showWarhammer4eModal,
	closeWarhammer4eModal,
	showMsg
}:Warhammer4eModalContainerProps) {
	return (
		<>
			<Warhammer4eModal
				userSettings={userSettings}
				showWarhammer4eModal={showWarhammer4eModal}
				closeWarhammer4eModal={closeWarhammer4eModal}
				showMsg={showMsg}
			/>
		</>
	);

}

export default connect(mapStateToProps, mapDispatchToProps)(Warhammer4eModalContainer);
