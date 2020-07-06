import React from 'react';
import { connect } from 'react-redux';
import { showMsg, hideMsg } from '../../actions';
import Reroll from './Reroll';
import getWarhammerRequestMsg from '../../utils/getWarhammerRequestMsg';
import getWarhammerLocalMsg from '../../utils/getWarhammerLocalMsg';
import getConanRequestMsg from '../../utils/getConanRequestMsg';
import getConanLocalMsg from '../../utils/getConanLocalMsg';
import rollDice from '../../utils/rollDice';
import { request } from '../../utils/request';

const mapDispatchToProps = { showMsg, hideMsg };

function RerollContainer({
	rollOptions ={},
	userSettings,
	showMsg,
	hideMsg
}:any) {
	let reroll = () => {};

	if (rollOptions.warhammerMode) {
		reroll = () => {
			const result = rollDice({
				diceType: 100,
				rollOptions
			});
			const requestMsg = getWarhammerRequestMsg(result, rollOptions, userSettings);
			const localMsg = getWarhammerLocalMsg(result, rollOptions, userSettings);
		
			showMsg(localMsg);
			request(requestMsg);
		}
	} else if (rollOptions.conanMode) {
		reroll = () => {
			const result = rollDice({
				diceType: 20,
				diceAmount: Number(rollOptions.dice),
				rollOptions
			});
			// const requestMsg = getConanRequestMsg(result.results, rollOptions, userSettings);
			const localMsg = getConanLocalMsg(result.results, rollOptions, userSettings);
		
			showMsg(localMsg);
			// request(requestMsg);
		}
	}

	const handleReroll = () => {
		hideMsg();
		rollOptions.rerolledTimes = !rollOptions.rerolledTimes ? 1 : rollOptions.rerolledTimes + 1;
		setTimeout(reroll, 500);
	};

	return (
		<Reroll handleReroll={handleReroll} />
	);
}

export default connect(undefined, mapDispatchToProps)(RerollContainer);