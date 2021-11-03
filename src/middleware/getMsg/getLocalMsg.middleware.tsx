import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowAltCircleRight, faMinus, faPlus, faSkull, faSun } from '@fortawesome/free-solid-svg-icons';
import joinAsBlocks from '../../utils/joinAsBlocks';
import CodeSpan from '../../components/CodeSpan/CodeSpan';
import { D6_CONAN, D20_CONAN_HL, D6_INFINITY, D20_INFINITY_HL, TOR_FEAT_DIE } from '../../consts/diceConstants';
import HitLocations from '../../components/HitLocations/HitLocations';
import getConanHitLocation from '../../utils/getConanHitLocations';
import getInfinityHitLocation from '../../utils/getInfinityHitLocations';
import styles from '../../components/ResultsModal/ResultsModal.module.css';
import { DICE_ROLLED, localMsgReady } from '../../actions/roll.actions';
import { FateResult } from '../../consts/fateConsts';
import { FateSymbol } from "../utils/FateSymbol";
import { EYE_SCORE, GANDALF_SCORE } from "../../consts/torDice";
import { EYE_DESCRIPTION, GANDALF_DESCRIPTION } from "../../components/tor/getDiscordMsgData";

const IconUp = <FontAwesomeIcon icon={faArrowAltCircleUp} />;
const IconDown = <FontAwesomeIcon icon={faArrowAltCircleDown} />;
const IconRight = <FontAwesomeIcon icon={faArrowAltCircleRight} />;
const IconScull = <FontAwesomeIcon icon={faSkull} />;
const IconSun = <FontAwesomeIcon icon={faSun} />;

const getLocalMsg = (store:any) => (next:any) => (action:any) => {
	if (action.type === DICE_ROLLED) {
		const state = store.getState();
		const { rerollCount } = state;

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
			diceTypeNum,
			fateResults,
			fateResultTotal
		} = result;
		const hasMultipleDice = diceAmount > 1;
		const rolledWord = hasMultipleDice ? 'Results' : 'Result';
		const rolled = `${diceAmount}d${diceTypeNum}`;

		let featDiceResultsWithIcons;
		if (rollOptions.diceType === TOR_FEAT_DIE) {
			featDiceResultsWithIcons = results.map(((result: number) => {
				if (result === EYE_SCORE) {
					return EYE_DESCRIPTION;
				} else if (result === GANDALF_SCORE) {
					return GANDALF_DESCRIPTION;
				}
				return result;
			}));
		}

		const resultsJoined = joinAsBlocks(featDiceResultsWithIcons || results);
		const modifierWithSymbol = <CodeSpan>{modSymbol}{Math.abs(modifier)}</CodeSpan>;
		const fields = [];
		const isCombatDie = rollOptions.diceType === D6_CONAN || rollOptions.diceType === D6_INFINITY;
		const isConanHitLocationDie = rollOptions.diceType === D20_CONAN_HL;
		const isInfinityHitLocationDie = rollOptions.diceType === D20_INFINITY_HL;
		const isFate = fateResults && fateResults.length;

		if (rollOptions.useModifier && (!isCombatDie && !(isConanHitLocationDie || isInfinityHitLocationDie))) {
			fields.push(
				<>Modifier: {modifierWithSymbol}.</>
			);
		}

		if ((hasMultipleDice || rollOptions.useModifier || isFate) && (!isCombatDie && !(isConanHitLocationDie || isInfinityHitLocationDie))) {
			if (rollOptions.useModifier) {
				fields.push(
					<>{IconRight} Total (with {modifierWithSymbol} modifier): <CodeSpan>{fateResultTotal || totalWithModifier}</CodeSpan>.</>
				);
			} else {
				fields.push(
					<>{IconRight} Total: <CodeSpan>{fateResultTotal || totalWithoutModifier}</CodeSpan>.</>
				);
			}
		}
		if (hasMultipleDice && (!isCombatDie && !(isConanHitLocationDie || isInfinityHitLocationDie) && !isFate)) {
			fields.push(
				<>{IconUp} Highest result rolled: <CodeSpan>{highest}</CodeSpan>.</>
			);
		}
		if (hasMultipleDice && (!isCombatDie && !(isConanHitLocationDie || isInfinityHitLocationDie) && !isFate)) {
			fields.push(
				<>{IconDown} Lowest result rolled: <CodeSpan>{lowest}</CodeSpan>.</>
			);
		}

		if (rerollCount) {
			const timesWord = rerollCount === 1 ? 'time' : 'times';
			fields.push(
				<div className={styles.generalResult}>Rerolled <CodeSpan>{rerollCount}</CodeSpan> {timesWord}</div>
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
			const hitLocation = getConanHitLocation(results[0]);
			fields.push(
				<HitLocations
					hitLocation={hitLocation}
					isConan={true}
					alwaysExpanded={true}
				/>
			);
		}

		if (isInfinityHitLocationDie) {
			const hitLocation = getInfinityHitLocation(results[0]);
			fields.push(
				<HitLocations
					hitLocation={hitLocation}
					isInfinity={true}
					alwaysExpanded={true}
				/>
			);
		}

		let titleMsg;
		let resultsMsg

		if (isFate) {
			titleMsg = (
				<div>
					<strong>You rolled</strong> <CodeSpan>{diceAmount}dF</CodeSpan><strong>. {rolledWord}:</strong>
				</div>
			);

			resultsMsg = joinAsBlocks(fateResults);
			resultsMsg = joinAsBlocks(
				fateResults.map((fateResult: FateResult) => FateSymbol(fateResult))
			);
		} else {
			titleMsg = (
				<div>
					<strong>You rolled</strong> <CodeSpan>{rolled}</CodeSpan><strong>. {rolledWord}:</strong>
				</div>
			);
			resultsMsg = resultsJoined;
		}

		const title = (
			<div className={styles.resultsBlock}>
				<div className={styles.resultsBlockImageContainer}>
					<img
						className={styles.resultsBlockImage}
						src={require(`../../img/${rollOptions.diceType}.png`)}
						alt={rollOptions.diceType}
					/>
				</div>
				<div className={styles.resultsBlockContentContainer}>
					{ titleMsg }
					<div>{ resultsMsg }.</div>
				</div>
			</div>
		);

		store.dispatch(localMsgReady({
			title,
			fields,
			rollOptions: {
				...rollOptions,
				...rollOptions,
			},
			results
		}));
	}
	next(action);
};

export default getLocalMsg;
