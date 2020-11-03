import React from 'react';
import { connect } from 'react-redux';
import { hideMsg } from '../../actions/modals';
import ResultsModal from './ResultsModal';
import { SelectedDiceType } from '../../reducers/diceSelectedReducer';

const mapStateToProps = ({ msg, diceSelected }:any) => {
	return {
		msgData: msg,
		diceSelected
	};
};

const mapDispatchToProps = {
	hideMsg
};

interface ResultsModalContainerProps {
	hideMsg: () => void;
	msgData: any;
	diceSelected: SelectedDiceType;
}

function ResultsModalContainer({
	hideMsg,
	msgData,
	diceSelected
}: ResultsModalContainerProps) {
	return (
		<>
			<ResultsModal
				hideMsg={hideMsg}
				msgData={msgData}
				showModal={msgData.showMsg}
				diceSelected={diceSelected}
			/>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsModalContainer);
