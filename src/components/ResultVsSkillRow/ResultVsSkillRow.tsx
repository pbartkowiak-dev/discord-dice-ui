import React from 'react';
import CodeSpan from '../CodeSpan/CodeSpan';
import styles from './ResultVsSkillRow.module.css'

type ResultVsSkillRowPropTypes = {
	skillLevel: number | string
	finalDieResult: number | string
	isSuccess: boolean
}

function ResultVsSkillRow({ skillLevel, finalDieResult, isSuccess }: ResultVsSkillRowPropTypes) {
	const resultCodeSpanStyles = `${styles.resultValue} ${isSuccess ? styles.isSuccess : styles.isFailure}`;
	return (
		<div className={ styles.ResultVsSkillRowPropTypes }>
			<div className={ styles.Cell }>
				<CodeSpan className={resultCodeSpanStyles}>{ finalDieResult }</CodeSpan>
				<span>Roll Result</span>
			</div>
			<div className={ styles.Cell }><span>vs.</span></div>
			<div className={ styles.Cell }>
				<CodeSpan className={styles.resultValue}>{ skillLevel }</CodeSpan>
				<span>Skill Level</span>
			</div>
		</div>
	);
}



export default ResultVsSkillRow;