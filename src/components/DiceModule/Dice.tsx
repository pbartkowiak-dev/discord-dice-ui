import React from 'react';
import './Dice.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card'
import getDieNumberVal from '../../utils/getDieNumberVal';

function getButtonLabel(diceType:string) {
	if (diceType === 'd100SL') {
		return 'd100 + SL';
	}
	if (diceType === 'd6conan') {
		return 'd6 Combat Die';
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
	const diceTypeNum = getDieNumberVal(diceType);

	const DropdownContent = ({ rollOptions }:any) => {
		const maxDiceInOneRoll = 8;
		const options =  new Array(maxDiceInOneRoll).fill('').map((_, index) => {
			const isDisabled = ((
					(rollOptions.cocMode && diceTypeNum === 100) ||
					(diceType === 'd100SL')
				) &&
				index > 0
			);
			const dieWord = index === 0 ? 'die' : 'dice';
			return (
				<Dropdown.Item
					key={index}
					disabled={isDisabled}
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
				<DropdownButton
					id="dropdown-basic-button"
					variant="primary"
					title={buttonLabel}
					className="dice-button">
						<DropdownContent
							rollOptions={rollOptions} />
				</DropdownButton>
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