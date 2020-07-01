import React from 'react';
import classNames from 'classnames';
import CodeSpan from '../components/CodeSpan/CodeSpan';
import getConanSuccessLevel, { conanSuccessLevelType } from './getConanSuccessLevel';
import ResultVsSkillRow from '../components/ResultVsSkillRow/ResultVsSkillRow';

import HitLocations from '../components/HitLocations/HitLocations';
import styles from '../components/ResultsModal/ResultsModal.module.css';

export type LocalMsgParamsType = {
	title: any,
	fields: Array<any>
	isSuccess: boolean
	isFailure: boolean
	rollOptions?: any
	userSettings?: any
}

const getConanLocalMsg = (results:Array<number>, rollOptions:any, userSettings?:any):LocalMsgParamsType => {
	const cx = classNames.bind(styles);
	const { dice, difficulty, focus, fortune, tn, untrainedTest } = rollOptions;

	const fields = [];

	const successLevel:conanSuccessLevelType = getConanSuccessLevel(
		results,
		Number(tn),
		Number(focus),
		Number(difficulty),
		untrainedTest
	);

	console.log('successLevel', successLevel);

	const rollResults = results.map((result, index) => {
		if (index === results.length - 1) {
			return <span><CodeSpan>{result}</CodeSpan></span>
		}
		return <span><CodeSpan>{result}</CodeSpan>,&nbsp;</span>
	});

	const fortuneUsed = (fortune && Number(fortune) > 0)
		? <p>Fortune points used: <CodeSpan>{fortune}</CodeSpan></p>
		: null;

	const title = (
		<div>
			<p>You rolled <CodeSpan>{dice}d20</CodeSpan></p>
			{ fortuneUsed }
			<p>Results:</p>
			<p>{rollResults}</p>
		</div>
	)

	fields.push(
		<ResultVsSkillRow
			skillLevel={difficulty}
			finalDieResult={successLevel.successLevel}
			isSuccess={successLevel.isSuccess}
		/>
	);

	if (successLevel.isSuccess) {
		fields.push(
			<div className={cx({ConanResult: true, ConanResultSuccess: true})}>Success</div>
		);
	} else {
		fields.push(
			<div className={cx({ConanResult: true, ConanResultFailure : true})}>Failure</div>
		);
	}

	// if (rollOptions.rerolledTimes) {
	// 	const timesWord = rollOptions.rerolledTimes === 1 ? 'time' : 'times';
	// 	fields.push(
	// 		<div className={`${styles.ConanResult}`}>Rerolled <CodeSpan>{rollOptions.rerolledTimes}</CodeSpan> {timesWord}</div>
	// 	);
	// }

	fields.push(
		<div className={styles.slResult}>
			<div><span className={styles.slResultLabel}>Momentum generated:</span></div>
			<div><CodeSpan className={styles.slResultSpan}>{successLevel.momentum}</CodeSpan></div>
		</div>
	);

	// const hitLocation = getWarhammer4eHitLocation(x);
	// fields.push(
	// 	<HitLocations
	// 		result={reversedResult}
	// 		hitLocation={hitLocation}
	// 		isDarkHeresy={!!useDarkHeresySL}
	// 		isWarhammer2e={!!useWarhammer2eSL}
	// 	/>
	// );

	rollOptions.conanMode = true;

	return {
		title,
		fields,
		isSuccess: successLevel.isSuccess,
		isFailure: successLevel.isFailure,
		rollOptions,
		userSettings
	};
};

export default getConanLocalMsg;