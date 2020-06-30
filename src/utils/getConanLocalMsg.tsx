import React from 'react';
import CodeSpan from '../components/CodeSpan/CodeSpan';
import getConanSuccessLevels from './getConanSuccessLevel';

import HitLocations from '../components/HitLocations/HitLocations';
import styles from '../components/ResultsModal/ResultsModal.module.css';

export type LocalMsgParamsType = {
	title: any,
	fields: Array<any>
	isSuccess?: boolean
	rollOptions?: any
	// finalDieResult?: number,
	userSettings?: any
}

const getConanLocalMsg = (result:any, rollOptions:any, userSettings?:any):LocalMsgParamsType => {
	const {
		results,
		skillLevel
	} = result;
	const { dice, difficulty, focus, fortune, tn,	untrainedTest } = rollOptions;
	
	const skillLevelString = skillLevel <= 9 ? `0${skillLevel}` : `${skillLevel}`;
	const fields = [];

	let title = '';


	const successLevels = {};
	// const successLevels = getConanSuccessLevels(
	// 	skillLevel,
	// 	finalDieResult
	// );


	// if (successLevels.isSuccess && !successLevels.isAutoSuccess) {
	// 	fields.push(
	// 		<div className={`${styles.ConanResult} ${styles.ConanResultSuccess}`}>Success</div>
	// 	);
	// }
	// if (successLevels.isAutoSuccess) {
	// 	fields.push(
	// 		<div className={`${styles.ConanResult} ${styles.ConanResultSuccess}`}>Automatic Success</div>
	// 	);
	// }

	// if (rollOptions.rerolledTimes) {
	// 	const timesWord = rollOptions.rerolledTimes === 1 ? 'time' : 'times';
	// 	fields.push(
	// 		<div className={`${styles.ConanResult}`}>Rerolled <CodeSpan>{rollOptions.rerolledTimes}</CodeSpan> {timesWord}</div>
	// 	);
	// }

	fields.push(
		<div className={styles.slResult}>
			<div><span className={styles.slResultLabel}>{}:</span></div>
			<div><CodeSpan className={styles.slResultSpan}>{}</CodeSpan></div>
		</div>
	);

	rollOptions.conanMode = true;

	return {
		title,
		fields,
		// isSuccess: successLevels.isSuccess,

		// finalDieResult,
		rollOptions,
		userSettings
	};
};

export default getConanLocalMsg;