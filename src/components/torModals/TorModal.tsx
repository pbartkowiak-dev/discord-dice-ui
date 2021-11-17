import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import torStyles from "./TorModal.module.css";
import useTorStore, { State } from "../tor/store";
import InputRange from "../InputRange/InputRange";
import Form from "react-bootstrap/Form";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { torSuccessDie } from "../../consts/torDice";
import PoolBuilderDie from "../PoolBuilder/PoolBuilderDie";
import { isValueValid } from "../WarhammerMoneyModal/WarhammerMoneyModal";
import { AdversaryRollTooltip, FavouredTooltip, IllFavouredTooltip, MiserableTooltip, WearyTooltip } from "./Tooltips";
import classNames from "classnames";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => {
	const torStore = useTorStore((torStore: State) => torStore);
	const {
		isModalOpen,
		closeModal,
		rollDice,
		tn,
		successDiceAmount,
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
		setSuccessDiceAmount,
		setModifier,
		modifier,
	} = torStore;

	const tnInputId = 'tn-input'
	const tnMax = 20;
	const tnMin = 0;
	const successDiceAmountMax = 20;
	const modifierMax = 10;
	const modifierMin = -10;

	useEffect(() => {
		if (isModalOpen && tn) {
			const inputRange = document.getElementById(tnInputId) as HTMLInputElement;
			if (inputRange) {
				inputRange.value = tn;
			}
		}
	}, [isModalOpen]);

	const isValid = () => {
		let isValid = true;
		const tnNumber = Number(tn);
		const successDiceAmountNumber = Number(successDiceAmount);

		if (isNaN(tnNumber) || tnNumber <= 0 || tnNumber > tnMax) {
			isValid = false;
		}
		if (isNaN(successDiceAmountNumber) || successDiceAmountNumber < 0 || successDiceAmountNumber > successDiceAmountMax) {
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

	const onChange = (type: 'successDie' | 'modifier', event: any) => {
		const value = Number(event.target.value);
		if (type === 'modifier') {
			if (isValueValid(event.target.value) && value <= modifierMax && value >= modifierMin) {
				setModifier(`${value}`);
			}
		} else {
			if (isValueValid(event.target.value) && value <= successDiceAmountMax) {
				setSuccessDiceAmount(`${value}`);
			}
		}
	};

	const onIncrease = (type: 'successDie' | 'modifier') => {
		if (type === 'modifier') {
			const value = Number(modifier) + 1;
			if (value <= modifierMax) {
				setModifier(`${value}`)
			}
		} else {
			const value = Number(successDiceAmount) + 1;
			if (value <= successDiceAmountMax) {
				setSuccessDiceAmount(`${value}`);
			}
		}
	};

	const onDecrease = (type: 'successDie' | 'modifier') => {
		if (type === 'modifier') {
			const value = Number(modifier) - 1;
			if (value >= modifierMin) {
				setModifier(`${value}`);
			}
		} else {
			const value = Number(successDiceAmount) - 1;
			if (value >= 0) {
				setSuccessDiceAmount(`${value}`);
			}
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
					<h5 className={classNames(torStyles.subheader, torStyles.subheader__split)}><span>Success Dice Number</span><span>/</span><span>Modifier</span></h5>
					<div className={torStyles.poolBuilder}>
						<div className={torStyles.poolBuilderCol}>
							<PoolBuilderDie
								diceType={torSuccessDie.diceType}
								noHeader={true}
								value={successDiceAmount}
								onChange={(_:any, event: any) => onChange('successDie', event)}
								onIncrease={() => onIncrease('successDie')}
								onDecrease={() => onDecrease('successDie')}
								isDiceImgLarge={false}
								hideBorder={true}
							/>
						</div>
						<div className={classNames(torStyles.poolBuilderCol, torStyles.poolBuilderIcon)}>
							<FontAwesomeIcon icon={faPlus} />
						</div>
						<div className={torStyles.poolBuilderCol}>
							<PoolBuilderDie
								value={modifier}
								onChange={(_:any, event: any) => onChange('modifier', event)}
								onIncrease={() => onIncrease('modifier')}
								onDecrease={() => onDecrease('modifier')}
								noImage={true}
								variant={"secondary"}
								isDiceImgLarge={false}
								showBigNumber={true}
							/>
						</div>
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
