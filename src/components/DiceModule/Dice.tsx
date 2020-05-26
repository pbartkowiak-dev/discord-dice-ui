import React from 'react';
import './Dice.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card'
import getDieNumberVal from '../../utils/getDieNumberVal';

function Dice({
	handleRollDice,
	diceType,
	rollOptions
} : DiceProps
) {

	console.log('diceType', diceType);

	const diceTypeNum = getDieNumberVal(diceType);

	// if (!isNaN(diceTypeNum) {

	// }

	const DropdownContent = ({ rollOptions }:any) => {
		const maxDiceInOneRoll = 5;
		const options =  new Array(maxDiceInOneRoll).fill('').map((_, index) => {
			const isDisabled = (rollOptions.cocMode || rollOptions.warhammer4eMode) && diceTypeNum === 100 && index > 0;
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

	const buttonLabel = diceType === 'd100SL' ? 'd100 + SL' : diceType;

	const extraMark =  diceType === 'd100SL' ? <span className="dice__extra-mark">SL</span> : null;

	return (
		<Card className={`dice dice--${diceType}`}>
			<Card.Body>
				{ extraMark }
				<div className="dice__image" onClick={() => handleRollDice(diceType) }></div>
			</Card.Body>
			<Card.Footer>
					<DropdownButton
						id="dropdown-basic-button"
						type="success"
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