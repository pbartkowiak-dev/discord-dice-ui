import getDieNumberVal from '../utils/getDieNumberVal';
import getResultsArray from '../utils/getResultsArray';
import {
	DICE_ROLL_REQUESTED,
	diceRolled,
	cocDiceRolled,
	conanDiceRolled,
	warhammerDiceRolled
} from '../actions/roll.actions';
import {
	D100_SL,
	D20_CONAN_TEST,
	D6_CONAN
} from '../consts/diceConstants';

interface rollDiceProps {
	diceType: number;
	modifier?: number;
	diceAmount?: number;
	rollOptions: any;
	itemsToStay?: Array<number>;
}

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
			rollOptions = {},
			itemsToStay = [],
			skillLevel,

			cocBonus,
			cocTwoBonus,
			cocPenalty,
			cocTwoPenalty,

			fortune,
			assistanceDice
		} = action.payload;

		const diceTypeNum = getDieNumberVal(diceType);
		const keepUnits = (cocBonus || cocTwoBonus || cocPenalty || cocTwoPenalty);
		const result = {} as rollDiceResult;

		// Conan
		let assistanceDiceResults;

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

		if (rollOptions.assistanceDiceResults) {
			result.assistanceDiceResults = rollOptions.assistanceDiceResults;
		} else if (assistanceDice) {
			assistanceDiceResults = getResultsArray(
				20,
				Number(assistanceDice),
				false
			);
			result.assistanceDiceResults = assistanceDiceResults;
		}
	
		if (modifier === 0) {
			result.modSymbol = '';
		} else if (modifier > 0) {
			result.modSymbol = '+';
		} else {
			result.modSymbol = '-';
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
					assistanceDiceResults
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
