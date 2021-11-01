import React, { useState } from 'react';
import classNames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from "./TorModal.module.css";
import useTorStore, { State } from "../tor/store";
import InputRange from "../InputRange/InputRange";
import Form from "react-bootstrap/Form";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { EYE_SCORE, GANDALF_SCORE, torSkillDie } from "../../consts/torDice";
import PoolBuilderDie from "../PoolBuilder/PoolBuilderDie";
import { isValueValid } from "../WarhammerMoneyModal/WarhammerMoneyModal";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GandalfRune from "./GandalfRune";

export default () => {
	const torStore = useTorStore((torStore: State) => torStore);
	const { isModalOpen, closeModal, rollDice } = torStore;

	const tnInputId = 'tn-input'
	const tnMax = 20;
	const tnMin = 0;
	const skillDiceAmountMax = 20;

	const [tn, setTn] = useState<string>('');
	const [skillDiceAmount, setSkillDice] = useState<number>(0);
	const [isFavoured, setIsFavoured] = useState<boolean>(false);
	const [isIllFavoured, setIsIllFavoured] = useState<boolean>(false);
	const [isWeary, setIsWeary] = useState<boolean>(false);
	const [isMiserable, setIsMiserable] = useState<boolean>(false);
	const [isAdversary, setIsAdversary] = useState<boolean>(false);

	const isValid = () => {
		let isValid = true;
		const tnNumber = Number(tn);
		const skillDiceAmountNumber = Number(skillDiceAmount);

		if (isNaN(tnNumber) || tnNumber <= 0 || tnNumber > tnMax) {
			isValid = false;
		}
		if (isNaN(skillDiceAmountNumber) || skillDiceAmountNumber <= 0 || skillDiceAmountNumber > skillDiceAmountMax) {
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
		if (isValueValid(value) && value <= skillDiceAmountMax) {
			setSkillDice(value);
		}
	};

	const onIncrease = () => {
		const newValue = Number(skillDiceAmount) + 1;
		if (newValue <= skillDiceAmountMax) {
			setSkillDice(newValue);
		}
	};

	const onDecrease = () => {
		const newValue = Number(skillDiceAmount) - 1;
		if (newValue >= 0) {
			setSkillDice(newValue);
		}
	};

	const onSubmit = () => {
		rollDice({
			tn: Number(tn),
			skillDiceAmount: Number(skillDiceAmount),
			isFavoured,
			isIllFavoured,
			isWeary,
			isMiserable,
			isAdversary,
		});

		closeModal();
	};

	return (
		<Modal show={isModalOpen} onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title>The One Ring 2e Roll Options</Modal.Title>
			</Modal.Header>
			<Modal.Body className={styles.torModalBody}>
				<div className={styles.checkboxContainer}>
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
				<div className={styles.tnContainer}>
					<div className={styles.tnContainerInner}>
						<InfoTooltip
							content="Target Number"
							className={styles.tnInfoIcon}
						/>
						<Form.Control
							type="text"
							size="lg"
							placeholder="TN"
							autoComplete="off"
							onChange={onTnChange}
							value={tn}
							className={styles.tnInput}
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
				<h5 className={styles.subheader}>Skill Dice Number</h5>
				<PoolBuilderDie
					diceType={torSkillDie.diceType}
					noHeader={true}
					value={skillDiceAmount}
					onChange={onChange}
					onIncrease={onIncrease}
					onDecrease={onDecrease}
					isDiceImgLarge={false}
					hideBorder={true}
				/>
				<h5 className={styles.subheader}>Conditions</h5>
				<div className={styles.checkboxContainer}>
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
				<h5 className={styles.subheader}>Loremaster's Tools</h5>
				<div className={styles.checkboxContainer}>
					<Form.Check
						type="checkbox"
						name="isOpposition"
						id="isOpposition"
						label="Rolling for an Adversary"
						checked={isAdversary}
						onChange={() => setIsAdversary(!isAdversary)}
						custom
					/>
					<InfoTooltip content={(
						<span>
							When rolling for <strong>an Adversary</strong>, the <FontAwesomeIcon icon={faEye} /> icon (<strong>{EYE_SCORE}</strong>) becomes the highest result possible, while the <GandalfRune  style={{ fill: '#fff' }} /> rune (<strong>{GANDALF_SCORE}</strong>) becomes the lowest result possible and is read&nbsp;as&nbsp;<strong>0</strong>.
						</span>
					)} />
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
					onClick={onSubmit}
					>Roll!
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
