import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import classNames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from "../ResultsModal/ResultsModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import { closeWarhammerResultsModal, requestWarhammerReroll } from "../../actions/warhammer.actions";
import ResultVsSkillRow from "../ResultVsSkillRow/ResultVsSkillRow";
import CodeSpan from "../CodeSpan/CodeSpan";
import HitLocations from "../HitLocations/HitLocations";
import rerollStyles from '../Reroll/Reroll.module.css';

function WarhammerResultsModal() {
	const dispatch = useDispatch();
	const hideModal = () => dispatch(closeWarhammerResultsModal());

	const rerollCount = useSelector(({ rerollCount }: any) => rerollCount);
	const warhammerState = useSelector(({ warhammerState }: any) => warhammerState);
	const { slType, showResultsModal, results } = warhammerState;
	const {
		result,
		resultReversed,
		successLevels,
		skillLevel,
		hitLocation
	} = results;

	if (!successLevels) {
		return null;
	}

	const handleReroll = () => {
		dispatch(closeWarhammerResultsModal());

		setTimeout(() => {
			dispatch(requestWarhammerReroll());
		}, 500);
	};

	const {
		isSuccess,
		isAutoSuccess,
		isFailure,
		isAutoFailure,
		isDouble
	} = successLevels;

	const useFastSL = slType === 'fastSL';
	const useDarkHeresySL = slType === 'darkHeresySL';
	const useWarhammer2eSL = slType === 'warhammer2eSL';

	let slString = successLevels.SL > 0 ? `+${successLevels.SL}` : `${successLevels.SL}`;
	let slWord = 'Success Level';
	let slInfo ='Warhammer 4e SL';

	if (useFastSL) {
		slInfo = 'Fast SL';
	} else if (useDarkHeresySL) {
		slInfo = 'Dark Heresy II DoS';
		slString = `${Math.abs(successLevels.SL)}`;
	} else if (useWarhammer2eSL) {
		slInfo = 'Warhammer 2e DoS';
		slString = `${Math.abs(successLevels.SL)}`;
	}

	if (useDarkHeresySL || useWarhammer2eSL) {
		if (isSuccess || isAutoSuccess) {
			slWord = 'Degrees of Success';
		} else {
			slWord = 'Degrees of Failure';
		}
	}

	const skillLevelString = skillLevel <= 9 ? `0${skillLevel}` : `${skillLevel}`;
	const resultString = result <= 9 ? `0${result}` : `${result}`;

	return (
		<Modal
			show={showResultsModal}
			onHide={hideModal}
		>
			<Modal.Header closeButton className={classNames({
				[styles.resultsModalHeader]: true,
				[styles.isFailure]: !isSuccess
			})}>
				<FontAwesomeIcon className={styles.resultsModalDiceIcon} icon={faDiceD20} />
				<Modal.Title className={styles.resultsModalTitle}>Roll Results</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={styles.rollResults}>{ slInfo }</div>

				{/* Results vs Skill */}
				<ResultVsSkillRow
					skillLevel={skillLevelString}
					finalDieResult={resultString}
					isSuccess={isSuccess}
				/>

				{/* Roll Data */}
				{ isSuccess && !isAutoSuccess && <div className={classNames([styles.generalResult, styles.generalResultSuccess])}>Success</div> }
				{ isAutoSuccess && <div className={classNames([styles.generalResult, styles.generalResultSuccess])}>Automatic Success</div> }
				{ isFailure && !isAutoFailure && <div className={classNames([styles.generalResult, styles.generalResultFailure])}>Failure</div> }
				{ isAutoFailure && <div className={classNames([styles.generalResult, styles.generalResultFailure])}>Automatic Failure</div> }
				{ isDouble && <div className={classNames([styles.generalResult])}>Double</div> }
				{ rerollCount > 0 && <div className={styles.generalResult}>Rerolled <CodeSpan>{rerollCount}</CodeSpan> {rerollCount === 1 ? 'time' : 'times'}</div> }

				{/* SL Result */}
				<div className={styles.slResult}>
					<div><span className={styles.slResultLabel}>{slWord}:</span></div>
					<div><CodeSpan className={styles.slResultSpan}>{slString}</CodeSpan></div>
				</div>

				{/* Hit Locations */}
				<HitLocations
					hitLocation={hitLocation}
					isDarkHeresy={useDarkHeresySL}
					isWarhammer2e={useWarhammer2eSL}
				/>

				{/* Reroll */}
				<div className={rerollStyles.container}>
					<div className={rerollStyles.row}>
						<Button
							variant="outline-primary"
							onClick={handleReroll}>Reroll</Button>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="outline-secondary"
					onClick={hideModal}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default WarhammerResultsModal;
