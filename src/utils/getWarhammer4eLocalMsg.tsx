import React from 'react';
import CodeSpan from '../components/CodeSpan/CodeSpan';
import getWarhammer4eSuccessLevels from './getWarhammer4eSuccessLevels';
import getReversedResult from './getReversedResult';
import getWarhammer4eHitLocation from './getWarhammer4eHitLocation';
import ResultVsSkillRow from '../components/ResultVsSkillRow/ResultVsSkillRow';
import HitLocations from '../components/HitLocations/HitLocations';
import styles from '../components/ResultsModal/ResultsModal.module.css';

export type LocalMsgParamsType = {
	title: any,
	fields: Array<any>
	isSuccess?: boolean
	rollOptions?: any
	finalDieResult?: number,
	userSettings?: any
}

const getCocLocalMsg = (result:any, rollOptions:any, userSettings?:any):LocalMsgParamsType => {
	const {
		results,
		skillLevel
	} = result;
	const skillLevelString = skillLevel <= 9 ? `0${skillLevel}` : `${skillLevel}`;
	const fields = [];
	const finalDieResult = results[0];;
	const finalDieResultString = finalDieResult <= 9 ? `0${finalDieResult}` : `${finalDieResult}`;
	const title = rollOptions.fastSL ? 'Fast SL' : null;

	console.log('rollOptions', rollOptions)

	const successLevels = getWarhammer4eSuccessLevels(
		skillLevel,
		finalDieResult,
		!!rollOptions.fastSL
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
			<div className={`${styles.warhammerResult} ${styles.warhammerResultSuccess}`}>Success</div>
		);
	}
	if (successLevels.isAutoSuccess) {
		fields.push(
			<div className={`${styles.warhammerResult} ${styles.warhammerResultSuccess}`}>Automatic Success</div>
		);
	}
	if (successLevels.isFailure && !successLevels.isAutoFailure) {
		fields.push(
			<div className={`${styles.warhammerResult} ${styles.warhammerResultFailure}`}>Failure</div>
		);
	}
	if (successLevels.isAutoFailure) {
		fields.push(
			<div className={`${styles.warhammerResult} ${styles.warhammerResultFailure}`}>Automatic Failure</div>
		);
	}
	if (successLevels.isDouble) {
		fields.push(
			<div className={`${styles.warhammerResult}`}>Double</div>
		);
	}
	if (rollOptions.rerolledTimes) {
		const timesWord = rollOptions.rerolledTimes === 1 ? 'time' : 'times';
		fields.push(
			<div className={`${styles.warhammerResult}`}>Rerolled <CodeSpan>{rollOptions.rerolledTimes}</CodeSpan> {timesWord}</div>
		);
	}

	const slString = successLevels.SL > 0 ? `+${successLevels.SL}` : `${successLevels.SL}`;

	fields.push(
		<div className={styles.slResult}>
			<div><span className={styles.slResultLabel}>Success Level:</span></div>
			<div><CodeSpan className={styles.slResultSpan}>{slString}</CodeSpan></div>
		</div>
	);

	const reversedResult = getReversedResult(finalDieResultString);
	const hitLocation = getWarhammer4eHitLocation(reversedResult);

	fields.push(
		<HitLocations result={reversedResult} hitLocation={hitLocation} />
	);

	rollOptions.warhammerMode = true;

	return {
		title,
		fields,
		isSuccess: successLevels.isSuccess,

		finalDieResult,
		rollOptions,
		userSettings
	};
};

export default getCocLocalMsg;