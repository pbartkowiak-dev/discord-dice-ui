import React from 'react';
import './DiceModule.css';
import { classic } from '../consts/diceSets';
import Dice from './Dice';
import DiceModuleOptions from './DiceModuleOptions';
import { request } from '../utils/request';
import getMsgParams from '../utils/getMsgParams';

type DiceModuleProps = {
	userSettings: any,
	rollOptions: any,
	showMsg: Function,
	openModifierModal: Function,
	selectDice: Function
};

function DiceModule ({
	userSettings,
	rollOptions,
	showMsg,
	openModifierModal,
	selectDice
}:DiceModuleProps) {
	const handleRoll = (diceType:number, diceAmount:number = 1,  modifier:number = 0) => {
		const msgParams = getMsgParams({
			diceType,
			diceAmount,
			modifier,
			rollOptions,
			userSettings
		});
		showMsg(msgParams);
		request(msgParams);
	}

	const handleRollDice = (diceType:number, diceAmount:number = 1) => {
		if (rollOptions.addModifier) {
			selectDice({ diceType, diceAmount });
			openModifierModal();
		} else {
			handleRoll(diceType, diceAmount, 0);
		}
	};

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

export default DiceModule;