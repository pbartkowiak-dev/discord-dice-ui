import React from 'react';
import { connect } from 'react-redux';
import { hideMsg } from '../../actions/modals';
import ResultsModal from './ResultsModal';

const mapStateToProps = (state:any) => {
	return {
		msgData: state.msg
	};
};

const mapDispatchToProps = { hideMsg };

type ResultsModalContainerProps = {
	hideMsg:Function
	msgData:any
}

function ResultsModalContainer({
	hideMsg,
	msgData
}:ResultsModalContainerProps) {
	return (
		<>
			<ResultsModal
				hideMsg={hideMsg}
				msgData={msgData}
				showModal={msgData.showMsg}
			/>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsModalContainer);
