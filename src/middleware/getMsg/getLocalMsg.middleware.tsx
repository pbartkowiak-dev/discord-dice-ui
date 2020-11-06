import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import { faArrowAltCircleRight, faSkull, faSun } from '@fortawesome/free-solid-svg-icons';
import joinAsBlocks from '../../utils/joinAsBlocks';
import CodeSpan from '../../components/CodeSpan/CodeSpan';
import { D6_CONAN, D20_CONAN_HL } from '../../consts/conanConstants';
import HitLocations from '../../components/HitLocations/HitLocations';
import getConanHitLocation from '../../utils/getConanHitLocations';
import styles from '../../components/ResultsModal/ResultsModal.module.css';
import { DICE_ROLLED, localMsgReady } from '../../actions/roll.actions';

const IconUp = <FontAwesomeIcon icon={faArrowAltCircleUp} />;
const IconDown = <FontAwesomeIcon icon={faArrowAltCircleDown} />;
const IconRight = <FontAwesomeIcon icon={faArrowAltCircleRight} />;
const IconScull = <FontAwesomeIcon icon={faSkull} />;
const IconSun = <FontAwesomeIcon icon={faSun} />;

const getLocalMsg = (store:any) => (next:any) => (action:any) => {
	if (action.type === DICE_ROLLED) {
		const state = store.getState();
		const { form : { diceModuleForm } } = state;
		const { rerollCount } = state;
		const formValues = diceModuleForm?.values || {};

		const { payload } = action;
		const { result, rollOptions } = payload; 
		const {
			results,
			diceAmount,
			modifier,
			modSymbol,
			totalWithoutModifier,
			totalWithModifier,
			highest,
			lowest,
			dmg,
			effects,
			diceTypeNum
		} = result;
		const hasMultipleDice = diceAmount > 1;
		const rolledWord = hasMultipleDice ? 'Results' : 'Result';
		const rolled = `${diceAmount}d${diceTypeNum}`;
		const resultsJoined = joinAsBlocks(results);
		const modifierWithSymbol = <CodeSpan>{modSymbol}{Math.abs(modifier)}</CodeSpan>;
		const fields = [];
		const isCombatDie = rollOptions.diceType === D6_CONAN;
		const isConanHitLocationDie = rollOptions.diceType === D20_CONAN_HL;
		let title;

		if (isCombatDie) {
			title = <>You rolled <CodeSpan>{rolled}</CodeSpan>.</>;
		} else {
			title = <>You rolled <CodeSpan>{rolled}</CodeSpan>. {rolledWord}: {resultsJoined}.</>;
		}
	
		if (rollOptions.useModifier) {
			fields.push(
				<>Modifier: {modifierWithSymbol}.</>
			);
		}
	
		if ((hasMultipleDice || rollOptions.useModifier) && !isCombatDie) {
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
		if (hasMultipleDice && !isCombatDie) {
			fields.push(
				<>{IconUp} Highest result rolled: <CodeSpan>{highest}</CodeSpan>.</>
			);
		}
		if (hasMultipleDice && !isCombatDie) {
			fields.push(
				<>{IconDown} Lowest result rolled: <CodeSpan>{lowest}</CodeSpan>.</>
			);
		}
	
		if (rerollCount) {
			const timesWord = rerollCount === 1 ? 'time' : 'times';
			fields.push(
				<div className={`${styles.generalResult}`}>Rerolled <CodeSpan>{rerollCount}</CodeSpan> {timesWord}</div>
			);
		}
	
		if (isCombatDie) {
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
	
		if (isConanHitLocationDie) {
			const hitResult = results[0];
			const hitLocation = getConanHitLocation(hitResult);
	
			fields.push(
				<HitLocations
					result={hitResult}
					hitLocation={hitLocation}
					isDarkHeresy={false}
					isWarhammer2e={false}
					isConan={true}
					alwaysExpanded={true}
				/>
			);
		}

		const rollDetails = {
			...rollOptions,
			...formValues,
		}
	
		store.dispatch(localMsgReady({
			title,
			fields,
			rollOptions: rollDetails,
			results
		}));
	}
	next(action);
};

export default getLocalMsg;
