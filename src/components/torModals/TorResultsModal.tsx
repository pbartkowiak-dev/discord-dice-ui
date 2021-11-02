import React from 'react';
import classNames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import joinAsBlocks from "../../utils/joinAsBlocks";
import torStyles from './TorModal.module.css';
import useTorStore from '../tor/store';
import styles from '../ResultsModal/ResultsModal.module.css';
import CodeSpan from "../CodeSpan/CodeSpan";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Form from "react-bootstrap/Form";
import InputRange from "../InputRange/InputRange";


function TorResultsModal() {

	const torState = useTorStore((torState: any) => torState);

	console.log('torState', torState)
	const {
		isResultsModalOpen,
		closeResultsModal,
		isSuccess,
		featDiceResults,
		skillDiceResults,
		skillDiceAmount,
		isFavoured,
		isIllFavoured,
		tn,
		isWeary
	} = torState;


	// const resultsJoined = joinAsBlocks(results);

	return (
		<Modal
			show={isResultsModalOpen}
			onHide={closeResultsModal}
		>
			<Modal.Header closeButton className={classNames({
				[styles.resultsModalHeader]: true,
				[styles.isFailure]: !isSuccess
			})}>
				<Modal.Title className={styles.resultsModalTitle}>Roll Results</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>
					{ isSuccess && <div className={classNames([styles.generalResult, styles.generalResultSuccess])}>Success</div> }
					{ !isSuccess && <div className={classNames([styles.generalResult, styles.generalResultFailure])}>Failure</div> }
				</div>
				<div>
					{/*<strong>You rolled <CodeSpan>{skillDiceAmount}</CodeSpan> Success { skillDiceAmount === 1 ? 'die' : 'dice'} and <CodeSpan>{ isFavoured || isIllFavoured ? 2 : 1}</CodeSpan>.Results:</strong>*/}

					<div className={torStyles.tnContainer}>
						<div className={torStyles.tnContainerInner}>
							<InfoTooltip
								content="Target Number"
								className={torStyles.tnInfoIcon}
							/>
							<span className={classNames({
								[torStyles.tnResultNumber] : true,
								[torStyles.successText]: isSuccess,
								[torStyles.failureText]: !isSuccess
							})}>{tn}</span>
						</div>
					</div>

					<div className={classNames(styles.poolResultsBlock, styles.resultsBlock)}>
						<div className={styles.resultsBlockImageContainer}>
							<img
								className={styles.resultsBlockImage}
								src={require(`../../img/tor-success-die.png`)}
								alt="Success Die"
							/>
						</div>
						<div className={classNames({
							[styles.resultsBlockContentContainer]: true,
							[torStyles.isWeary]: isWeary
						})}>
							<div>{ skillDiceResults && joinAsBlocks(skillDiceResults.sort((a: number, b: number) => a - b)) }</div>
						</div>
					</div>

					<div className={classNames(styles.poolResultsBlock, styles.resultsBlock)}>
						<div className={styles.resultsBlockImageContainer}>
							<img
								className={styles.resultsBlockImage}
								src={require(`../../img/tor-feat-die.png`)}
								alt="Feat Die"
							/>
						</div>
						<div className={styles.resultsBlockContentContainer}>
							<div>{ featDiceResults && joinAsBlocks(featDiceResults) }</div>
						</div>
					</div>
				</div>

			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="outline-secondary"
					onClick={closeResultsModal}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default TorResultsModal;
