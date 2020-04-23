import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import { faArrowAltCircleRight, faLevelUpAlt, faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import CodeSpan from '../components/CodeSpan/CodeSpan';

const IconUp = <FontAwesomeIcon icon={faArrowAltCircleUp} />;
const IconDown = <FontAwesomeIcon icon={faArrowAltCircleDown} />;
const IconRight = <FontAwesomeIcon icon={faArrowAltCircleRight} />;
const IconCocBonus = <FontAwesomeIcon icon={faLevelUpAlt} />;
const IconCocPenalty = <FontAwesomeIcon icon={faLevelDownAlt} />;

const getLocalMsg = (result:any, rollOptions:any) => {
	const {
		results,
		diceAmount,
		diceType,
		modifier,
		modSymbol,
		totalWithoutModifier,
		totalWithModifier,
		highest,
		lowest,
		cocBonus,
		cocPenalty
	} = result;
	const rolledWord = diceAmount > 1 ? 'Results' : 'Result';
	const rolled = `${diceAmount}d${diceType}`;
	const title = <>You rolled <CodeSpan>{rolled}</CodeSpan>. {rolledWord}: <CodeSpan>{results.join(', ')}</CodeSpan>.</>;
	const modifierWithSymbol = <CodeSpan>{modSymbol}{Math.abs(modifier)}</CodeSpan>;
	const fields = [];


	if (rollOptions.useModifier) {
		fields.push(
			<>Modifier: {modifierWithSymbol}.</>
		);
	}
	if (rollOptions.sumResults) {
		if (rollOptions.useModifier) {
			fields.push(
				<>{IconRight} Total (with {modifierWithSymbol} modifier): <CodeSpan>{totalWithModifier}</CodeSpan>.</>
			);
		} else {
			fields.push(
				<>{IconRight} Total: <CodeSpan>{totalWithoutModifier}</CodeSpan>.</>
			);
		}
	}
	if (rollOptions.keepHighest) {
		if (rollOptions.useModifier) {
			fields.push(
				<>{IconUp} Highest result (with {modifierWithSymbol} modifier): <CodeSpan>{highest}</CodeSpan>.</>
			);
		} else {
			fields.push(
				<>{IconUp} Highest result: <CodeSpan>{highest}</CodeSpan>.</>
			);
		}

	}
	if (rollOptions.keepLowest) {
		if (rollOptions.useModifier) {
			fields.push(
				<>{IconDown} Lowest result (with {modifierWithSymbol} modifier): <CodeSpan>{lowest}</CodeSpan>.</>
			);
		} else {
			fields.push(
				<>{IconDown} Lowest result: <CodeSpan>{lowest}</CodeSpan>.</>
			);
		}

	}
	if (rollOptions.cocBonus) {
		fields.push(
			<>{IconCocBonus} Bonus Die result: <CodeSpan>{cocBonus}</CodeSpan>.</>
		);
	}
	if (rollOptions.cocPenalty) {
		fields.push(
			<>{IconCocPenalty} Penalty Die result: <CodeSpan>{cocPenalty}</CodeSpan>.</>
		);
	}

	return { title, fields };
};

export default getLocalMsg;