import React from 'react';
import narrativeSymbols from '../../consts/narrativeSymbols';
import styles from '../../components/ResultsModal/ResultsModal.module.css';
import TooltipWrapper from '../../components/InfoTooltip/TooltipWrapper';
import { D100 } from '../../consts/diceConstants';
import narrativeDice from '../../consts/narrativeDice';

export default (results: string, diceType?: string) => {
	const resultsArr = results.split(',');
	
	return resultsArr.map((result, i) => {
		let joiner = ', ';
		let content: string;
		let body: JSX.Element;

		if (i === resultsArr.length - 1) {
			joiner = '';
		}

		if (diceType === D100) {
			content = `${narrativeDice[D100].label} (${result}%)`;
			body = <span className="cursor--default">{result}</span>;
		} else {
			// @ts-ignore
			content = narrativeSymbols[result]?.label;
			body = (
				<img
					className={styles.narrativeImageResult}
					src={require(`../../img/${result}.png`)}
					alt={result}
				/>
			);
		}

		return (
			<TooltipWrapper content={content} key={i}>
				{ body }
			</TooltipWrapper>
		);
	});
}
