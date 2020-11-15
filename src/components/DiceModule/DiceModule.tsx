import React from 'react';
import './DiceModule.css';
import Dice from './Dice';
import getDiceSet from '../../utils/getDiceSet';
import { CONAN } from '../../consts/consts';
import { WARHAMMER } from '../../consts/consts';
import { CLASSIC } from '../../consts/diceConstants';
import { COC } from '../../consts/consts';
import { DiceModuleProps, DiceSetType } from './DiceTypes';

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
	let diceSetType;
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

	const diceSetElement = diceSet.map(({ diceType, label, extraMark, diceImg }) => (
		<Dice
			key={diceType}
			diceType={diceType}
			diceImg={diceImg}
			label={label}
			extraMark={extraMark}
			handleRollDice={handleRollDice}
		/>
	));

	return (
		<div className="dice-module dice-list">
			{ diceSetElement }
		</div>
	);
}

export default DiceModule;
