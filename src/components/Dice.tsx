import React from 'react';
import './Dice.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card'

function Dice({
	handleRollDice,
	diceType
} : DiceProps
) {

	const diceTypeNum = diceType.replace(/\D/g,'');

	const DropdownContent = () => {
		const maxDiceInOneRoll = 4;
		const options =  new Array(maxDiceInOneRoll).fill('').map((_, index) => {
			const dicesWord = index === 0 ? 'dice' : 'dices';
			return (
				<Dropdown.Item onClick={ () => handleRollDice(diceTypeNum, index + 1) }>
					<span>Roll <strong>{index + 1}</strong> {dicesWord}</span>
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
					<DropdownButton id="dropdown-basic-button" title={diceType} className="dice-button">
						< DropdownContent />
				</DropdownButton>
			</Card.Footer>
		</Card>
	);
}

type DiceProps = {
	handleRollDice: Function,
	diceType: string
}

export default Dice;