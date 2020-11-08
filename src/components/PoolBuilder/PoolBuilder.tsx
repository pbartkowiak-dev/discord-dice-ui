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

	const onIncrease = (diceType: string) => {
		console.log('onIncrease, diceType', diceType);
		// @ts-ignore
		if (poolState[diceType]) {
			setState({
				...poolState,
			// @ts-ignore
				[diceType]: Number(poolState[diceType]) + 1
			});
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
			setState({
				...poolState,
			// @ts-ignore
				[diceType]: Number(poolState[diceType]) - 1
			});
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
			onIncrease={onIncrease}
			onDecrease={onDecrease}
		/>
	));


	return (
		<form
			id="pool-builder-form"
			className={styles.diceContainer}
			onSubmit={handleSubmit}>
				{ PoolBuilderDice }
		</form>
	);
}

export default PoolBuilder;
