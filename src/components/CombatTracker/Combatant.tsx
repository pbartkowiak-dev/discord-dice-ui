import React from "react";
import Draggable from 'react-draggable';
import classNames from "classnames";
import styles from './Combatant.module.css';
import useCombatTrackerStore, { CombatantTypes, CombatantTypesEditableFields } from "./store";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faCopy } from "@fortawesome/free-regular-svg-icons";
import { faGripHorizontal, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { validateCombatantFields } from "./utils/utils";
import { useSelector } from "react-redux";

interface InputProps {
	value: string | number;
	classname?: string;
	name: string;
	// onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onChange?: (event: any) => void;
	onKeyPress?: (event: any) => void;
	placeholder?: string;
	disabled?: boolean;
}

function Input ({
	value,
	classname,
	name,
	onChange,
	onKeyPress,
	placeholder = '',
	disabled = false
}: InputProps) {
	return (
		<input
			className={classNames([styles.input, classname])}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			disabled={disabled}
			onKeyPress={onKeyPress}
		/>
	);
}

function TextArea ({
	value,
	classname,
	name,
	onChange,
	onKeyPress,
	placeholder = '',
	disabled = false
}: InputProps) {
	return (
		<textarea
			className={classNames([styles.input, classname])}
			name={name}
			value={value}
			onChange={onChange}
			onKeyPress={onKeyPress}
			placeholder={placeholder}
			disabled={disabled}
		/>
	);
}

interface HpCounterProps {
	hp: number;
	hpMax: number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyPress: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function HpCounter ({ hp, hpMax, onChange, onKeyPress } : HpCounterProps) {
	return (
		<div className={styles.hpCounter}>
			<Input
				onKeyPress={onKeyPress}
				value={hp}
				name="hp"
				onChange={onChange}
				classname={classNames([styles.hpInput, styles.hpInputLeft])}
			/>
			<span>/</span>
			<Input
				onKeyPress={onKeyPress}
				value={hpMax}
				name="hpMax"
				onChange={onChange}
				classname={classNames([styles.hpInput, styles.hpInputRight])}
			/>
		</div>
	)
}

export default function Combatant({
	name,
	hp,
	initiative,
	wounds,
	conditions,
	id,
	zoneIndex,
	isLocked,
	hpMax,
	advantage
}: CombatantTypes) {
	const setIsDragging = useCombatTrackerStore(({ setIsDragging }) => setIsDragging);
	const setCombatantZone = useCombatTrackerStore(({ setCombatantZone }) => setCombatantZone);
	const forceUpdateCombatants = useCombatTrackerStore(({ forceUpdateCombatants }) => forceUpdateCombatants);
	const deleteCombatant = useCombatTrackerStore(({ deleteCombatant }) => deleteCombatant);
	const cloneCombatant = useCombatTrackerStore(({ cloneCombatant }) => cloneCombatant);
	const updateCombatant = useCombatTrackerStore(({ updateCombatant }) => updateCombatant);
	const lockCombatant = useCombatTrackerStore(({ lockCombatant }) => lockCombatant);
	const hoverZone = useCombatTrackerStore(({ hoverZone }) => hoverZone);

	const diceModuleForm = useSelector(({ form }: any) => form.diceModuleForm?.values);
	const showAdvantage = diceModuleForm?.warhammerMode;

	const handleStart = () => {
		setIsDragging(true);
	};

	const handleStop = () => {
		setIsDragging(false);

		if (hoverZone === null || zoneIndex === hoverZone) {
			forceUpdateCombatants()
		} else {
			setCombatantZone(id, hoverZone);
		}
	};

	const handleDelete = () => {
		deleteCombatant(id);
	};

	const handleClone = () => {
		cloneCombatant(id);
	};

	const handleLock = () => {
		lockCombatant(id);
	};

	const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
		const error = validateCombatantFields({
			[event.target.name]: event.target.value
		});

		if (!error) {
			updateCombatant(
				id,
				event.target.name as CombatantTypesEditableFields,
				event.target.value
			);
		}
	};

	// const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
	const handleKeyPress = (event: any) => {
		if (event.key === 'Enter') {
			event.target.blur();
		}
	}

	return (
		<Draggable
			handle=".handle"
			onStart={handleStart}
			onStop={handleStop}
		>
			<div className={styles.container}>
				<div className={classNames({
					[styles.table]: true,
					[styles.tableWithAdvantage]: showAdvantage
				})}>
					<div className={classNames({
						[styles.cell]: true,
						[styles.cellCenter]: true,
						[styles.dragHandle]: true,
						"handle": true
					})}>
						<FontAwesomeIcon
							icon={faGripHorizontal}
						/>
					</div>
					<div className={styles.cell}>
						<div>
							<Input
								onKeyPress={handleKeyPress}
								value={initiative}
								name="initiative"
								onChange={handleUpdate}
								classname={styles.initiativeInput}
							/>
							<div className={styles.initiativeLabel}>Ini</div>
						</div>
					</div>
					<div className={styles.cell}>
						<div className={styles.textareaContainer}>
							<Input
								onKeyPress={handleKeyPress}
								value={name}
								name="name"
								onChange={handleUpdate}
								classname={styles.nameInput}
							/>
						</div>
						<div className={styles.textareaContainer}>
							<TextArea
								value={conditions}
								onKeyPress={handleKeyPress}
								name="conditions"
								onChange={handleUpdate}
								classname={styles.textarea}
								placeholder="Conditions"
							/>
						</div>
					</div>
					{ showAdvantage && <div className={styles.cell}>
						 <div>
							<Input
								onKeyPress={handleKeyPress}
								value={advantage}
								name="advantage"
								onChange={handleUpdate}
								placeholder="0"
								classname={styles.initiativeInput}
							/>
							<div className={styles.initiativeLabel}>Adv</div>
						</div>
					</div> }
					<div className={styles.cell}>
						<div className={styles.hpRow}>
							<HpCounter
								hp={hp}
								hpMax={hpMax}
								onChange={handleUpdate}
								onKeyPress={handleKeyPress}
							/>
						</div>
						<div className={styles.textareaContainer}>
							<TextArea
								value={wounds}
								name="wounds"
								onChange={handleUpdate}
								onKeyPress={handleKeyPress}
								classname={styles.textarea}
								placeholder="Wounds"
							/>
						</div>
					</div>
					<div className={classNames([styles.cell, styles.cellCenter])}>
						<div className={styles.buttonRow}>
							<Button
								variant="outline-secondary"
								className={styles.button}
								onClick={handleLock}
							>
							<FontAwesomeIcon
								icon={isLocked ? faLock : faLockOpen}
							/>
						</Button>
							<Button
								variant="outline-success"
								className={styles.button}
								onClick={handleClone}
							>
								<FontAwesomeIcon
									icon={faCopy}
								/>
							</Button>
							<Button
								variant="outline-danger"
								className={styles.button}
								onClick={handleDelete}
							>
								<FontAwesomeIcon
									icon={faTrashAlt}
								/>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Draggable>
	);
}
