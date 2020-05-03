import React from 'react';
import './Dice.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card'

function Dice({
	handleRollDice,
	diceType,
	rollOptions
} : DiceProps
) {

	const diceTypeNum = diceType.replace(/\D/g,'');

	const DropdownContent = ({ rollOptions }:any) => {
		const maxDiceInOneRoll = 5;
		const options =  new Array(maxDiceInOneRoll).fill('').map((_, index) => {
			const isDisabled = rollOptions.cocMode && Number(diceTypeNum) === 100 && index > 0;
			const dieWord = index === 0 ? 'die' : 'dice';
			return (
				<Dropdown.Item
					key={index}
					disabled={isDisabled}
					onClick={ () => handleRollDice(diceTypeNum, index + 1) }>
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

	return (
		<Card className={`dice dice--${diceType}`}>
			<Card.Body>
				<div className="dice__image" onClick={() => handleRollDice(diceTypeNum) }></div>
			</Card.Body>
			<Card.Footer>
					<DropdownButton
						id="dropdown-basic-button"
						type="success"
						title={diceType}
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