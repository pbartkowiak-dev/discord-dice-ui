import React from 'react';
import './DiceModule.css';
import Dice from './Dice';
import DiceModuleOptions from './DiceModuleOptions';
import getDiceSet from '../../utils/getDiceSet';
import { CONAN } from '../../consts/conanConstants';
import { WARHAMMER } from '../../consts/warhammerConstants';
import { CLASSIC } from '../../consts/diceConstants';

interface DiceModuleProps {
	rollOptions: any;
	submitRoll: Function;
};

function DiceModule ({
	rollOptions,
	submitRoll
}:DiceModuleProps
) {
	const handleRollDice = (diceType:string, diceAmount:number = 1) => {
		submitRoll({
			diceType,
			diceAmount
		})
	};

	let diceSetType;
	if (rollOptions.warhammerMode) {
		diceSetType = WARHAMMER;
	} else if(rollOptions.conanMode) {
			diceSetType = CONAN;
	} else {
		diceSetType = CLASSIC;
	}

	const diceSet = getDiceSet(diceSetType);
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
