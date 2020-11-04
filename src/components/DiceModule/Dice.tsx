import React from 'react';
import './Dice.css';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import {
	D6_CONAN,
	D20_CONAN_TEST,
	D20_CONAN_HL	
} from '../../consts/conanConstants';
import { D100_SL } from '../../consts/warhammerConstants';
import { D5 } from '../../consts/diceConstants';
import getButtonLabel from '../../utils/getButtonLabel';

interface DicePropTypes {
	handleRollDice: Function;
	diceType: string;
}

function Dice({
	handleRollDice,
	diceType
}: DicePropTypes
) {
	const DropdownContent = () => {
		const maxDiceInOneRoll = diceType === D6_CONAN ? 15 : 10;
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

	const shouldUseButton = (dt:string) => dt === D100_SL || dt=== D20_CONAN_HL || dt=== D20_CONAN_TEST;

	const buttonLabel = getButtonLabel(diceType);

	let extraMark = null; 
	if (diceType === D5) {
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
					shouldUseButton(diceType) 
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

export default Dice;
