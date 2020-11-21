import React from 'react';
import narrativeSymbols from '../../consts/narrativeSymbols';
import styles from '../../components/ResultsModal/ResultsModal.module.css';
import TooltipWrapper from '../../components/InfoTooltip/TooltipWrapper';

export default (results: string) => {
	const resultsArr = results.split(',');
	
	return resultsArr.map((result, i) => {
		let joiner = ', ';
		if (i === resultsArr.length - 1) {
			joiner = '';
		}

		// @ts-ignore
		const content = narrativeSymbols[result]?.label;

		return (
			<span key={i}>
				<TooltipWrapper content={content}>
					<img
						className={styles.narrativeImageResult}
						src={require(`../../img/${result}.png`)}
						alt={result}
					/>
				</TooltipWrapper>
			</span>
		);
	});
}
