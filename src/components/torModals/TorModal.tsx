import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import torStyles from "./TorModal.module.css";
import useTorStore, { State } from "../tor/store";
import InputRange from "../InputRange/InputRange";
import Form from "react-bootstrap/Form";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { torSkillDie } from "../../consts/torDice";
import PoolBuilderDie from "../PoolBuilder/PoolBuilderDie";
import { isValueValid } from "../WarhammerMoneyModal/WarhammerMoneyModal";
import { AdversaryRollTooltip, FavouredTooltip, IllFavouredTooltip, MiserableTooltip, WearyTooltip } from "./Tooltips";

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
			<Modal.Body className={torStyles.torModalBody}>
				<section className={torStyles.tnContainer}>
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
				</section>
				<section className={torStyles.favouredRollSection}>
					<div className={torStyles.checkboxContainer}>
						<Form.Check
							type="checkbox"
							name="Favoured Roll"
							id="Favoured Roll"
							label={<div><span>Favoured Roll</span> <FavouredTooltip /></div>}
							checked={isFavoured}
							onChange={() => setIsFavoured(!isFavoured)}
							disabled={isIllFavoured}
							custom
						/>
						<Form.Check
							type="checkbox"
							name="Ill-Favoured Roll"
							id="Ill-Favoured Roll"
							label={<div><span>Ill-Favoured Roll</span> <IllFavouredTooltip /></div>}
							checked={isIllFavoured}
							onChange={() => setIsIllFavoured(!isIllFavoured)}
							disabled={isFavoured}
							custom
						/>
					</div>
				</section>
				<section>
					<h5 className={torStyles.subheader}>Success Dice Number</h5>
					<div className={torStyles.poolBuilder}>
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
					</div>
				</section>
				<section>
					<h5 className={torStyles.subheader}>Conditions</h5>
					<div className={torStyles.checkboxContainer}>
						<Form.Check
							type="checkbox"
							name="Weary"
							id="Weary"
							label={<div><span>Weary</span> <WearyTooltip /></div>}
							checked={isWeary}
							onChange={() => setIsWeary(!isWeary)}
							custom
						/>
						<Form.Check
							type="checkbox"
							name="Miserable"
							id="Miserable"
							label={<div><span>Miserable</span> <MiserableTooltip /></div>}
							checked={isMiserable}
							onChange={() => setIsMiserable(!isMiserable)}
							custom
						/>
					</div>
				</section>
				<section>
					<h5 className={torStyles.subheader}>Loremaster's Tools</h5>
					<div className={torStyles.checkboxContainer}>
						<Form.Check
							type="checkbox"
							name="isOpposition"
							id="isOpposition"
							label="Rolling for an Adversary"
							checked={isAdversary}
							onChange={() => setIsAdversary(!isAdversary)}
							custom
						/>
						<AdversaryRollTooltip />
					</div>
				</section>
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
