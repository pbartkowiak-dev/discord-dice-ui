import React from 'react';
import './Dice.css';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import {
	D6_CONAN,
	D20_CONAN,
	D20_CONAN_TEST,
	D20_CONAN_HL,
	COMBAT_DIE,
	HIT_LOCATION
} from '../../consts/conanConstants';
import { D100_SL } from '../../consts/warhammerConstants';
import { D100, D20, D5, SKILL_TEST } from '../../consts/diceConstants';

function getButtonLabel(diceType:string, cocMode?:boolean) {
	if (diceType === D100_SL) {
		return SKILL_TEST;
	}
	if (diceType === D6_CONAN) {
		return COMBAT_DIE;
	}
	if (diceType === D20_CONAN_HL) {
		return HIT_LOCATION;
	}
	if (diceType === D20_CONAN) {
		return D20;
	}
	if (diceType === D20_CONAN_TEST) {
		return SKILL_TEST;
	}
	if (diceType === D100 && cocMode) {
		return SKILL_TEST;
	}
	return diceType;
}

function Dice({
	handleRollDice,
	diceType,
	rollOptions
} : DiceProps
) {
	const DropdownContent = () => {
		const maxDiceInOneRoll = diceType === D6_CONAN ? 15: 10;
		const options =  new Array(maxDiceInOneRoll).fill('').map((_, index) => {
			const dieWord = index === 0 ? 'die' : 'dice';
			return (
				<Dropdown.Item
					key={index}
					onClick={ () => handleRollDice(diceType, index + 1) }>
					<span>Roll <strong>{index + 1}</strong> {dieWord}</span>
				</Dropdown.Item>
			);
		});
		return (
			<>
				{options}
			</>
		);
	};

	const shouldUseButton = (diceType:string, rollOptions:any) => {
		if (
			diceType === D100_SL ||
			diceType=== D20_CONAN_HL ||
			diceType=== D20_CONAN_TEST ||
			(diceType=== D100 && rollOptions.cocMode)
		) {
			return true;
		}
		return false;
	}

	const buttonLabel = getButtonLabel(diceType, rollOptions.cocMode);

	let extraMark = null; 
	if (diceType === D100_SL) {
		extraMark = <span className="dice__extra-mark">SL</span>;
	} else if (diceType === D5) {
		extraMark = <span className="dice__extra-mark">d5</span>;
	}

	return (
		<Card className={`dice dice--${diceType}`}>
			<Card.Body>
				{ extraMark }
				<div className="dice__image" onClick={() => handleRollDice(diceType) }></div>
			</Card.Body>
			<Card.Footer>
				{
					shouldUseButton(diceType, rollOptions) 
					? <Button
						onClick={ () => handleRollDice(diceType, 1) }
						variant="primary">{buttonLabel}</Button>
					: <DropdownButton
							id="dropdown-basic-button"
							variant="primary"
							title={buttonLabel}
							className="dice-button">
						<DropdownContent />
					</DropdownButton>
				}

			</Card.Footer>
		</Card>
	);
}

type DiceProps = {
	handleRollDice: Function
	diceType: string
	rollOptions: any
}

export default Dice;