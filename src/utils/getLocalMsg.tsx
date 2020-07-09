import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import { faArrowAltCircleRight, faSkull, faSun } from '@fortawesome/free-solid-svg-icons';
import joinAsBlocks from './joinAsBlocks';
import CodeSpan from '../components/CodeSpan/CodeSpan';

const IconUp = <FontAwesomeIcon icon={faArrowAltCircleUp} />;
const IconDown = <FontAwesomeIcon icon={faArrowAltCircleDown} />;
const IconRight = <FontAwesomeIcon icon={faArrowAltCircleRight} />;
const IconScull = <FontAwesomeIcon icon={faSkull} />;
const IconSun = <FontAwesomeIcon icon={faSun} />;

const getLocalMsg = (result:any, rollOptions:any,  userSettings?:any) => {
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
		dmg,
		effects
	} = result;
	const rolledWord = diceAmount > 1 ? 'Results' : 'Result';
	const rolled = `${diceAmount}d${diceType}`;
	const resultsJoined = joinAsBlocks(results);
	const modifierWithSymbol = <CodeSpan>{modSymbol}{Math.abs(modifier)}</CodeSpan>;
	const fields = [];
	let title;

	if (rollOptions.combatDie) {
		title = <>You rolled <CodeSpan>{rolled}</CodeSpan>.</>;
	} else {
		title = <>You rolled <CodeSpan>{rolled}</CodeSpan>. {rolledWord}: {resultsJoined}.</>;
	}

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
	console.log('rollOptions getLocal', rollOptions);
	if (rollOptions.combatDie) {
		fields.push(
			<strong>Combat Die Results:</strong>
		);
		fields.push(
			<>{IconScull} Damage: <CodeSpan>{dmg}</CodeSpan>.</>
		);
		fields.push(
			<>{IconSun} Effects: <CodeSpan>{effects}</CodeSpan>.</>
		);
	}
	return {
		title,
		fields,
		rollOptions,
		userSettings,
		results
	};
};

export default getLocalMsg;
