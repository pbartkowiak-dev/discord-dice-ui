import React from 'react';
import { connect } from 'react-redux';
import { showMsg, hideMsg } from '../../actions';
import WarhammerReroll from './WarhammerReroll';
import getWarhammerRequestMsg from '../../utils/getWarhammerRequestMsg';
import getWarhammerLocalMsg from '../../utils/getWarhammerLocalMsg';
import rollDice from '../../utils/rollDice';
import { request } from '../../utils/request';

const mapDispatchToProps = { showMsg, hideMsg };

function WarhammerRerollContainer({
	// props
	rollOptions ={},
	userSettings,
	// dispatch props
	showMsg,
	hideMsg
}:any) {

	const handleReroll = () => {
		hideMsg();
		rollOptions.rerolledTimes = !rollOptions.rerolledTimes ? 1 : rollOptions.rerolledTimes + 1;
		setTimeout(() => {
			const result = rollDice({
				diceType: 100,
				rollOptions
			});
			const requestMsg = getWarhammerRequestMsg(result, rollOptions, userSettings);
			const localMsg = getWarhammerLocalMsg(result, rollOptions, userSettings);
		
			showMsg(localMsg);
			request(requestMsg);
		}, 500);
	};

	return (
		<WarhammerReroll handleReroll={handleReroll} />
	);
}

export default connect(undefined, mapDispatchToProps)(WarhammerRerollContainer);