import React from 'react';
import CodeSpan from '../components/CodeSpan/CodeSpan';

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
				<>Total (with {modifierWithSymbol} modifier): <CodeSpan>{totalWithModifier}</CodeSpan>.</>
			);
		} else {
			fields.push(
				<>Total: <CodeSpan>{totalWithoutModifier}</CodeSpan>.</>
			);
		}
	}
	if (rollOptions.keepHighest) {
		fields.push(
			<>Highest result: <CodeSpan>{highest}</CodeSpan>.</>
		);
	}
	if (rollOptions.keepLowest) {
		fields.push(
			<>Lowest result: <CodeSpan>{lowest}</CodeSpan>.</>
		);
	}
	if (rollOptions.cocBonus) {
		fields.push(
			<>Bonus Die result: <CodeSpan>{cocBonus}</CodeSpan>.</>
		);
	}
	if (rollOptions.cocPenalty) {
		fields.push(
			<>Penalty Die result: <CodeSpan>{cocPenalty}</CodeSpan>.</>
		);
	}

	return { title, fields };
};

export default getLocalMsg;