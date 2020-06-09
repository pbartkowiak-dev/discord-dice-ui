import React from 'react';
import './Dice.css';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card'
import getDieNumberVal from '../../utils/getDieNumberVal';

function getButtonLabel(diceType:string) {
	if (diceType === 'd100SL') {
		return 'd100 + SL';
	}
	if (diceType === 'd6conan') {
		return 'Combat Die';
	}
	if (diceType === 'd20conan-hl') {
		return 'Hit Location';
	}
	if (diceType === 'd20conan') {
		return 'd20';
	}
	if (diceType === 'd20conan-test') {
		return 'Skill Test';
	}
	return diceType;
}

function Dice({
	handleRollDice,
	diceType,
	rollOptions
} : DiceProps
) {
	const DropdownContent = ({ rollOptions }:any) => {
		const maxDiceInOneRoll = 8;
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
		)
	};

	const shouldUseButton = (diceType:string, rollOptions:any) => {
		if (
			diceType === 'd100SL' ||
			diceType=== 'd20conan-hl' ||
			diceType=== 'd20conan-test' ||
			(diceType=== 'd100' && rollOptions.cocMode)
		) {
			return true;
		}
		return false;
	}

	const buttonLabel = getButtonLabel(diceType);

	let extraMark = null; 
	if (diceType === 'd100SL') {
		extraMark = <span className="dice__extra-mark">SL</span>
	} else if (diceType === 'd5') {
		extraMark = <span className="dice__extra-mark">d5</span>
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
						<DropdownContent
							rollOptions={rollOptions} />
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