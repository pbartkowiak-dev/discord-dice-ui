import React from 'react';
import './DiceModule.css';
import Dice from './Dice';
import DiceModuleOptions from './DiceModuleOptions';
import getDiceSet, { SetTypes } from '../../utils/getDiceSet';
import { CONAN } from '../../consts/conanConstants';
import { WARHAMMER } from '../../consts/warhammerConstants';
import { CLASSIC } from '../../consts/diceConstants';
import { COC } from '../../consts/CoCConstants';

interface DiceModuleProps {
	rollOptions: any;
	submitRoll: Function;
};

function DiceModule ({
	rollOptions,
	submitRoll
}: DiceModuleProps
) {
	const handleRollDice = (diceType: string, diceAmount: number = 1) => {
		console.log('handleRollDice', diceType)
		submitRoll({
			diceType,
			diceAmount
		});
	};

	let diceSetType: SetTypes;
	if (rollOptions.warhammerMode) {
		diceSetType = WARHAMMER;
	} else if(rollOptions.conanMode) {
		diceSetType = CONAN;
	} else if (rollOptions.cocMode) {
		diceSetType = COC;
	} else {
		diceSetType = CLASSIC;
	}

	const diceSet = getDiceSet(diceSetType);
	const diceSetElement = diceSet.map((diceType: string)  => (
		<Dice
			key={diceType}
			diceType={diceType}
			handleRollDice={handleRollDice}
		/>
	));

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
