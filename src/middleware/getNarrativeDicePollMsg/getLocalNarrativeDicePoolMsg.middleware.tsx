import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import joinAsBlocks from '../../utils/joinAsBlocks';
import narrativeDice from '../../consts/narrativeDice';
import CodeSpan from '../../components/CodeSpan/CodeSpan';
import styles from '../../components/ResultsModal/ResultsModal.module.css';
import { NARRATIVE_DICE_POOL_ROLLED, localMsgReady } from '../../actions/roll.actions';
import joinAsImages from '../../utils/narrativeDice/joinAsImages';

const IconRight = <FontAwesomeIcon icon={faArrowAltCircleRight} />;

export default (store:any) => (next:any) => (action:any) => {
	if (action.type === NARRATIVE_DICE_POOL_ROLLED) {
		const state = store.getState();
		const { form : { diceModuleForm } } = state;
		const formValues = diceModuleForm?.values || {};
		const { results, modifier } = action.payload;
		const allResults: Array<number> = [];
		const fields: Array<JSX.Element> = [];
		let andModifier = null;

		
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
						<div><strong>{resultsForDiceType.length}x {diceLabel}:</strong></div>
						<div>
							{
							resultsForDiceType.map((result, index) => (
								<div key={index}>{joinAsImages(result)}</div>
							))
							}
						</div>
					</div>
				</div>
			);

			// resultsForDiceType.forEach((result: number) => {
			// 	allResults.push(result);
			// });
		});


		// const sumJoined = joinAsBlocks(allResults, '+');
		// const total = allResults.reduce((a, b) => a + b, 0);

		// fields.push(
		// 	<div>
		// 		<div>{IconRight} <strong>Sum of</strong> {sumJoined}<strong>{andModifier}:</strong></div>
		// 		<div>Total: <CodeSpan>{modifier ? total + Number(modifier) : total}</CodeSpan></div>
		// 	</div>
		// );
		
		store.dispatch(localMsgReady({
			fields,
			results
		}));
	}
	next(action);
};
