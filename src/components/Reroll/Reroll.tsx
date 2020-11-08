// @ts-nocheck
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';
import CodeSpan from '../CodeSpan/CodeSpan';
import { D6_CONAN, D20_CONAN_TEST } from '../../consts/consts';
import { SelectedDiceType } from '../../reducers/diceSelectedReducer';
import styles from './Reroll.module.css';

interface RerollPropTypes {
	handleReroll: (itemsToStay: Array<number>) => void;
	results: Array<any>;
	diceSelected: SelectedDiceType;
}

function Reroll({ handleReroll, results, diceSelected }: RerollPropTypes) {
	const cx = classNames.bind(styles);
	const { diceType } = diceSelected;
	const [ itemIndexes, setItemIndexes ] = useState([]);
	const shouldSelectToReroll = (diceType === D6_CONAN || diceType === D20_CONAN_TEST);

	const addItemIndex = (itemIndex: number) => {
		if (itemIndexes.indexOf(itemIndex) === -1) {
			// add item index
			setItemIndexes([ ...itemIndexes, itemIndex ]);
		} else {
			// remove item index
			setItemIndexes(itemIndexes.filter((i: number) => i !== itemIndex));
		}
	};

	let selectToRerollElement;
	
	if (shouldSelectToReroll && results.length) {
		const resultsElement = results
			.map((result: number, index: number) => {
				if (index === results.length - 1) {
					return <span key={index} onClick={ () => addItemIndex(index) }>
						<CodeSpan className={cx({
							rollItem: true,
							active: itemIndexes.indexOf(index) >= 0
						})}>{result}</CodeSpan></span>;
				}
				return <span key={index} onClick={ () => addItemIndex(index) }>
					<CodeSpan className={cx({
						rollItem: true,
						active: itemIndexes.indexOf(index) >= 0
					})}>{result}</CodeSpan>,&nbsp;</span>;
			});

			selectToRerollElement = (
				<div className={cx({row: true, selectItems: true})}>
					<div className={styles.rerollInfo}>Select roll results you want to reroll:</div>
					<div>{ resultsElement }</div>
				</div>
			);
	} else {
		selectToRerollElement = null;
	}

	const handleClick = () => {
		let itemsToStay = [];
		if (itemIndexes && itemIndexes.length) {
			// get items from indexes
			itemsToStay = results.filter((_: number, i: number) => itemIndexes.indexOf(i) === -1);
		}
		handleReroll(itemsToStay);
	};

	return (
		<div className={styles.container}>
			{ selectToRerollElement }
			<div className={styles.row}>
				<Button
					disabled={ (shouldSelectToReroll && !itemIndexes.length) }
					variant="outline-primary"
					onClick={handleClick}
				>Reroll</Button>
			</div>
		</div>
	);
}

export default Reroll;
