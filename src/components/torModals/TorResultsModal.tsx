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
import { EYE_SCORE, GANDALF_SCORE } from "../../consts/torDice";
import rollAndKeepStyles from "../RollAndKeepResultsModal/RollAndKeepResultsModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEquals, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { AdversaryRollTooltip, FavouredTooltip, IllFavouredTooltip, MiserableTooltip, WearyTooltip } from "./Tooltips";
import ElvenRune from "./ElvenRune";


function TorResultsModal() {
	const torState = useTorStore((torState: any) => torState);
	const {
		isResultsModalOpen,
		closeResultsModal,
		isSuccess,
		featDiceResults,
		skillDiceResults,
		isFavoured,
		isIllFavoured,
		tn,
		isWeary,
		isMiserable,
		isAdversary,
		featDieScore,
		totalDiceScore,
	} = torState;

	const FAVOURED_DIE = isAdversary ? EYE_SCORE : GANDALF_SCORE;
	const ILL_FAVOURED_DIE = isAdversary ? GANDALF_SCORE : EYE_SCORE;

	const isAutoSuccess = featDieScore === FAVOURED_DIE;
	const isAutoFailure = isMiserable && featDieScore === ILL_FAVOURED_DIE;

	const skillDiceResultsSorted =  skillDiceResults.sort((a: number, b: number) => a - b);
	const specialSuccessesAmount = skillDiceResults.filter((result: number) => result === 6).length;

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
				<section className={torStyles.tnContainer}>
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
				</section>
				<section className={torStyles.favouredRollSection}>
					<div className={torStyles.checkboxContainer}>
						<p className={classNames({ [torStyles.dimmed]: !isFavoured })}>{isFavoured ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />} Favoured Roll <FavouredTooltip /></p>
						<p className={classNames({ [torStyles.dimmed]: !isIllFavoured })}>{isIllFavoured ?<FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />} Ill-Favoured Roll <IllFavouredTooltip /></p>
					</div>
				</section>
				<section className={classNames(styles.poolResultsBlock, styles.resultsBlock)}>
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
						<div>{ skillDiceResults && joinAsBlocks(skillDiceResultsSorted) }</div>
					</div>
				</section>

				<section className={classNames(styles.poolResultsBlock, styles.resultsBlock)}>
					<div className={styles.resultsBlockImageContainer}>
						<img
							className={styles.resultsBlockImage}
							src={require(`../../img/tor-feat-die.png`)}
							alt="Feat Die"
						/>
					</div>
					<div className={classNames({
						[styles.resultsBlockContentContainer]: true,
						[torStyles.featDiceResultsBlockContentContainer]: true,
						[torStyles.isFirstScoreDimmed]: featDiceResults.length > 1 && ((() => {
							const firstScore = featDiceResults[0];
							const secondScore = featDiceResults[1];
							if (firstScore === secondScore) {
								return false;
							}
							return secondScore === featDieScore;
						})()),
						[torStyles.isSecondScoreDimmed]: featDiceResults.length > 1 && ((() => {
							const firstScore = featDiceResults[0];
							const secondScore = featDiceResults[1];
							if (firstScore === secondScore) {
								return true;
							}
							return firstScore === featDieScore;
						})()),
					})}>
						<div>{ featDiceResults && joinAsBlocks(featDiceResults) }</div>
					</div>
				</section>
				<section className={classNames({
					[torStyles.equalsRow]: true,
					[torStyles.successText]: isSuccess,
					[torStyles.failureText]: !isSuccess,
				})}>
					<span className={torStyles.equalsContainer}><FontAwesomeIcon className={torStyles.equalsIcon} icon={faEquals} /></span>
					<span className={classNames({
						[torStyles.totalScore]: true,
						[torStyles.struckThroughText]: isAutoSuccess || isAutoFailure,
					})}
					>{totalDiceScore}
					</span>
					{ isAutoSuccess
						? (
							<span> { isAdversary
								? <FontAwesomeIcon className={torStyles.resultIcon} icon={faEye} />
								: <img className={torStyles.resultImg} src={require("./assets/gandalf-rune-success.png")} alt="Gandalf Icon"/>
							} </span>
						)
						: null
					}
					{ isAutoFailure
						? (
							<span> { isAdversary
								? <img className={torStyles.resultImg} src={require("./assets/gandalf-rune-failure.png")} alt="Gandalf Icon"/>
								: <FontAwesomeIcon className={torStyles.resultIcon} icon={faEye} />
						} </span>
						)
						: null
					}
					<span>({isSuccess ? 'Success' : 'Failure'})</span>
				</section>
				{isSuccess && specialSuccessesAmount > 0 && <section className={torStyles.specialSuccessesSection}>
					<div>
						<span className={torStyles.specialSuccessesIcon}><ElvenRune /></span> <CodeSpan>{specialSuccessesAmount}</CodeSpan> Special {specialSuccessesAmount === 1 ? 'Success' : 'Successes'}
					</div>
				</section>}
				<section>
					<h5 className={torStyles.subheader}>Conditions</h5>
					<div className={torStyles.checkboxContainer}>
						<p className={classNames({ [torStyles.dimmed]: !isWeary })}>{isWeary ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />} Weary <WearyTooltip /></p>
						<p className={classNames({ [torStyles.dimmed]: !isMiserable })}>{isMiserable ?<FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />} Miserable <MiserableTooltip /></p>
					</div>
				</section>
				<section>
					<h5 className={torStyles.subheader}>Loremaster's Tools</h5>
					<div className={torStyles.checkboxContainer}>
						<p className={classNames({ [torStyles.dimmed]: !isAdversary })}>{isAdversary ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />} Rolling for an Adversary <AdversaryRollTooltip /></p>
					</div>
				</section>
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
