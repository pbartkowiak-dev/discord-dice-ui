import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import joinAsBlocks from '../../utils/joinAsBlocks';
import narrativeDice from '../../consts/narrativeDice';
import CodeSpan from '../../components/CodeSpan/CodeSpan';
import styles from '../../components/ResultsModal/ResultsModal.module.css';
import { NARRATIVE_DICE_POOL_ROLLED, localMsgReady } from '../../actions/roll.actions';
import joinAsImages from './../utils/joinAsImages';

const IconRight = <FontAwesomeIcon icon={faArrowAltCircleRight} />;

export default (store:any) => (next:any) => (action:any) => {
	if (action.type === NARRATIVE_DICE_POOL_ROLLED) {
		const state = store.getState();
		const { form : { diceModuleForm } } = state;
		const formValues = diceModuleForm?.values || {};
		const { results, allResults } = action.payload;
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
						<div><strong>{resultsForDiceType.length}x {diceLabel}:</strong></div>
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

		console.log('allResults', allResults);
		
		store.dispatch(localMsgReady({
			fields,
			results
		}));
	}
	next(action);
};
