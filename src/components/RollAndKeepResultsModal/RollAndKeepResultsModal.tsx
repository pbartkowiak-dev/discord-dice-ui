import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from '../ResultsModal/ResultsModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEquals } from '@fortawesome/free-solid-svg-icons';
import rollAndKeepStyles from './RollAndKeepResultsModal.module.css';
import CodeSpan from '../CodeSpan/CodeSpan';

function RollAndKeepResultsModal({
	hideMsg,
	rerollCount,
	keepDice,
	modifier,
	requestRollAndKeepReroll,
	showModal,
	results
}: any) {
	const [selectedDiceState, setSelectedDiceState] = useState<any>([]);

	useEffect(() => {
		setSelectedDiceState([]);
	}, [showModal]);

	const selectDie = (rowIndex: number) => {
		setSelectedDiceState([
			...selectedDiceState,
			rowIndex
		]);
	};

	const deselectDie = (rowIndex: number) => {
		setSelectedDiceState(
			selectedDiceState.filter((i: number) => i !== rowIndex)
		);
	};

	const handleReroll = () => {
		hideMsg();
		setSelectedDiceState([]);
		setTimeout(() => {
			requestRollAndKeepReroll();
		}, 500);
	};

	const handleKeepDice = () => {
		keepDice({ indexesKept: selectedDiceState });
		setSelectedDiceState([]);
	};

	const getTotal = () => {
		return selectedDiceState.reduce((acc: Number, selectedIndex: number) => {
			return acc + results[selectedIndex].reduce((a: number, b: number) => (a + b), 0);
		}, 0);
	};

	const resultsElements: Array<JSX.Element> = results.map((resultsInner: number[], rowIndex: number) => {
		const sum = resultsInner.reduce((a, b) => (a + b), 0);
		const isRowSelected = selectedDiceState.includes(rowIndex);

		const handleClick = isRowSelected ? deselectDie : selectDie;

		const resultsRowClassNames = classNames({
			[rollAndKeepStyles.resultsRow]: true,
			[rollAndKeepStyles.selected]: isRowSelected
		});

		return (
			<div
				key={`row-index-${rowIndex}`}
				className={resultsRowClassNames}
				onClick={() => handleClick(rowIndex)}
			>
				<div className={rollAndKeepStyles.sum}>
					{ sum }
				</div>
				{
					resultsInner.map((result: number, index: number) => {
						const showResult = result === 10 ? 0 : result;

						return (
							<div key={`row-index-${index}`} className={rollAndKeepStyles.resultsBlock}>
								<div className={rollAndKeepStyles.imgContainer}>
									<img
										className={rollAndKeepStyles.img}
										src={require(`../../img/d10_bg.png`)}
										alt={'diceLabel'}
									/>
									<span className={rollAndKeepStyles.imgResult}>{showResult}</span>
								</div>
								<div className={classNames({
									hidden: index === resultsInner.length -1,
									[rollAndKeepStyles.arrowIconContainer]: true

								})}>
									<FontAwesomeIcon className={rollAndKeepStyles.arrowIcon} icon={faArrowRight} />
								</div>
							</div>
						);
					})
				}
			</div>
		);
	});

	const total = getTotal() + modifier;
	let modifierElem = null;

	if (modifier !== 0) {
		const modifierStr = modifier > 0 ? `+${modifier}` : `${modifier}`;
		modifierElem = (
			<div>(with <CodeSpan>{modifierStr}</CodeSpan> modifier)</div>
		);
	}

	return (
		<Modal
			show={showModal}
			onHide={hideMsg}
		>
			<Modal.Header closeButton className={styles.resultsModalHeader}>
				<Modal.Title className={styles.resultsModalTitle}>Roll Results</Modal.Title>
			</Modal.Header>
			<Modal.Body className={styles.resultsBody}>

				<section>
					<h3 className={classNames({
						[rollAndKeepStyles.rerolledHeader]: true,
						hidden: !rerollCount || rerollCount <= 0
						})}>Rerolled <CodeSpan>{rerollCount}</CodeSpan> {rerollCount === 1 ? 'time' : 'times'}</h3>
					<h4 className={rollAndKeepStyles.header}>Select the dice to keep:</h4>
					<div className={rollAndKeepStyles.results}>
						{ resultsElements }
					</div>
					<div className={rollAndKeepStyles.equalsRow}>
						<div className={rollAndKeepStyles.equalsContainer}>
							<FontAwesomeIcon className={rollAndKeepStyles.equalsIcon} icon={faEquals} />
						</div>
						<div className={rollAndKeepStyles.total}>{ total }</div> { modifierElem }
					</div>
				</section>

				<section>
					<div className={rollAndKeepStyles.buttonContainer}>
							<Button
								disabled={selectedDiceState.length}
								variant="outline-info"
								onClick={handleReroll}
							>Reroll all dice</Button>
							<Button
								disabled={!selectedDiceState.length}
								variant="outline-primary"
								onClick={handleKeepDice}
							>Keep selected</Button>
						</div>
				</section>

			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="outline-secondary"
					onClick={hideMsg}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default RollAndKeepResultsModal;
