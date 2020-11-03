import React from 'react';
import { connect } from 'react-redux';
import { hideMsg } from '../../actions/modals';
import { requestReroll } from '../../actions/roll.actions';
import Reroll from './Reroll';

const mapStateToProps = ({ diceSelected }: any) => {
	return {
		diceSelected
	};
}

const mapDispatchToProps = { 
	hideMsg,
	requestReroll
};

function RerollContainer({
	hideMsg,
	results,
	requestReroll,
	diceSelected
}: any) {
	const handleReroll = (itemsToStay: Array<number>) => {
		hideMsg();
		setTimeout(() => {
			requestReroll({ itemsToStay });
		}, 500);
	};

	console.log('RerollContainer - diceSelected', diceSelected);

	return (
		<Reroll
			handleReroll={handleReroll}
			results={results}
			diceSelected={diceSelected}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(RerollContainer);
