import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faDiceD6 } from '@fortawesome/free-solid-svg-icons';
import joinAsBlocks from '../../utils/joinAsBlocks';
import CodeSpan from '../../components/CodeSpan/CodeSpan';
import styles from '../../components/ResultsModal/ResultsModal.module.css';
import { DICE_POOL_ROLLED, localMsgReady } from '../../actions/roll.actions';

const IconRight = <FontAwesomeIcon icon={faArrowAltCircleRight} />;
const IconD6 = <FontAwesomeIcon icon={faDiceD6} />;

const getLocalMsg = (store:any) => (next:any) => (action:any) => {
	if (action.type === DICE_POOL_ROLLED) {
		const state = store.getState();
		const { form : { diceModuleForm } } = state;
		const { rerollCount } = state;
		const formValues = diceModuleForm?.values || {};
		const { results } = action.payload;
		const allResults: Array<number> = [];
		const fields = [];

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

		const sumJoined = joinAsBlocks(allResults, '+');
		fields.push(
			<div>
				<div>{IconRight} <strong>Sum of</strong> {sumJoined}<strong>:</strong></div>
				<div className={styles.poolResultsRow}>Total: <CodeSpan>{allResults.reduce((a, b) => a + b, 0)}</CodeSpan></div>
			</div>
		);
		
		store.dispatch(localMsgReady({
			fields,
			results
		}));
	}
	next(action);
};

export default getLocalMsg;
