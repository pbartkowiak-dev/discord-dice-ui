// @ts-nocheck
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';
import CodeSpan from '../CodeSpan/CodeSpan';
import styles from './Reroll.module.css';
import Or from "../Or/Or";

interface RerollPropTypes {
	handleReroll: (itemsToStay: Array<number>) => void;
	results: Array<any>;
	isPool: boolean;
	isFate: boolean;
}

function Reroll({ handleReroll, results, isPool, isFate }: RerollPropTypes) {
	const cx = classNames.bind(styles);
	const [ itemIndexes, setItemIndexes ] = useState([]);

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
	
	if (results.length) {
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
					<div className={styles.resultsElementsRow}>{ resultsElement }</div>
				</div>
			);
	} else {
		selectToRerollElement = null;
	}

	const handleRerollClick = () => {
		let itemsToStay = [];
		if (itemIndexes && itemIndexes.length) {
			// get items from indexes
			itemsToStay = results.filter((_: number, i: number) => !itemIndexes.includes(i));
		}
		handleReroll(itemsToStay);
	};

	const handleRerollAllClick = () => {
		handleReroll();
	};

	if (results.length === 1 || isPool || isFate) {
		return (
			<div className={styles.container}>
				<div className={styles.row}>
					<Button
						variant="outline-primary"
						onClick={handleRerollAllClick}
					>Reroll</Button>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{ selectToRerollElement }
			<div className={styles.row}>
				<Button
					disabled={ !itemIndexes.length }
					variant="outline-primary"
					onClick={handleRerollClick}
				>Reroll</Button>
			</div>
			<Or />
			<div className={styles.row}>
				<Button
					variant="outline-primary"
					onClick={handleRerollAllClick}
				>Reroll All</Button>
			</div>
		</div>
	);
}

export default Reroll;
