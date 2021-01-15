import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowAltCircleRight, faMinus, faPlus, faSkull, faSun } from '@fortawesome/free-solid-svg-icons';
import joinAsBlocks from '../../utils/joinAsBlocks';
import CodeSpan from '../../components/CodeSpan/CodeSpan';
import { D6_CONAN, D20_CONAN_HL } from '../../consts/diceConstants';
import HitLocations from '../../components/HitLocations/HitLocations';
import getConanHitLocation from '../../utils/getConanHitLocations';
import styles from '../../components/ResultsModal/ResultsModal.module.css';
import { DICE_ROLLED, localMsgReady } from '../../actions/roll.actions';
import { MINUS, PLUS } from '../../consts/fateConsts';
import TooltipWrapper from '../../components/InfoTooltip/TooltipWrapper';

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
			diceTypeNum,
			fateResults
		} = result;
		const hasMultipleDice = diceAmount > 1;
		const rolledWord = hasMultipleDice ? 'Results' : 'Result';
		const rolled = `${diceAmount}d${diceTypeNum}`;
		const resultsJoined = joinAsBlocks(results);
		const modifierWithSymbol = <CodeSpan>{modSymbol}{Math.abs(modifier)}</CodeSpan>;
		const fields = [];
		const isCombatDie = rollOptions.diceType === D6_CONAN;
		const isConanHitLocationDie = rollOptions.diceType === D20_CONAN_HL;
		const isFate = fateResults && fateResults.length;
	
		if (rollOptions.useModifier && (!isCombatDie && !isConanHitLocationDie)) {
			fields.push(
				<>Modifier: {modifierWithSymbol}.</>
			);
		}
	
		if ((hasMultipleDice || rollOptions.useModifier) && (!isCombatDie && !isConanHitLocationDie)) {
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
		if (hasMultipleDice && (!isCombatDie && !isConanHitLocationDie && !isFate)) {
			fields.push(
				<>{IconUp} Highest result rolled: <CodeSpan>{highest}</CodeSpan>.</>
			);
		}
		if (hasMultipleDice && (!isCombatDie && !isConanHitLocationDie && !isFate)) {
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
				fateResults.map((fateResult: string) => {
					if (fateResult === PLUS) {
						return <TooltipWrapper content="Plus">
							<FontAwesomeIcon icon={faPlus} />
						</TooltipWrapper>;
					}  else if (fateResult === MINUS) {
						return <TooltipWrapper content="Minus">
							<FontAwesomeIcon icon={faMinus} />
						</TooltipWrapper>;
					}
					return <TooltipWrapper content="Blank">
						<FontAwesomeIcon icon={faSquare} />
					</TooltipWrapper>;
				})
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
				...formValues,
			},
			results
		}));
	}
	next(action);
};

export default getLocalMsg;
