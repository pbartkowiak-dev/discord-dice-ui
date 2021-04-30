import React from 'react';
import classNames from 'classnames';
import narrativeDice from '../../consts/narrativeDice';
import styles from '../../components/ResultsModal/ResultsModal.module.css';
import DerivedResultsItem from '../../components/DerivedResults/DerivedResultsItem';
import derivedResultsStyles from '../../components/DerivedResults/DerivedResults.module.css';
import { NARRATIVE_DICE_POOL_ROLLED, localMsgReady } from '../../actions/roll.actions';
import joinAsImages from './../utils/joinAsImages';
import { ResultsDerivedType } from '../../components/PoolBuilder/PoolBuilderTypes';
import narrativeSymbols from '../../consts/narrativeSymbols';
import CodeSpan from '../../components/CodeSpan/CodeSpan';
import narrativeDiceSorter from '../utils/narrativeDiceSorter';
import TooltipWrapper from '../../components/InfoTooltip/TooltipWrapper';

export default (store:any) => (next:any) => (action:any) => {
	if (action.type === NARRATIVE_DICE_POOL_ROLLED) {
		const state = store.getState();
		const { results, resultsDerived } = action.payload;
		const { rerollCount } = state;
		const fields: Array<JSX.Element> = [];

		if (rerollCount) {
			const timesWord = rerollCount === 1 ? 'time' : 'times';
			fields.push(
				<div className={styles.generalResult}>Rerolled <CodeSpan>{rerollCount}</CodeSpan> {timesWord}</div>
			);
		}

		Object.keys(results)
			.sort(narrativeDiceSorter)
			.forEach((diceType: string) => {
				const resultsForDiceType: Array<string> = results[diceType];

				// @ts-ignore
				const diceLabel: string = narrativeDice[diceType]?.label;
				const tooltipContent = `${resultsForDiceType.length}x ${diceLabel}`;

				fields.push(
					<div className={classNames({
						[styles.poolResultsBlock]: true,
						[styles.resultsBlock]: true
					})}>
						<div className={styles.resultsBlockImageContainer}>
							<TooltipWrapper content={tooltipContent}>
								<img
									className={styles.resultsBlockImage}
									src={require(`../../img/${diceType}.png`)}
									alt={diceType}
								/>
							</TooltipWrapper>
						</div>
						<div className={styles.resultsBlockContentContainer}>
							<div>
								{
									resultsForDiceType.map((result, index) => (
										<span key={index}>{joinAsImages(result, diceType)}</span>
									))
								}
							</div>
						</div>
					</div>
				);
		});

		const derivedResultsList = Object.entries(resultsDerived as ResultsDerivedType)
			.filter((resultsTuple: [string, number]) => {
				// return non-zero results;
				return resultsTuple[1];
			})
			.map((resultsTuple: [string, number], index: number) => {
				// transform into JSX elements
				const symbolType = resultsTuple[0];
				const symbolCount = resultsTuple[1];
				// @ts-ignore
				const symbolLabel = narrativeSymbols[symbolType]?.label;

				return (
					<DerivedResultsItem
						key={`${symbolType}_${index}`}
						symbolCount={symbolCount}
						tooltipContent={symbolLabel}
						symbolType={symbolType}
						symbolImageName={symbolType}
					/>
				);
			});

		fields.push(
			<div className={derivedResultsStyles.derivedResultsContainer}>
				<p>Results Summary:</p>
				<div className={derivedResultsStyles.derivedResultsList}>
					{ derivedResultsList }
				</div>
			</div>
		);


		store.dispatch(localMsgReady({
			fields,
			results,
			isPool: true
		}));
	}
	next(action);
};
