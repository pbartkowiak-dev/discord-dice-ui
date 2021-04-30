import React, { useState } from "react";
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
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();

	const handleRollDice = (diceType: string, diceAmount: number = 1) => {
		setShow(false);
		onToggle(false);

		dispatch(submitRoll({
			diceType,
			diceAmount
		}));
	};

	const toggle = () => {
		onToggle(!show);
		setShow(!show);
	};

	return (
		<Dropdown drop={"up"} show={show}>
			<Dropdown.Toggle
				variant="outline-primary"
				id="dropdown-roller"
				onClick={toggle}
			>
				<span>Roll the Dice</span>
			</Dropdown.Toggle>
			<Dropdown.Menu>
				<div> {
					commonDice.map(({ diceType, label }) => (
						<Dropdown.Item
							key={diceType}
							href="#"
						>
							<Dropdown drop={"right"}>
								<Dropdown.Toggle
									as="div"
									id="dropdown-roller-second-level"
								>
									<span>
										<img
											src={require(`../../img/${diceType}.png`)}
											className={styles.dieImg}
											alt={diceType}
										/>
										<strong>{label}</strong>
									</span>
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<div> {
										[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((diceAmount) => (
											<>
												<Dropdown.Item
													key={diceAmount}
													href="#"
													onClick={(e) => handleRollDice(diceType, diceAmount)}>
													<span>
														<img
															src={require(`../../img/${diceType}.png`)}
															className={styles.dieImgSecond}
															alt={diceType}
														/>
														Roll <strong>{diceAmount > 1 ? diceAmount : ''}{label}</strong>
													</span>
												</Dropdown.Item>
												{ diceAmount === 1 && <Dropdown.Divider /> }
											</>
										))
									} </div>
								</Dropdown.Menu>
							</Dropdown>


						</Dropdown.Item>
					))
				} </div>
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default DropdownRoller;