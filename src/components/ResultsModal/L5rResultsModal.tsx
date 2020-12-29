import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { EXPLOSIVE_SUCCESS, l5rResults } from '../../consts/l5rSymbols';
import styles from './ResultsModal.module.css';
import l5rStyles from './L5rResultsModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import { L5rResultsModalPropTypes } from './L5rResultsModalTypes';
import L5rAddDieContainer from './L5rAddDieContainer';
import TooltipWrapper from '../InfoTooltip/TooltipWrapper';
import L5rResultsDropdownContainer from './L5rResultsDropdownContainer';
import L5rKeepItDropItDropdownContainer from './L5rKeepItDropItDropdownContainer';
import { ADDITIONAL_DIE, ROLLED_DIE, KEPT_DIE } from '../../consts/consts';
import DerivedResultsItem from '../DerivedResults/DerivedResultsItem';
import derivedResultsStyles from '../DerivedResults/DerivedResults.module.css';

function L5rResultsModal({
	hideMsg,
	rerollCount,
	l5rKeepDice,
	requestL5rReroll,
	l5rClearData,
	l5rSendState,

	showModal,
	results,
	resultsKept,
	resultsKeptIndexesAltered,
	resultsKeptIndexesExploded,
	resultsDerived,

	additionalDiceRolled,
	additionalDiceIndexesKept,
	additionalDiceIndexesDropped,
	additionalDiceIndexesExploded
}: L5rResultsModalPropTypes) {
	const [selectedDiceState, setSelectedDiceState] = useState<any>([]);
	const [isModifyingAllowed, setIsModifyingAllowed] = useState<boolean>(true);

	const DiceIcon = <FontAwesomeIcon className={styles.resultsModalDiceIcon} icon={faDiceD20} />;

	const resultsElements: Array<JSX.Element> = [];
	const resultsKeptElements: Array<JSX.Element> = [];
	const additionalDiceRolledElements: Array<JSX.Element> = [];

	const selectDie = (index: number) => {
		setSelectedDiceState([
			...selectedDiceState,
			index
		]);
	};

	const deselectDie = (index: number) => {
		setSelectedDiceState(
			selectedDiceState.filter((i: number) => i !== index)
		);
	};

	const handleReroll = () => {
		requestL5rReroll(selectedDiceState);
		setSelectedDiceState([]);
		l5rSendState();
	};

	const handleKeepDice = () => {
		l5rKeepDice(selectedDiceState);
		setSelectedDiceState([]);
		l5rSendState();
	};

	const handleDoneModifyKeptDice = () => {
		setIsModifyingAllowed(false);
		l5rSendState();
	};

	useEffect(() => {
		setSelectedDiceState([]);
		setIsModifyingAllowed(true);

		if (!showModal) {
			l5rClearData();
		}
	}, [showModal, l5rClearData]);

	results
		.forEach((result: string | number, index: number) => {
			const isDiceSelected = selectedDiceState.includes(index);

			const diceLabel: string = isDiceSelected
				? `${l5rResults[result]} (selected)`
				: l5rResults[result];

			const handleClick = isDiceSelected
				? deselectDie
				: selectDie;

			const diceImgClassNames = classNames({
				[l5rStyles.img]: true,
				[l5rStyles.selected]: isDiceSelected
			});

			resultsElements.push(
				<div
					key={`result-die-${index}`}
					className={classNames({
						[styles.resultsBlock]: true
					})}
				>
					<div className={classNames({
						[styles.resultsBlockImageContainer]: true,
						[l5rStyles.resultsBlockImageContainer]: true
					})}>
						<TooltipWrapper content={diceLabel || result}>
							<img
								className={diceImgClassNames}
								src={require(`../../img/l5r/${result}.png`)}
								alt={diceLabel}
								onClick={() => handleClick(index)}
							/>
						</TooltipWrapper>
					</div>
				</div>
			);
		});

	resultsElements.push(
		<L5rAddDieContainer key="add-die-results-rolled" type={ROLLED_DIE} />
	);

	resultsKept
		.forEach((result: string, index: number) => {
			const wasAlreadyExploded = resultsKeptIndexesExploded.includes(index);
			const isExplosiveDie = result.includes(EXPLOSIVE_SUCCESS);

			let diceLabel: string = resultsKeptIndexesAltered.includes(index)
				? `${l5rResults[result]} (altered)`
				: l5rResults[result];

			if (wasAlreadyExploded) {
				diceLabel += ' (exploded)'
			}

			const diceImgClassNames = classNames({
				[l5rStyles.img]: true,
				[l5rStyles.noOptionAvailable]: (!isModifyingAllowed && !isExplosiveDie) || (wasAlreadyExploded),
				[l5rStyles.explosiveDie]: isExplosiveDie,
				[l5rStyles.exploded]: wasAlreadyExploded,
				[l5rStyles.explodingAllowed]: !isModifyingAllowed
			});

			resultsKeptElements.push(
				<div
					key={`kept-die-${index}`}
					className={classNames({
						[styles.resultsBlock]: true
					})}
				>
					<div className={classNames({
						[styles.resultsBlockImageContainer]: true,
						[l5rStyles.resultsBlockImageContainer]: true
					})}>
						<L5rResultsDropdownContainer
							result={result}
							wasAlreadyExploded={wasAlreadyExploded}
							index={index}
							isModifyingAllowed={isModifyingAllowed}
							type={ROLLED_DIE}
						>
							<TooltipWrapper content={diceLabel || result}>
									<img
										className={diceImgClassNames}
										src={require(`../../img/l5r/${result}.png`)}
										alt={diceLabel}
									/>
							</TooltipWrapper>
						</L5rResultsDropdownContainer>
					</div>
				</div>
			);
		});

	resultsKeptElements.push(
		<span
			key="add-die-results-kept"
			className={classNames({
				[l5rStyles.buttonDisabledWrapper]: !isModifyingAllowed,
				[l5rStyles.addDieWrapper]: true
			}
		)}>
			<L5rAddDieContainer type={KEPT_DIE} />
		</span>
	);

	additionalDiceRolled
		.forEach((result: string, index: number) => {
			const isAdditionalDieKept = additionalDiceIndexesKept.includes(index);
			const isAdditionalDieDropped = additionalDiceIndexesDropped.includes(index);
			const wasAlreadyExploded = additionalDiceIndexesExploded.includes(index);
			const isExplosiveDie = result.includes(EXPLOSIVE_SUCCESS);

			const diceLabel = isAdditionalDieKept
				? `${l5rResults[result]} (kept)`
				: `${l5rResults[result]} (not kept yet)`;

			const diceImgClassNames = classNames({
				[l5rStyles.img]: true,
				[l5rStyles.noOptionAvailable]: isAdditionalDieKept && (!isExplosiveDie || wasAlreadyExploded),
				[l5rStyles.additionalDie]: true,
				[l5rStyles.explosiveDie]: isExplosiveDie,
				[l5rStyles.exploded]: wasAlreadyExploded,
				[l5rStyles.additionalDieKept]: isAdditionalDieKept,
				[l5rStyles.isAdditionalDieDropped]: isAdditionalDieDropped,
			});

			const img = (
				<img
					className={diceImgClassNames}
					src={require(`../../img/l5r/${result}.png`)}
					alt={diceLabel}
				/>
			);

			let content;

			if (isAdditionalDieKept) {
				content = (
					<L5rResultsDropdownContainer
						result={result}
						wasAlreadyExploded={wasAlreadyExploded}
						index={index}
						isModifyingAllowed={false}
						type={ADDITIONAL_DIE}
					>
						<TooltipWrapper content={diceLabel || result}>
							{img}
						</TooltipWrapper>
					</L5rResultsDropdownContainer>
				);
			} else {
				content = (
					<L5rKeepItDropItDropdownContainer index={index}>
						<TooltipWrapper content={diceLabel || result}>
							{img}
						</TooltipWrapper>
					</L5rKeepItDropItDropdownContainer>
				);
			}

			additionalDiceRolledElements.push(
				<div
					key={`additional-die-${index}`}
					className={classNames({
						[styles.resultsBlock]: true
					})}
				>
					<div className={classNames({
						[styles.resultsBlockImageContainer]: true,
						[l5rStyles.resultsBlockImageContainer]: true
					})}>
						<span className={classNames({
							[l5rStyles.buttonDisabledWrapper]: isAdditionalDieDropped,
							[l5rStyles.additionalDiceContainer]: true
						})}>
							{content}
						</span>
					</div>
				</div>
			);
		});

	return (
		<Modal
			show={showModal}
			onHide={hideMsg}
		>
			<Modal.Header closeButton className={styles.resultsModalHeader}>
				<div>
					{DiceIcon}
					<Modal.Title className={styles.resultsModalTitle}>Roll Results</Modal.Title>
				</div>
			</Modal.Header>
			<Modal.Body className={classNames({
				[styles.resultsBody]: true,
				[l5rStyles.resultsBody]: true
			})}>

				<section
					data-step-results
					className={classNames({
						[l5rStyles.hasResultsKept]: resultsKept.length > 0
					})}>
					<h4 className={l5rStyles.header}>Select the dice to reroll or keep:</h4>
					<div className={l5rStyles.resultsContainer}>
						{resultsElements}
					</div>
					<div className={l5rStyles.firstButtonsRow}>
						<TooltipWrapper content={rerollCount > 0 ? 'Dice already rerolled!' : ''}>
							<span className={classNames({
								[l5rStyles.buttonDisabledWrapper]: rerollCount > 0
							})}>
								<Button
									disabled={!selectedDiceState.length || rerollCount > 0}
									variant="outline-info"
									onClick={handleReroll}
								>Reroll selected</Button>
							</span>
						</TooltipWrapper>
						<Button
							disabled={!selectedDiceState.length}
							variant="outline-primary"
							onClick={handleKeepDice}
						>Keep selected</Button>
					</div>
				</section>

				<section
					data-phase-kept-results
					className={classNames({
						[l5rStyles.keptDiceContainer]: true,
						hidden: resultsKeptElements.length === 1
					})}>
					<h4 className={l5rStyles.header}>
						{isModifyingAllowed ? 'Modify kept dice:' : 'Kept dice:'}
					</h4>
					<div className={l5rStyles.resultsContainer}>
						{resultsKeptElements}
					</div>
					<Button
						className={classNames({
							[l5rStyles.modifyKeptDiceButton]: true,
							hidden: !isModifyingAllowed
						})}
						variant="outline-primary"
						onClick={handleDoneModifyKeptDice}
					>Done</Button>
				</section>

				<section
					data-step-additional-dice-rolled
					className={classNames({
						[l5rStyles.keptDiceContainer]: true,
						hidden: additionalDiceRolled.length === 0
					})}>
					<h4 className={l5rStyles.header}>Additional dice rolled:</h4>
					<div className={l5rStyles.resultsContainer}>
						{additionalDiceRolledElements}
					</div>
				</section>
				
				<section
					data-step-results-derived
					className={classNames({
						[l5rStyles.resultsDerivedContainer]: true,
						hidden: isModifyingAllowed || resultsKeptElements.length === 1
					})}>
					<h4 className={l5rStyles.headerGreater}>Results:</h4>
					<div className={derivedResultsStyles.derivedResultsContainer}>
						<div className={derivedResultsStyles.derivedResultsList}>
							<DerivedResultsItem
								symbolCount={resultsDerived.success}
								tooltipContent="Success (Exploding Success included)"
								symbolType="Success"
								symbolImageName="l5r/success"
							/>
							<DerivedResultsItem
								symbolCount={resultsDerived.opportunity}
								tooltipContent="Opportunity"
								symbolType="Opportunity"
								symbolImageName="l5r/opportunity"
							/>
							<DerivedResultsItem
								symbolCount={resultsDerived.strife}
								tooltipContent="Strife"
								symbolType="Strife"
								symbolImageName="l5r/strife"
							/>
						</div>
					</div>
				</section>

			</Modal.Body>
			<Modal.Footer>
				<Button
					block
					variant="outline-secondary"
					onClick={hideMsg}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default L5rResultsModal;
