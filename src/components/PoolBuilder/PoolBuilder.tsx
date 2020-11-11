import React, { useState } from 'react';
import PoolBuilderDie from './PoolBuilderDie'
import styles from './PoolBuilder.module.css';
import { MODIFIER, POOL } from '../../consts/diceConstants';
import getDiceSet from '../../utils/getDiceSet';

function PoolBuilder({
	rollOptions,
	handleSubmit
}: any) {
	const [poolState, setPoolState] = useState({});
	const [modifierState, setModifierState] = useState('0');

	const diceSetType = POOL;
	const diceSet = getDiceSet(diceSetType);

	const isPoolValueValid = (num: number) => {
		const maxAmount = 15;
		const minAmount = 0;
		return !isNaN(num) && num >= minAmount && num <= maxAmount;
	};

	const isModifierValueValid = (val: string | number) => {
		const num = Number(val);
		const maxAmount = 100;
		const minAmount = -100;

		if (val === '-') {
			return true;
		} else if (!isNaN(num) && num >= minAmount && num <= maxAmount) {
			return true;
		}
		return false
	};

	const handlePoolChange = (diceType: string, value: number) => {
		if (value) {
			if (isPoolValueValid(value)) {
				setPoolState({
					...poolState,
				// @ts-ignore
					[diceType]: value
				});
			}
		}
	};

	const handlePoolIncrease =(diceType: string) => {
		// @ts-ignore
		if (poolState[diceType]) {
			// @ts-ignore
			const newVal = Number(poolState[diceType]) + 1;
			if (isPoolValueValid(newVal)) {
				setPoolState({
					...poolState,
				// @ts-ignore
					[diceType]: newVal
				});
			}
		} else {
			setPoolState({
				...poolState,
				[diceType]: 1
			});
		}
	};

	const handlePoolDecrease =(diceType: string) => {
		// @ts-ignore
		if (poolState[diceType]) {
			// @ts-ignore
			const newVal = Number(poolState[diceType]) - 1;
			if (isPoolValueValid(newVal)) {
				setPoolState({
					...poolState,
				// @ts-ignore
					[diceType]: newVal
				});
			}
		} else {
			setPoolState({
				...poolState,
				[diceType]: 0
			});
		}
	};

	const handleModifierChange = (value: string) => {
		if (value) {
			if (isModifierValueValid(value)) {
				setModifierState(String(value));
			}
		}
	};

	const handleModifierIncrease = () => {
		const newVal = Number(modifierState) + 1;
		if (isModifierValueValid(newVal)) {
			setModifierState(String(newVal));
		}
	};

	const handleModifierDecrease = () => {
		const newVal = Number(modifierState) - 1;
		if (isModifierValueValid(newVal)) {
			setModifierState(String(newVal));
		}
	};
	
	const onIncrease = (diceType: string) => {
		if (diceType === MODIFIER) {
			handleModifierIncrease();
		} else {
			handlePoolIncrease(diceType);
		}
	};

	const onDecrease = (diceType: string) => {
		if (diceType === MODIFIER) {
			handleModifierDecrease();
		} else {
			handlePoolDecrease(diceType);
		}
	};

	const onChange = (diceType: string, event: any) => {
		const { value } = event.target;
		const numValue = Number(value)

		if (diceType === MODIFIER) {
			handleModifierChange(value);
		} else {
			handlePoolChange(diceType, numValue);
		}
	};

	const PoolBuilderDice = diceSet.map(({ diceType, label, imageFilename }) => (
		<PoolBuilderDie
			key={`pool-builder-die-${diceType}`}
			title={label}
			diceType={diceType}
			imageFilename={imageFilename}
			// @ts-ignore
			value={poolState[diceType] || ''}
			modifierValue={modifierState}
			onChange={onChange}
			onIncrease={onIncrease}
			onDecrease={onDecrease}
		/>
	));


	return (
		<form
			id="pool-builder-form"
			className={styles.diceContainer}
			onSubmit={(event) => handleSubmit(event, poolState, modifierState)}>
				{ PoolBuilderDice }
		</form>
	);
}

export default PoolBuilder;
