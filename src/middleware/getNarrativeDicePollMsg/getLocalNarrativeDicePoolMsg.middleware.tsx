import React from 'react';
import classNames from 'classnames';
import joinAsBlocks from '../../utils/joinAsBlocks';
import narrativeDice from '../../consts/narrativeDice';
import styles from '../../components/ResultsModal/ResultsModal.module.css';
import { NARRATIVE_DICE_POOL_ROLLED, localMsgReady } from '../../actions/roll.actions';
import joinAsImages from './../utils/joinAsImages';
import { ResultsDerivedType } from '../../components/PoolBuilder/PoolBuilderTypes';
import TooltipWrapper from '../../components/InfoTooltip/TooltipWrapper';
import narrativeSymbols from '../../consts/narrativeSymbols';

export default (store:any) => (next:any) => (action:any) => {
	if (action.type === NARRATIVE_DICE_POOL_ROLLED) {
		const { results, resultsDerived } = action.payload;
		const fields: Array<JSX.Element> = [];
		
		Object.keys(results).forEach((diceType: string) => {
			const resultsForDiceType: Array<string> = results[diceType];
			// @ts-ignore
			const diceLabel: string = narrativeDice[diceType]?.label;

			fields.push(
				<div className={classNames({
					[styles.poolResultsBlock]: true,
					[styles.resultsBlock]: true}
				)}>
					<div className={styles.resultsBlockImageContainer}>
						<img
							className={styles.resultsBlockImage}
							src={require(`../../img/${diceType}.png`)}
							alt={diceType}
						/>
					</div>
					<div className={styles.resultsBlockContentContainer}>
						<div>{resultsForDiceType.length}x {diceLabel}:</div>
						<div>
							{
							joinAsBlocks(resultsForDiceType.map((result, index) => (
								<span key={index}>{joinAsImages(result)}</span>
							)))
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
			.map((resultsTuple: [string, number]) => {
				// transform into JSX elements
				const symbolType = resultsTuple[0];
				const symbolTCount = resultsTuple[1];
				// @ts-ignore
				const symbolLabel = narrativeSymbols[symbolType]?.label;

				return (
					<div className={styles.derivedResultsItem}>
						<TooltipWrapper content={`${symbolLabel || symbolType} (${symbolTCount})`}>
							<div>
								<img
									className={styles.derivedResultsImage}
									src={require(`../../img/${symbolType}.png`)}
									alt={symbolType}
								/>
								<div className={styles.derivedResultsCounter}>
									<span>{symbolTCount}</span>
								</div>
							</div>
						</TooltipWrapper>
					</div>
				);
			});

		fields.push(
			<div className={styles.derivedResultsContainer}>
				<p>Results Summary:</p>
				<div className={styles.derivedResultsList}>
					{ derivedResultsList }
				</div>
			</div>
		);
		
		store.dispatch(localMsgReady({
			fields,
			results
		}));
	}
	next(action);
};
