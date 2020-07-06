import React from 'react';
import classNames from 'classnames/bind';
import CodeSpan from '../components/CodeSpan/CodeSpan';
import getConanSuccessLevel, { conanSuccessLevelType } from './getConanSuccessLevel';
import ResultVsSkillRow, { labelsType } from '../components/ResultVsSkillRow/ResultVsSkillRow';

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
			return <span><CodeSpan>{result}</CodeSpan></span>;
		}
		return <span><CodeSpan>{result}</CodeSpan>,&nbsp;</span>;
	});

	const yourFocus = <p>Focus: <CodeSpan>{focus}</CodeSpan></p>;
	const yourTn = <p>TN: <CodeSpan>{tn}</CodeSpan></p>;
	const wasUntrainedTest = untrainedTest ? <p>Untrained Test</p> : null;

	const fortuneUsed = (fortune && Number(fortune) > 0)
		? <p>Fortune points used: <CodeSpan>{fortune}</CodeSpan></p>
		: null;

	const title = (
		<div className={styles.conanResultsDetauls}>
			<p>You rolled <CodeSpan>{dice}d20</CodeSpan></p>
			{ yourFocus }
			{ yourTn }
			{ wasUntrainedTest }
			{ fortuneUsed }
		</div>
	);

	const labels:labelsType = {
		result: 'Successes',
		vs: 'Difficulty'
	}

	fields.push(
		<ResultVsSkillRow
			skillLevel={difficulty}
			finalDieResult={successLevel.successLevel}
			isSuccess={successLevel.isSuccess}
			labels={labels}
		/>
	);

	if (successLevel.isSuccess) {
		fields.push(
			<div className={cx({generalResult: true, generalResultSuccess: true})}>Success</div>
		);
	} else {
		fields.push(
			<div className={cx({generalResult: true, generalResultFailure : true})}>Failure</div>
		);
	}

	// if (rollOptions.rerolledTimes) {
	// 	const timesWord = rollOptions.rerolledTimes === 1 ? 'time' : 'times';
	// 	fields.push(
	// 		<div className={`${styles.generalResult}`}>Rerolled <CodeSpan>{rollOptions.rerolledTimes}</CodeSpan> {timesWord}</div>
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

	fields.push(
		<div className={cx({slResult: true, conanRollResults: true})}>
			<p>Results:</p>
			<p>{rollResults}</p>
		</div>
	);

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