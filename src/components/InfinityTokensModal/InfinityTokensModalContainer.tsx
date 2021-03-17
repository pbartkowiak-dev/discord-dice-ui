import React from 'react';
import { connect } from 'react-redux';
import { hideMsg } from '../../actions/modals';
import { updateTokensState } from '../../actions/infinity.actions';
import InfinityTokensModal from './InfinityTokensModal';

const mapStateToProps = (state: any) => {
	const { infinityData } = state;
	return {
		infinityData
	};
};

const mapDispatchToProps = {
	updateTokensState,
	hideMsg
};

function InfinityTokensModalContainer({
	updateTokensState,
	hideMsg,
	infinityData: {
		showTokensModal,
		momentum,
		heat
	},
}: any) {

	return (
		<InfinityTokensModal
			updateTokensState={updateTokensState}
			showModal={showTokensModal}
			hideMsg={hideMsg}
			momentum={momentum}
			heat={heat}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(InfinityTokensModalContainer);
