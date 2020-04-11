import React from 'react';
import './DiceModule.css';
import { classic } from '../consts/diceSets';
import Dice from './Dice';
import DiceModuleOptions from './DiceModuleOptions';
import rollDice from '../utils/rollDice';
import { requestParams, request } from '../utils/request';

function DiceModule ({userSettings, rollOptions, showMsg}:DiceModuleProps) {
	console.log('rollOptions', rollOptions)
	const handleRollDice = (diceType:number, diceAmount:number = 1, modifier:number = 0) => {
		const keepUnits = true;
		const result = rollDice(diceType, diceAmount, keepUnits);
		const resultsWord = diceAmount > 1 ? 'results' : 'result';
		const rolled = `${diceAmount}d${diceType}${modifier ? '+'+modifier : '' }`;
		const username = userSettings.username || 'USERNAME_MISSING'
		const msgTitle = `${username} rolled \`${rolled}\` ${resultsWord}: \`${result.join(', ')}\`.`
		const fields = [];

		if (rollOptions.sumResults) {
			fields.push({
				name: ':arrow_right: Sum',
				value: `Total: \`${result.reduce((a, b) => a + b, modifier)}\`.`
			});
		}
		if (rollOptions.keepHighest) {
			fields.push({
				name: ':arrow_up: Highest',
				value: `Highest result: \`${Math.max(...result)}\`.`
			});
		}
		if (rollOptions.keepLowest) {
			fields.push({
				name: ':arrow_down: Lowest',
				value: `Lowest result: \`${Math.min(...result)}\`.`
			});
		}
		if (rollOptions.cocBonus) {
			fields.push({
				name: ':arrow_heading_up: Bonus Dice',
				value: `Bonus Dice result: \`${Math.max(...result)}\`.`
			});
		}
		if (rollOptions.cocPenalty) {
			fields.push({
				name: ':arrow_heading_down: Penalty Dice',
				value: `Penalty Dice result: \`${Math.min(...result)}\`.`
			});
		}
		const msgParams:requestParams = {
			hookUrl: userSettings.hookUrl,
			msgTitle,
			color: userSettings.userColor,
			fields
		};
		showMsg(msgParams);
		request(msgParams);
	}

	const diceSet = classic.map(diceType => {
		return (
			<Dice
				key={diceType}
				diceType={diceType}
				handleRollDice={handleRollDice}
			/>
		);
	});

	return (
		<div className="dice-module-container">
			<DiceModuleOptions/>
			<div className="dice-module dice-list">
				{diceSet}
			</div>
		</div>
	);
}

type DiceModuleProps = {
	userSettings: any,
	rollOptions:any,
	showMsg: Function
};

export default DiceModule;