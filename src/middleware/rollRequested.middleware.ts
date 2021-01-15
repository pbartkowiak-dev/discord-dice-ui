import getDieNumberVal from '../utils/getDieNumberVal';
import getResultsArray from '../utils/getResultsArray';
import {
	DICE_ROLL_REQUESTED,
	diceRolled,
	cocDiceRolled,
	warhammerDiceRolled
} from '../actions/roll.actions';
import { conanDiceRolled } from '../actions/conan.actions';
import {
	D100_SL,
	D20_CONAN_TEST,
	D6_CONAN
} from '../consts/diceConstants';
import { FATE_DIE, MINUS, PLUS } from '../consts/fateConsts';
import mapValueToFate from './utils/mapValueToFate';

interface rollDiceResult {
	results: Array<number>;
	diceAmount: number;
	diceType: number;
	diceTypeNum?: number;

	modifier: number;
	modSymbol: string;

	totalWithModifier: number;
	totalWithoutModifier: number;

	highest: number;
	lowest: number;

	// CoC results
	cocBonusResult?: number | undefined;
	cocPenaltyResult?: number | undefined;
	cocBonus?: boolean;
	cocPenalty?: boolean;
	cocTwoBonus?: boolean;
	cocTwoPenalty?: boolean;
	skillLevel?: number | undefined;

	// Conan results
	effects?: number | undefined;
	dmg?: number | undefined;
	assistanceDiceResults?: Array<number>;

	// Fate results
	fateResults?: Array<string>;
	fateResultTotal?: string;
}

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === DICE_ROLL_REQUESTED) {
		const state = store.getState();
		const { form : { diceModuleForm } } = state;
		const formValues = diceModuleForm?.values || {};

		let {
			diceType,
			modifier = 0,
			diceAmount = 1,
			itemsToStay = [],
			skillLevel,

			cocBonus,
			cocTwoBonus,
			cocPenalty,
			cocTwoPenalty,

			fortune,
			assistanceDice,
			assistanceDiceResults
		} = action.payload;

		const diceTypeNum = getDieNumberVal(diceType);
		const keepUnits = (cocBonus || cocTwoBonus || cocPenalty || cocTwoPenalty);
		const result = {} as rollDiceResult;

		if (formValues.cocMode) {
			if (cocBonus || cocPenalty) {
				diceAmount = 2;
			} else if (cocTwoBonus || cocTwoPenalty) {
				diceAmount = 3;
			}
		}
	
		if (fortune) {
			diceAmount = diceAmount - fortune;
		}
	
		if (itemsToStay?.length) {
			diceAmount = diceAmount - itemsToStay.length;
		}
	
		result.results = getResultsArray(diceTypeNum, diceAmount, keepUnits);
	
		if (itemsToStay?.length) {
			diceAmount = diceAmount + itemsToStay.length;
		}
	
		result.modifier = modifier;
		result.diceAmount = diceAmount;
		result.diceType = diceType;
		result.diceTypeNum = diceTypeNum;
	
		if (fortune) {
			for (let i = 0; i < fortune; i++) {
				result.results.push(1);
			}
		}
	
		if (itemsToStay?.length) {
			for (let i = 0; i < itemsToStay.length; i++) {
				result.results.push(itemsToStay[i]);
			}
		}
	
		// Sort results
		result.results = result.results.sort((a: number, b: number) => a - b);
	
		result.totalWithModifier = result.results.reduce((a, b) => Number(a) + Number(b), Number(modifier));
		result.totalWithoutModifier = result.totalWithModifier - Number(modifier);
		result.highest = Math.max(...result.results);
		result.lowest = Math.min(...result.results);
	
		if (diceType === D6_CONAN) {
			const combatDieResults = result.results.reduce((total, current) => {
				if (current >= 5) {
					total.dmg = total.dmg + 1;
					total.effects = total.effects + 1;
				} else if (current === 1 || current === 2) {
					total.dmg = total.dmg + current;
				}
				return total;
			}, { dmg: 0, effects: 0 });
			result.dmg = combatDieResults.dmg;
			result.effects = combatDieResults.effects;
		}
	
		if (formValues.cocMode) {
			result.cocBonusResult = (cocBonus || cocTwoBonus) ? Math.min(...result.results) : undefined;
			result.cocPenaltyResult = (cocPenalty || cocTwoPenalty) ?  Math.max(...result.results) : undefined;
			result.cocBonus = cocBonus;
			result.cocPenalty = cocBonus;
			result.cocTwoBonus = cocTwoBonus;
			result.cocTwoPenalty = cocTwoPenalty;
		}
	
		if (diceType === D100_SL && (formValues.cocMode || formValues.warhammerMode)) {
			result.skillLevel = skillLevel ? Number(skillLevel) : undefined;
		}

		// assistance results should not be rerolled
		if (assistanceDiceResults && assistanceDiceResults.length) {
			result.assistanceDiceResults = assistanceDiceResults;
		} else if (assistanceDice) {
			result.assistanceDiceResults = getResultsArray(
				20,
				Number(assistanceDice),
				false
			);
		}
	
		if (modifier === 0) {
			result.modSymbol = '';
		} else if (modifier > 0) {
			result.modSymbol = '+';
		} else {
			result.modSymbol = '-';
		}

		// Fate Dice
		if (diceType === FATE_DIE) {
			result.fateResults = result.results.map(mapValueToFate);
			const fateResultTotal = result.fateResults.reduce((resultTotal, current) => {
				if (current === PLUS) {
					return resultTotal + 1;
				} else if (current === MINUS) {
					return resultTotal -1;
				}
				return resultTotal;
			}, 0) + Number(modifier);

			if (fateResultTotal > 0) {
				result.fateResultTotal = `+${fateResultTotal}`;
			} else {
				result.fateResultTotal = `${fateResultTotal}`;
			}
		}

		if (formValues.cocMode && diceType === D100_SL) {
			store.dispatch(cocDiceRolled({
				result,
				rollOptions: {
					...action.payload,
					...formValues
				}
			}));
		} else if (formValues.warhammerMode && diceType === D100_SL) {
			store.dispatch(warhammerDiceRolled({
				result,
				rollOptions: {
					...action.payload,
					...formValues
				}
			}));
		} else if (formValues.conanMode && diceType === D20_CONAN_TEST) {
			store.dispatch(conanDiceRolled({
				result,
				rollOptions: {
					...action.payload,
					...formValues,
					assistanceDiceResults: result.assistanceDiceResults
				}
			}));
		} else {
			store.dispatch(diceRolled({
				result,
				rollOptions: {
					...action.payload,
					...formValues
				}
			}));
		}
	}
	next(action);
};
