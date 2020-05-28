import React from 'react';
import './DiceModule.css';
import Dice from './Dice';
import DiceModuleOptions from './DiceModuleOptions';
import { request } from '../../utils/request';
import getRequestMsg from '../../utils/getRequestMsg';
import getLocalMsg from '../../utils/getLocalMsg';
import rollDice from '../../utils/rollDice';
import getDiceSet from '../../utils/getDiceSet';
import getDieNumberVal from '../../utils/getDieNumberVal';

type DiceModuleProps = {
	userSettings: any,
	rollOptions: any,
	showMsg: Function,
	openCoCModal: Function,
	openWarhammer4eModal: Function,
	openModifierModal: Function,
	selectDice: Function
};

function DiceModule ({
	userSettings,
	rollOptions,
	showMsg,
	openModifierModal,
	openCoCModal,
	openWarhammer4eModal,
	selectDice
}:DiceModuleProps
) {
	const handleRoll = (diceType:number, diceAmount:number) => {
		const result = rollDice({
			diceType,
			diceAmount,
			rollOptions,
			modifier: 0
		});
		const requestMsg = getRequestMsg(result, rollOptions, userSettings);
		const localMsg = getLocalMsg(result, rollOptions);

		showMsg(localMsg);
		request(requestMsg);
	};

	const handleRollDice = (diceType:string, diceAmount:number = 1) => {
		const diceTypeNum = getDieNumberVal(diceType);
	
		if (rollOptions.cocMode && diceType === 'd100') {
			openCoCModal();
			return;
		}
		if (diceType === 'd100SL') {
			openWarhammer4eModal();
			return;
		}
		if (rollOptions.useModifier) {
			selectDice({ diceTypeNum, diceAmount });
			openModifierModal();
		} else {
			handleRoll(diceTypeNum, diceAmount);
		}
	};

	console.log('rollOptions before get dice set', rollOptions);
	const diceSetType = rollOptions.warhammerMode ? 'warhammer' : 'classic';

	const diceSet = getDiceSet(diceSetType);
	console.log('diceSet', diceSet)
	const diceSetElement = diceSet.map((diceType:any)  => {
		return (
			<Dice
				key={diceType}
				diceType={diceType}
				handleRollDice={handleRollDice}
				rollOptions={rollOptions}
			/>
		);
	});

	return (
		<div className="dice-module-container">
			<DiceModuleOptions
				rollOptions={rollOptions}
			/>
			<div className="dice-module dice-list">
				{diceSetElement}
			</div>
		</div>
	);
}

export default DiceModule;