import React from 'react';
import './DiceModule.css';
import Dice from './Dice';
import DiceModuleOptions from './DiceModuleOptions';
import getDiceSet from '../../utils/getDiceSet';
import { CONAN } from '../../consts/consts';
import { WARHAMMER } from '../../consts/consts';
import { CLASSIC } from '../../consts/diceConstants';
import { COC } from '../../consts/consts';
import { DiceModuleProps, SetTypes } from './DiceTypes';

function DiceModule ({
	rollOptions,
	submitRoll
}: DiceModuleProps
) {
	const handleRollDice = (diceType: string, diceAmount: number = 1) => {
		submitRoll({
			diceType,
			diceAmount
		});
	};

	// @TODO MOVE TO ONE DICE SET GETTER
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

	const diceSetElement = diceSet.map(({ diceType, label, extraMark, imageFilename }) => (
		<Dice
			key={diceType}
			diceType={diceType}
			label={label}
			imageFilename={imageFilename}
			extraMark={extraMark}
			handleRollDice={handleRollDice}
		/>
	));

	return (
		<div className="dice-module-container">
			<DiceModuleOptions
				rollOptions={rollOptions}
			/>
			<div className="dice-module dice-list">
				{ diceSetElement }
			</div>
		</div>
	);
}

export default DiceModule;
