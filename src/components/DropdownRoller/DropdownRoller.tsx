import React from "react";
import { Dropdown } from "react-bootstrap";
import classNames from "classnames";
import { commonDice } from '../../consts/diceSets';
import { useDispatch } from "react-redux";
import { submitRoll } from "../../actions/roll.actions";
import styles from './DropdownRoller.module.css';

interface DropdownRoller {
	onToggle: (isOpen: boolean) => void;
}

function DropdownRoller({ onToggle } : DropdownRoller) {
	const dispatch = useDispatch();
	// @TODO MOVE TO UTILS/CREATE HOOK
	const handleRollDice = (diceType: string, diceAmount: number = 1) => {
		dispatch(submitRoll({
			diceType,
			diceAmount
		}));
	}

	return (
		<Dropdown drop={"up"} onToggle={onToggle}>
			<Dropdown.Toggle
				variant="outline-primary"
				id="dropdown-roller"
			>
				<span>Roll the dice</span>
			</Dropdown.Toggle>
			<Dropdown.Menu>
				<div className=""> {
					commonDice.map(({ diceType, label }) => (
						<Dropdown.Item
							key={diceType}
							href="#"
							onClick={(e) => handleRollDice(diceType)}>
							<div>
								<img src={require(`../../img/${diceType}.png`)} className={styles.dieImg }/>
								Roll <strong>{label}</strong>
							</div>
						</Dropdown.Item>
					))
				} </div>
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default DropdownRoller;