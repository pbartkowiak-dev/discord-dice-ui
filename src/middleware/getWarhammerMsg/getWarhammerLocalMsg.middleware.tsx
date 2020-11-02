import React from 'react';
import classNames from 'classnames/bind';
import getWarhammerSuccessLevels from '../../utils/getWarhammerSuccessLevels';
import getReversedResult from '../../utils/getReversedResult';
import getWarhammer2eHitLocation from '../../utils/getWarhammer2eHitLocation';
import getWarhammer4eHitLocation from '../../utils/getWarhammer4eHitLocation';
import getDarkHeresyIIHitLocation from '../../utils/getDarkHeresyIIHitLocation';
import CodeSpan from '../../components/CodeSpan/CodeSpan';
import ResultVsSkillRow from '../../components/ResultVsSkillRow/ResultVsSkillRow';
import HitLocations from '../../components/HitLocations/HitLocations';
import styles from '../../components/ResultsModal/ResultsModal.module.css';
import { WARHAMMER_DICE_ROLLED, localMsgReady } from '../../actions/roll.actions';

export default (store:any) => (next:any) => (action:any) => {
	if (action.type === WARHAMMER_DICE_ROLLED) {
		console.log('WARHAMMER_DICE_ROLLED - action', action);
		const { payload: { result } } = action;
		const { payload: { rollOptions } } = action;

		const cx = classNames.bind(styles);
		const {
			results,
			skillLevel
		} = result;
		const skillLevelString = skillLevel <= 9 ? `0${skillLevel}` : `${skillLevel}`;
		const fields = [];
		const finalDieResult = results[0];
		const finalDieResultString = finalDieResult <= 9 ? `0${finalDieResult}` : `${finalDieResult}`;
	
		const useFastSL = rollOptions.warhammerSlMode === 'fastSL';
		const useDarkHeresySL = rollOptions.warhammerSlMode === 'darkHeresySL';
		const useWarhammer2eSL = rollOptions.warhammerSlMode === 'warhammer2eSL';
		let title = '';

		if (useFastSL) {
			title = 'Fast SL';
		} else if (useDarkHeresySL) {
			title = 'Dark Heresy II DoS';
		} else if (useWarhammer2eSL) {
			title = 'Warhammer 2e DoS';
		} else {
			title = 'Warhammer 4e SL';
		}
	
		const successLevels = getWarhammerSuccessLevels(
			skillLevel,
			finalDieResult,
			useFastSL,
			useDarkHeresySL,
			useWarhammer2eSL
		);
	
		fields.push(
			<ResultVsSkillRow
				skillLevel={skillLevelString}
				finalDieResult={finalDieResultString}
				isSuccess={successLevels.isSuccess}
			/>
		);
	
		if (successLevels.isSuccess && !successLevels.isAutoSuccess) {
			fields.push(
				<div className={cx({generalResult: true, generalResultSuccess: true})}>Success</div>
			);
		}
		if (successLevels.isAutoSuccess) {
			fields.push(
				<div className={cx({generalResult: true, generalResultSuccess: true})}>Automatic Success</div>
			);
		}
		if (successLevels.isFailure && !successLevels.isAutoFailure) {
			fields.push(
				<div className={cx({generalResult: true, generalResultFailure: true})}>Failure</div>
			);
		}
		if (successLevels.isAutoFailure) {
			fields.push(
				<div className={cx({generalResult: true, generalResultFailure: true})}>Automatic Failure</div>
			);
		}
		if (successLevels.isDouble) {
			fields.push(
				<div className={styles.generalResult}>Double</div>
			);
		}
		if (rollOptions.rerolledTimes) {
			const timesWord = rollOptions.rerolledTimes === 1 ? 'time' : 'times';
			fields.push(
				<div className={styles.generalResult}>Rerolled <CodeSpan>{rollOptions.rerolledTimes}</CodeSpan> {timesWord}</div>
			);
		}
	
		let slWord = '';
		if (useDarkHeresySL || useWarhammer2eSL) {
			if (successLevels.isSuccess || successLevels.isAutoSuccess) {
				slWord = 'Degrees of Success';
			} else {
				slWord = 'Degrees of Failure';
			}
		} else {
			slWord = 'Success Level';
		}
	
		let slString = '';
		if (useDarkHeresySL || useWarhammer2eSL) {
			slString = `${Math.abs(successLevels.SL)}`;
		} else {
			slString = successLevels.SL > 0 ? `+${successLevels.SL}` : `${successLevels.SL}`;
		}
	
		fields.push(
			<div className={styles.slResult}>
				<div><span className={styles.slResultLabel}>{slWord}:</span></div>
				<div><CodeSpan className={styles.slResultSpan}>{slString}</CodeSpan></div>
			</div>
		);
	
		const reversedResult = getReversedResult(finalDieResultString);
		let hitLocation;
	
		if (useDarkHeresySL) {
			hitLocation = getDarkHeresyIIHitLocation(reversedResult)
		} else if (useWarhammer2eSL) {
			hitLocation = getWarhammer2eHitLocation(reversedResult);
		} else {
			hitLocation = getWarhammer4eHitLocation(reversedResult);
		}
	
		fields.push(
			<HitLocations
				result={reversedResult}
				hitLocation={hitLocation}
				isDarkHeresy={!!useDarkHeresySL}
				isWarhammer2e={!!useWarhammer2eSL}
			/>
		);
	
		rollOptions.warhammerMode = true;

		store.dispatch(localMsgReady({
			title,
			fields,
			isSuccess: successLevels.isSuccess,	
			finalDieResult,
			rollOptions
		}));
	}
	next(action);
};
