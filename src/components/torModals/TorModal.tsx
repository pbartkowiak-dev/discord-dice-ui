import React, { useState } from 'react';
import classNames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import torStyles from "./TorModal.module.css";
import useTorStore from "../tor/store";
import InputRange from "../InputRange/InputRange";
import Form from "react-bootstrap/Form";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import PoolBuilder from "../PoolBuilder/PoolBuilder";
import { torSkillDie } from "../../consts/torDice";
import PoolBuilderDie from "../PoolBuilder/PoolBuilderDie";
import { isValueValid } from "../WarhammerMoneyModal/WarhammerMoneyModal";


function TorModal() {
	const torState = useTorStore((torState: any) => torState);
	const { isModalOpen, closeModal } = torState;

	const tnInputId = 'tn-input'
	const tnMax = 20;
	const tnMin = 0;
	const skillDiceMax = 20;

	const [tn, setTn] = useState<string>('');
	const [isFavoured, setIsFavoured] = useState<boolean>(false);
	const [isIllFavoured, setIsIllFavoured] = useState<boolean>(false);
	const [isWeary, setIsWeary] = useState<boolean>(false);
	const [isMiserable, setIsMiserable] = useState<boolean>(false);
	const [skillDice, setSkillDice] = useState<number>(0);

	const isValid = () => {
		let isValid = true;
		const tnNumber = Number(tn);

		if (isNaN(tnNumber) || tnNumber <= 0 || tnNumber > tnMax) {
			isValid = false;
		}

		return isValid;
	}

	const onTnRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTn(event.target.value);
	};

	const onTnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputRange = document.getElementById(tnInputId) as HTMLInputElement;
		const { value } = event.target;
		const valueNumber = Number(value);

		if (valueNumber <= tnMax && !isNaN(valueNumber) && valueNumber >= tnMin) {
			if (inputRange) {
				inputRange.value = value;
			}
			setTn(value);
		}
	};

	const onChange = (_: any, event: any) => {
		const { value } = event.target;
		if (isValueValid(value) && value <= skillDiceMax) {
			setSkillDice(value);
		}
	};

	const onIncrease = () => {
		const newValue = Number(skillDice) + 1;
		if (newValue <= skillDiceMax) {
			setSkillDice(newValue);
		}
	};

	const onDecrease = () => {
		const newValue = Number(skillDice) - 1;
		if (newValue >= 0) {
			setSkillDice(newValue);
		}
	};

	return (
		<Modal show={isModalOpen} onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title>The One Ring 2e Roll Options</Modal.Title>
			</Modal.Header>
			<Modal.Body className={torStyles.torModalBody}>
				<div className={torStyles.checkboxContainer}>
					<Form.Check
						type="checkbox"
						name="Favoured Roll"
						id="Favoured Roll"
						label="Favoured Roll"
						checked={isFavoured}
						onChange={() => setIsFavoured(!isFavoured)}
						disabled={isIllFavoured}
						custom
					/>
					<Form.Check
						type="checkbox"
						name="Ill-Favoured Roll"
						id="Ill-Favoured Roll"
						label="Ill-Favoured Roll"
						checked={isIllFavoured}
						onChange={() => setIsIllFavoured(!isIllFavoured)}
						disabled={isFavoured}
						custom
					/>
				</div>
				<div className={torStyles.tnContainer}>
					<div className={torStyles.tnContainerInner}>
						<InfoTooltip
							content="Target Number"
							className={torStyles.tnInfoIcon}
						/>
						<Form.Control
							type="text"
							size="lg"
							placeholder="TN"
							autoComplete="off"
							onChange={onTnChange}
							value={tn}
							className={torStyles.tnInput}

						/>

					</div>
					<InputRange
						id={tnInputId}
						onChange={onTnRangeChange}
						hidePercent={true}
						max={tnMax}
						min={tnMin}
					/>
				</div>
				<h5 className={torStyles.subheader}>Skill Dice Number</h5>
				<PoolBuilderDie
					diceType={torSkillDie.diceType}
					noHeader={true}
					value={skillDice}
					onChange={onChange}
					onIncrease={onIncrease}
					onDecrease={onDecrease}
					isDiceImgLarge={false}
					hideBorder={true}
				/>
				<h5 className={torStyles.subheader}>Conditions</h5>
				<div className={torStyles.checkboxContainer}>
					<Form.Check
						type="checkbox"
						name="Weary"
						id="Weary"
						label="Weary"
						checked={isWeary}
						onChange={() => setIsWeary(!isWeary)}
						custom
					/>
					<Form.Check
						type="checkbox"
						name="Miserable"
						id="Miserable"
						label="Miserable"
						checked={isMiserable}
						onChange={() => setIsMiserable(!isMiserable)}
						custom
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeModal}>
					Cancel
				</Button>
				<Button
					variant="success"
					type="submit"
					disabled={!isValid()}
					>Roll!
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default TorModal;
