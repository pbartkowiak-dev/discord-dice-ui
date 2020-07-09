import React from 'react';
import { connect } from 'react-redux';
import { showMsg, hideMsg } from '../../actions';
import Reroll from './Reroll';
import getWarhammerRequestMsg from '../../utils/getWarhammerRequestMsg';
import getWarhammerLocalMsg from '../../utils/getWarhammerLocalMsg';
import getConanRequestMsg from '../../utils/getConanRequestMsg';
import getConanLocalMsg from '../../utils/getConanLocalMsg';
import getRequestMsg from '../../utils/getRequestMsg';
import getLocalMsg from '../../utils/getLocalMsg';
import rollDice from '../../utils/rollDice';
import { request } from '../../utils/request';

const mapDispatchToProps = { showMsg, hideMsg };

function RerollContainer({
	rollOptions = {},
	userSettings,
	showMsg,
	hideMsg,
	results
}:any) {
	let reroll = (itemsToStay:Array<number>) => {};
	let diceType:number;
	let diceAmount:number;
	console.log('reroll rollOptions', rollOptions);
	if (rollOptions.warhammerMode) {
		diceType = 100;
	} else if (rollOptions.conanMode && !(rollOptions.diceTypeRaw === 'd6conan')) {
		diceAmount = Number(rollOptions.dice);
		diceType = 20;
	} else if (rollOptions.diceTypeRaw === 'd6conan') {
		diceAmount = Number(rollOptions.diceAmount);
		diceType = 6;
	} else {
		diceType = rollOptions.diceType;
	}	

	if (rollOptions.warhammerMode) {
		reroll = () => {
			const result = rollDice({
				diceType,
				rollOptions
			});
			const requestMsg = getWarhammerRequestMsg(result, rollOptions, userSettings);
			const localMsg = getWarhammerLocalMsg(result, rollOptions, userSettings);
		
			showMsg(localMsg);
			request(requestMsg);
		}
	} else if (rollOptions.conanMode && !(rollOptions.diceTypeRaw === 'd6conan')) {
		reroll = (itemsToStay:Array<number>) => {
			rollOptions.fortune = 0;
			const result = rollDice({
				diceType,
				diceAmount,
				rollOptions,
				itemsToStay
			});
			// const requestMsg = getConanRequestMsg(result.results, rollOptions, userSettings);
			const localMsg = getConanLocalMsg(result.results, rollOptions, userSettings);
		
			showMsg(localMsg);
			// request(requestMsg);
		}
	} else if (rollOptions.diceTypeRaw === 'd6conan') {
		reroll = (itemsToStay:Array<number>) => {
			const result = rollDice({
				diceType: 6,
				diceAmount,
				rollOptions,
				itemsToStay
			});
			// const requestMsg = getRequestMsg(result.results, rollOptions, userSettings);
			const localMsg = getLocalMsg(result.results, rollOptions, userSettings);
		
			showMsg(localMsg);
			// request(requestMsg);
		}
	}

	const handleReroll = (itemsToStay:Array<number>) => {
		hideMsg();
		rollOptions.rerolledTimes = !rollOptions.rerolledTimes ? 1 : rollOptions.rerolledTimes + 1;
		setTimeout(() => reroll(itemsToStay), 500);
	};

	return (
		<Reroll
			handleReroll={handleReroll}
			rollOptions={rollOptions}
			results={results}
		/>
	);
}

export default connect(undefined, mapDispatchToProps)(RerollContainer);
