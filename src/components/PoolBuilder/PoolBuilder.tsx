import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PoolBuilderDie from './PoolBuilderDie'
import styles from './PoolBuilder.module.css';
import { SetTypes } from '../DiceModule/DiceTypes';
import { COC, CONAN, WARHAMMER } from '../../consts/consts';
import { CLASSIC, POOL } from '../../consts/diceConstants';
import getDiceSet from '../../utils/getDiceSet';

function PoolBuilder({
	rollOptions,
	handleSubmit,
	specialDie
}: any) {
	const [poolState, setState] = useState({});

	// @TODO MOVE TO ONE DICE SET GETTER
	let diceSetType: SetTypes;
	if (rollOptions.warhammerMode) {
		diceSetType = WARHAMMER;
	} else if(rollOptions.conanMode) {
		diceSetType = CONAN;
	} else if (rollOptions.cocMode) {
		diceSetType = COC;
	} else {
		diceSetType = CLASSIC;
	}

	const diceSet = getDiceSet(diceSetType).filter(( { diceType }) => {
		return diceType !== POOL;
	});

	const isValid = (num: number) => {
		const maxAmount = 15;
		const minAmount = 0
		return !isNaN(num) && num >= minAmount && num <= maxAmount;
	};

	const onChange = (diceType: string, event: any) => {
		const { value } = event.target;
		if (value) {
			const numVal = Number(value);
			if (isValid(numVal)) {
				setState({
					...poolState,
				// @ts-ignore
					[diceType]: numVal
				});
			}
		}
	};

	const onIncrease = (diceType: string) => {
		// @ts-ignore
		if (poolState[diceType]) {
			// @ts-ignore
			const newVal = Number(poolState[diceType]) + 1;
			if (isValid(newVal)) {
				setState({
					...poolState,
				// @ts-ignore
					[diceType]: newVal
				});
			}
		} else {
			setState({
				...poolState,
				[diceType]: 1
			});
		}
	};

	const onDecrease = (diceType: string) => {
		// @ts-ignore
		if (poolState[diceType]) {
			// @ts-ignore
			const newVal = Number(poolState[diceType]) - 1;
			if (isValid(newVal)) {
				setState({
					...poolState,
				// @ts-ignore
					[diceType]: newVal
				});
			}
		} else {
			setState({
				...poolState,
				[diceType]: 0
			});
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
			onChange={onChange}
			onIncrease={onIncrease}
			onDecrease={onDecrease}
		/>
	));


	return (
		<form
			id="pool-builder-form"
			className={styles.diceContainer}
			onSubmit={(event) => handleSubmit(event, poolState)}>
				{ PoolBuilderDice }
		</form>
	);
}

export default PoolBuilder;
