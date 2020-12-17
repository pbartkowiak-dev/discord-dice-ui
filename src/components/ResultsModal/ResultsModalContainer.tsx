import React from 'react';
import { connect } from 'react-redux';
import { hideMsg } from '../../actions/modals';
import ResultsModal from './ResultsModal';
import { ResultsModalContainerPropTypes } from './ResultsModalTypes';

const mapStateToProps = ({ msg, diceSelected }: any) => {
	return {
		msgData: msg,
		diceSelected
	};
};

const mapDispatchToProps = {
	hideMsg
};

function ResultsModalContainer({
	hideMsg,
	msgData,
	diceSelected
}: ResultsModalContainerPropTypes) {
	return (
		<ResultsModal
			hideMsg={hideMsg}
			msgData={msgData}
			showModal={msgData.showMsg}
			diceSelected={diceSelected}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsModalContainer);
