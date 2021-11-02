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
	const {
		isModalOpen,
		closeModal,
		rollDice,
		tn,
		skillDiceAmount,
		isFavoured,
		isIllFavoured,
		isWeary,
		isMiserable,
		isAdversary,
		setTn,
		setIsFavoured,
		setIsIllFavoured,
		setIsWeary,
		setIsMiserable,
		setIsAdversary,
		setSkillDiceAmount,
	} = torStore;

	const tnInputId = 'tn-input'
	const tnMax = 20;
	const tnMin = 0;
	const skillDiceAmountMax = 20;

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
		const value = Number(event.target.value);
		if (isValueValid(event.target.value) && value <= skillDiceAmountMax) {
			setSkillDiceAmount(`${value}`);
		}
	};

	const onIncrease = () => {
		const newValue = Number(skillDiceAmount) + 1;
		if (newValue <= skillDiceAmountMax) {
			setSkillDiceAmount(`${newValue}`);
		}
	};

	const onDecrease = () => {
		const newValue = Number(skillDiceAmount) - 1;
		if (newValue >= 0) {
			setSkillDiceAmount(`${newValue}`);
		}
	};

	const onSubmit = () => {
		rollDice();
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
						label={(
							<div>
								<span>Favoured Roll</span>
								<InfoTooltip content={(
									<span>When a roll is <strong>Favoured</strong>, players roll two Feat Dice instead of one, keeping the best result.</span>
								)} />
							</div>
						)}
						checked={isFavoured}
						onChange={() => setIsFavoured(!isFavoured)}
						disabled={isIllFavoured}
						custom
					/>
					<Form.Check
						type="checkbox"
						name="Ill-Favoured Roll"
						id="Ill-Favoured Roll"
						label={(
							<div>
								<span>Ill-Favoured Roll</span>
								<InfoTooltip content={(
									<span>When a roll is <strong>Ill-Favoured</strong>, players roll two Feat Dice instead of one, keeping the worst result.</span>
								)} />
							</div>
						)}
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
				<h5 className={styles.subheader}>Success Dice Number</h5>
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
						label={(
							<div>
								<span>Weary</span>
								<InfoTooltip content={(
									<span>When a hero is <strong>Weary</strong>, all the Success Dice showing <strong>1</strong>, <strong>2</strong>, or <strong>3</strong> are considered as a result of <strong>0</strong> instead.</span>
								)} />
							</div>
						)}
						checked={isWeary}
						onChange={() => setIsWeary(!isWeary)}
						custom
					/>
					<Form.Check
						type="checkbox"
						name="Miserable"
						id="Miserable"
						label={(
							<div>
								<span>Miserable</span>
								<InfoTooltip content={(
									<span>When a hero is <strong>Miserable</strong>, the roll is considered a Failure if a Feat Die shows the <FontAwesomeIcon icon={faEye} /> icon (<strong>{EYE_SCORE}</strong>), regardless of the total result obtained by the roll.</span>
								)} />
							</div>
						)}
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
						<span>When rolling for <strong>an Adversary</strong>, the <FontAwesomeIcon icon={faEye} /> icon (<strong>{EYE_SCORE}</strong>) becomes the highest result possible, while the <GandalfRune  style={{ fill: '#fff' }} /> rune (<strong>{GANDALF_SCORE}</strong>) becomes the lowest result possible and is read&nbsp;as&nbsp;<strong>0</strong>.</span>
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