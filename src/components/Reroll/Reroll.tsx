// @ts-nocheck
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';
import CodeSpan from '../CodeSpan/CodeSpan';
import styles from './Reroll.module.css';

function Reroll({ handleReroll, rollOptions, results }:any) {
	const cx = classNames.bind(styles);
	const { conanMode } = rollOptions;
	const [itemIndexes, setItemIndexes] = useState([]);

	const addItemIndex = (itemIndex:number) => {
		if (itemIndexes.indexOf(itemIndex) === -1) {
			// add item index
			setItemIndexes([ ...itemIndexes, itemIndex ]);
		} else {
			// remove item index
			setItemIndexes(itemIndexes.filter((i:number) => i !== itemIndex));
		}
	};

	let resultsElement;
	
	if (conanMode && results.length) {
		resultsElement = results
			.map((result:number, index:number) => {
				if (index === results.length - 1) {
					return <span onClick={ () => addItemIndex(index) }>
						<CodeSpan className={cx({
							rollItem: true,
							active: itemIndexes.indexOf(index) >= 0
						})}>{result}</CodeSpan></span>;
				}
				return <span onClick={ () => addItemIndex(index) }>
					<CodeSpan className={cx({
						rollItem: true,
						active: itemIndexes.indexOf(index) >= 0
					})}>{result}</CodeSpan>,&nbsp;</span>;
			});
	} else {
		resultsElement = null;
	}

	const handleClick = () => {
		// get items from indexes
		const itemsToStay = results.filter((item:number, index:number) => (
			itemIndexes.indexOf(index) === -1
		));
		// handle reroll;
		handleReroll(itemsToStay)
	}

	return (
		<>
			<div className={styles.container}>
				<div className={cx({row: true, selectItems: true})}>
					<div>Select roll results you want to reroll:</div>
					<div>{ resultsElement }</div>
				</div>
				<div className={styles.row}>
					<Button
						disabled={!itemIndexes.length}
						variant="outline-primary"
						onClick={handleClick}
					>Reroll</Button>
				</div>
			</div>
		</>
	);
}

export default Reroll;
