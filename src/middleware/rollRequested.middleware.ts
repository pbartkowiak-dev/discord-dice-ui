import getDieNumberVal from '../utils/getDieNumberVal';
import getResultsArray from '../utils/getResultsArray';
import {
	DICE_ROLL_REQUESTED,
	diceRolled
} from '../actions/roll.actions';
import { conanDiceRolled } from '../actions/conan.actions';
import { infinityDiceRolled } from '../actions/infinity.actions';
import {
	D20_CONAN_TEST,
	D6_CONAN,
	D20_INFINITY_TEST,
	D6_INFINITY
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
			fortune,
			assistanceDice,
			assistanceDiceResults
		} = action.payload;

		const diceTypeNum = getDieNumberVal(diceType);
		const result = {} as rollDiceResult;
	
		if (fortune) {
			diceAmount = diceAmount - fortune;
		}
	
		if (itemsToStay?.length) {
			diceAmount = diceAmount - itemsToStay.length;
		}
	
		result.results = getResultsArray(diceTypeNum, diceAmount);
	
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

		if (diceType === D6_INFINITY) {
			const combatDieResults = result.results.reduce((total, current) => {
				if (current === 6) {					
					total.effects = total.effects + 1;
				} else if (current === 1 || current === 2) {
					total.dmg = total.dmg + current;
				}
				return total;
			}, { dmg: 0, effects: 0 });
			result.dmg = combatDieResults.dmg;
			result.effects = combatDieResults.effects;
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

		if (formValues.conanMode && diceType === D20_CONAN_TEST) {
			store.dispatch(conanDiceRolled({
				result,
				rollOptions: {
					...action.payload,
					...formValues,
					assistanceDiceResults: result.assistanceDiceResults
				}
			}));
		} else if (formValues.infinityMode && diceType === D20_INFINITY_TEST) {
			store.dispatch(infinityDiceRolled({
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
