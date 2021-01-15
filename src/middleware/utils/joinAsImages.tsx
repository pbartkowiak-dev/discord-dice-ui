import React from 'react';
import classNames from 'classnames';
import {
	BOOST,
	DIFFICULTY,
	CHALLENGE,
	SETBACK,
	ABILITY,
	PROFICIENCY,
	FORCE
} from '../../consts/diceConstants';
import narrativeSymbols from '../../consts/narrativeSymbols';
import styles from '../../components/ResultsModal/ResultsModal.module.css';
import TooltipWrapper from '../../components/InfoTooltip/TooltipWrapper';

interface d {
	[key: string]: string | undefined | boolean;
}

export default (results: string, diceType: string) => {
	const resultsArr = results.split(',');

	const whiteSymbolDie: d = {
		[SETBACK]: '_white',
		[CHALLENGE]: '_white',
		[DIFFICULTY]: '_white'
	};

	const cubeDie: d = {
		[SETBACK]: true,
		[BOOST]: true
	};

	const triangleDie: d = {
		[DIFFICULTY]: true,
		[ABILITY]: true
	};

	const dodecahedronDie: d = {
		[CHALLENGE]: true,
		[PROFICIENCY]: true,
		[FORCE]: true
	};

	let tooltipContent = '';

	const symbolsResults = resultsArr.map((result: string, i) => {
		if (tooltipContent) {
			tooltipContent += ', ';
		}
		// @ts-ignore
		tooltipContent += narrativeSymbols[result]?.label;

		return (
			<img
				key={`${result}_${i}`}
				className={classNames({
					[styles.narrativeImageResult]: true,
					[styles.narrativeImageResultIsTriangle]: triangleDie[diceType],
					[styles.narrativeImageResultIsDodecahedron]: dodecahedronDie[diceType]
				})}
				src={require(`../../img/${result}${whiteSymbolDie[diceType] || ''}.png`)}
				alt={result}
			/>
		);
	});

	const dieBg = require(`../../img/${diceType}_bg.png`);

	return (
		<TooltipWrapper content={tooltipContent}>
			<div
				style={{backgroundImage: `url("${dieBg}")`}}
				className={classNames({
					[styles.narrativeImageResultBg]: true,
					[styles.narrativeImageResultTwoSymbols]: resultsArr.length > 1,
					[styles.narrativeImageResultIsCube]: cubeDie[diceType]
				})}
			>
				{ symbolsResults}
			</div>
		</TooltipWrapper>
	);
}
