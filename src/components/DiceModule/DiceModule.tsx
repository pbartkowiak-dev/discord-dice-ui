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
import { D6_CONAN, D20_CONAN_TEST, D20_CONAN_HL, CONAN } from '../../consts/conanConstants';
import { D100_SL, WARHAMMER } from '../../consts/warhammerConstants';
import { CLASSIC, D100 } from '../../consts/diceConstants';

type DiceModuleProps = {
	userSettings: any,
	rollOptions: any,
	showMsg: Function,
	openCoCModal: Function,
	openWarhammerModal: Function,
	openModifierModal: Function,
	openConanModal: Function,
	selectDice: Function
};

function DiceModule ({
	userSettings,
	rollOptions,
	showMsg,
	openModifierModal,
	openCoCModal,
	openWarhammerModal,
	openConanModal,
	selectDice
}:DiceModuleProps
) {
	const handleRoll = (diceType:number, diceAmount:number, diceTypeRaw:string) => {
		rollOptions.rerolledTimes = 0;
		rollOptions.diceTypeRaw = diceTypeRaw;
		rollOptions.diceType = diceType;
		rollOptions.diceAmount = diceAmount;

		const result = rollDice({
			diceType,
			diceAmount,
			rollOptions,
			modifier: 0
		});
		const requestMsg = getRequestMsg(result, rollOptions, userSettings);
		const localMsg = getLocalMsg(result, rollOptions, userSettings);

		showMsg(localMsg);
		request(requestMsg);
	};

	const handleRollDice = (diceType:string, diceAmount:number = 1) => {
		const diceTypeNum = getDieNumberVal(diceType);

		if (rollOptions.cocMode && diceType === D100) {
			openCoCModal();
			return;
		}
		if (diceType === D100_SL) {
			openWarhammerModal();
			return;
		}
		if (diceType === D20_CONAN_TEST) {
			openConanModal();
			return;
		}
		if (diceType === D6_CONAN || diceType === D20_CONAN_HL) {
			rollOptions.useModifier = false;
		}

		if (rollOptions.useModifier) {
			selectDice({
				diceType: diceTypeNum,
				diceAmount
			});
			openModifierModal();
		} else {
			handleRoll(diceTypeNum, diceAmount, diceType);
		}
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