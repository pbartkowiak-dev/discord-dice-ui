import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLevelUpAlt, faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import CodeSpan from '../components/CodeSpan/CodeSpan';
import getSuccessLevels from './getSuccessLevels';
import styles from './localMsgStyles.module.css';

const IconCocBonus = <FontAwesomeIcon icon={faLevelUpAlt} />;
const IconCocPenalty = <FontAwesomeIcon icon={faLevelDownAlt} />;

const getLocalCoCMsg = (result:any, rollOptions:any) => {
	const {
		results,
		diceAmount,
		cocBonus,
		cocTwoBonus,
		cocPenalty,
		cocTwoPenalty,
		cocBonusResult,
		cocPenaltyResult,
		skillLevel
	} = result;
	console.log('result', result)
	const rolledWord = diceAmount > 1 ? 'Results' : 'Result';
	const rolled = `${diceAmount}d100`;
	const title = <>You rolled <CodeSpan>{rolled}</CodeSpan>. {rolledWord}: <CodeSpan>{results.join(', ')}</CodeSpan>.</>;
	const fields = [];
	let finalDieResult;

	if (rollOptions.cocBonus || rollOptions.cocTwoBonus) {
		const BonusDiceInfo = rollOptions.cocBonus
			? <span><strong>One</strong> Bonus Die.</span>
			: <span><strong>Two</strong> Bonus Dice.</span>
		fields.push(
			<>{IconCocBonus} {BonusDiceInfo}<br/>The best result: <CodeSpan>{cocBonus}</CodeSpan>.</>
		);
		finalDieResult = cocBonusResult;
	}
	if (rollOptions.cocPenalty || rollOptions.cocTwoPenalty) {
		const PenaltyDiceInfo = rollOptions.cocBonus
			? <span><strong>One</strong> Penalty Die.</span>
			: <span><strong>Two</strong> Penalty Dice.</span>
		fields.push(
			<>{IconCocPenalty} {PenaltyDiceInfo} <br/>The worst result: <CodeSpan>{cocPenalty}</CodeSpan>.</>
		);
		finalDieResult = cocPenaltyResult;
	}

	fields.push(
		<><div>Skill level: {skillLevel}</div></>
	)
	console.log('finalDieResult', finalDieResult)

	const successLevels = getSuccessLevels(skillLevel, finalDieResult);
	const successLevelClassName = successLevels.isSuccess 
		? styles.isSuccess
		: styles.isFailure;

	fields.push(
		<><div className={`${styles.successLevel} ${successLevelClassName}`}>Critical Success</div></>
	)

	return { title, fields };
};

export default getLocalCoCMsg;