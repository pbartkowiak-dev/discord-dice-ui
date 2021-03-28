import React from 'react';
import './DiceModule.css';
import Dice from './Dice';
import getDiceSet from '../../utils/getDiceSet';
import { CONAN } from '../../consts/consts';
import { INFINITY } from '../../consts/consts';
import { WARHAMMER } from '../../consts/consts';
import { CLASSIC } from '../../consts/diceConstants';
import { COC } from '../../consts/consts';
import { FATE_DICE, FATE_DIE } from '../../consts/fateConsts';
import { DiceModuleProps } from './DiceTypes';

function DiceModule ({
	rollOptions,
	submitRoll
}: DiceModuleProps
) {
	const handleRollDice = (diceType: string, diceAmount?: number) => {
		let diceAmountToRoll: number;
		
		if (!diceAmount) {
			// 4 dice is default for Fate Dice
			if (diceType === FATE_DIE) {
				diceAmountToRoll = 4;
			} else {
				diceAmountToRoll = 1;
			}
		} else {
			diceAmountToRoll = diceAmount
		}

		submitRoll({
			diceType,
			diceAmount: diceAmountToRoll
		});
	};

	// @TODO MOVE TO ONE DICE SET GETTER
	let diceSetType;
	if (rollOptions.warhammerMode) {
		diceSetType = WARHAMMER;
	} else if(rollOptions.conanMode) {
		diceSetType = CONAN;
	} else if(rollOptions.infinityMode) {
		diceSetType = INFINITY;
	} else if (rollOptions.cthulhuMode) {
		diceSetType = COC;
	} else if (rollOptions.fateMode) {
		diceSetType = FATE_DICE;
	} else {
		diceSetType = CLASSIC;
	}

	const diceSet = getDiceSet(diceSetType);

	const diceSetElement = diceSet.map(({ diceType, label, diceImg, noDropdown }) => (
		<Dice
			key={diceType}
			diceType={diceType}
			diceImg={diceImg}
			label={label}
			handleRollDice={handleRollDice}
			noDropdown={noDropdown}
		/>
	));

	return (
		<div className="dice-module dice-list">
			{ diceSetElement }
		</div>
	);
}

export default DiceModule;
