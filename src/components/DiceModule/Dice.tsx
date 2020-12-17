import React from 'react';
import './Dice.css';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import { D6_CONAN } from '../../consts/diceConstants';
import { DicePropTypes } from './DiceTypes';

function Dice({
	handleRollDice,
	diceType,
	label,
	extraMark,
	diceImg,
	noDropdown
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

	const diceImgFileName = diceImg || `${diceType}.png`;

	return (
		<Card className={`dice dice--${diceType}`}>
			<Card.Body>
				{ extraMark && <span className="dice__extra-mark">{ extraMark }</span> }
				<Card.Img
					variant="top"
					className="dice__image"
					onClick={() => handleRollDice(diceType) }
					src={require(`../../img/${diceImgFileName}`)}
				/>
			</Card.Body>
			<Card.Footer>
				{ noDropdown
					? <Button
						onClick={ () => handleRollDice(diceType, 1) }
						variant="primary">{label}
					</Button>
					: <DropdownButton
							id="dropdown-basic-button"
							variant="primary"
							title={label}
							className="dice-button">
						<DropdownContent />
					</DropdownButton>
				}
			</Card.Footer>
		</Card>
	);
}

export default Dice;
