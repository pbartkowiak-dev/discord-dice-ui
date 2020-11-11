import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faDiceD6 } from '@fortawesome/free-solid-svg-icons';
import joinAsBlocks from '../../utils/joinAsBlocks';
import CodeSpan from '../../components/CodeSpan/CodeSpan';
import styles from '../../components/ResultsModal/ResultsModal.module.css';
import { DICE_POOL_ROLLED, localMsgReady } from '../../actions/roll.actions';

const IconRight = <FontAwesomeIcon icon={faArrowAltCircleRight} />;
const IconD6 = <FontAwesomeIcon icon={faDiceD6} />;

export default (store:any) => (next:any) => (action:any) => {
	if (action.type === DICE_POOL_ROLLED) {
		const state = store.getState();
		const { form : { diceModuleForm } } = state;
		const { rerollCount } = state;
		const formValues = diceModuleForm?.values || {};
		const { results, modifier } = action.payload;
		const allResults: Array<number> = [];
		const fields = [];
		let withModifier = null;

		if (rerollCount) {
			const timesWord = rerollCount === 1 ? 'time' : 'times';
			fields.push(
				<div className={styles.generalResult}>Rerolled <CodeSpan>{rerollCount}</CodeSpan> {timesWord}</div>
			);
		}
		
		Object.keys(results).forEach((diceType: string) => {
			const resultsForDiceType: Array<number> = results[diceType];
			fields.push(
				<div className={styles.poolResultsBlock}>
					<div>{IconD6} <strong>{resultsForDiceType.length}{diceType}:</strong></div>
					<div className={styles.poolResultsRow}>{joinAsBlocks(resultsForDiceType)}</div>
				</div>
			);

			resultsForDiceType.forEach((result: number) => {
				allResults.push(result);
			});
		});

		if (modifier && modifier !== '0') {
			const modSymbol = Number(modifier) > 0 ? '+'  : '-';
			const modWithSymbol = `${modSymbol}${Math.abs(modifier)}`;
			fields.push(
				<div className={styles.poolModifierResult}>Modifier: <CodeSpan>{modWithSymbol}</CodeSpan></div>
			);
			withModifier = <> (with <CodeSpan>{modWithSymbol}</CodeSpan>modifier)</>;
		}

		const sumJoined = joinAsBlocks(allResults, '+');
		const total = allResults.reduce((a, b) => a + b, 0);

		fields.push(
			<div>
				<div>{IconRight} <strong>Sum of</strong> {sumJoined}<strong>{withModifier}:</strong></div>
				<div className={styles.poolResultsRow}>Total: <CodeSpan>{modifier ? total + Number(modifier) : total}</CodeSpan></div>
			</div>
		);
		
		store.dispatch(localMsgReady({
			fields,
			results
		}));
	}
	next(action);
};
