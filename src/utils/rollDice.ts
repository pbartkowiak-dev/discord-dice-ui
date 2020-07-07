import getRandom from './getRandom';

function getResultsArray(diceType:number, diceAmount:number, keepUnits:boolean) {
	const rollsArr = new Array(diceAmount).fill('');
	if (keepUnits) {
		// this setting will reroll only tens and will keep units untouched
		const units = getRandom(10);
		return rollsArr.map(_ => ((getRandom(10)-1) * 10 + units));
	}
	return rollsArr.map(_ => getRandom(diceType));
}

type rollDiceProps = {
	diceType: number
	modifier?: number
	diceAmount?: number
	rollOptions: any
	itemsToStay?: Array<number>
}

type rollDiceResult = {
	results: Array<number>
	diceAmount: number
	diceType: number

	modifier: number
	modSymbol: string

	totalWithModifier: number
	totalWithoutModifier: number

	highest: number
	lowest: number

	// CoC results
	cocBonusResult?: number | undefined
	cocPenaltyResult?: number | undefined
	cocBonus?: boolean
	cocPenalty?: boolean
	cocTwoBonus?: boolean
	cocTwoPenalty?: boolean
	skillLevel?: number | undefined

	// Conan results
	effects?: number | undefined
	dmg?: number | undefined
}

const rollDice = ({
	diceType = 6,
	modifier = 0,
	diceAmount = 1,
	rollOptions = {},
	itemsToStay = []
}:rollDiceProps) => {
	const { cocMode, cocBonus, cocTwoBonus, cocPenalty, cocTwoPenalty, skillLevel, fortune, combatDie } = rollOptions;
	const keepUnits = (cocBonus || cocTwoBonus || cocPenalty || cocTwoPenalty);
	const result = {} as rollDiceResult;
	const fortuneNum = Number(fortune);

	if (cocMode) {
		if (cocBonus || cocPenalty) {
			diceAmount = 2;
		} else if (cocTwoBonus || cocTwoPenalty) {
			diceAmount = 3;
		}
	}

	if (fortune && fortuneNum > 0) {
		diceAmount = diceAmount - fortuneNum;
	}

	if (itemsToStay && itemsToStay.length) {
		diceAmount = diceAmount - itemsToStay.length;
	}

	result.results = getResultsArray(diceType, diceAmount, keepUnits);
	result.modifier = modifier;
	result.diceAmount = diceAmount;
	result.diceType = diceType;

	if (fortune && fortuneNum) {
		for (let i = 0; i < fortuneNum; i++) {
			result.results.push(1);
		}
	}

	if (itemsToStay && itemsToStay.length) {
		for (let i = 0; i < itemsToStay.length; i++) {
			result.results.push(itemsToStay[i]);
		}
	}

	result.totalWithModifier = result.results.reduce((a, b) => Number(a) + Number(b), Number(modifier));
	result.totalWithoutModifier = result.totalWithModifier - Number(modifier);
	result.highest = Math.max(...result.results) + Number(modifier);
	result.lowest = Math.min(...result.results) + Number(modifier);

	if (combatDie) {
		const combatDieResults = result.results.reduce((total, current) => {
			if (current >= 5) {
				total.dmg = total.dmg + 1;
				total.effects = total.effects + 1;
			} else if (current === 1 || current === 2) {
				total.dmg = total.dmg + current;
			}
			return total;
		}, {dmg: 0, effects: 0});	
		result.dmg = combatDieResults.dmg;
		result.effects = combatDieResults.effects;
	}

	if (cocMode) {
		result.cocBonusResult = (cocBonus || cocTwoBonus) ? Math.min(...result.results) : undefined;
		result.cocPenaltyResult = (cocPenalty || cocTwoPenalty) ?  Math.max(...result.results) : undefined;
		result.cocBonus = cocBonus;
		result.cocPenalty = cocBonus;
		result.cocTwoBonus = cocTwoBonus;
		result.cocTwoPenalty = cocTwoPenalty;
	}

	if (cocMode || rollOptions.warhammerMode) {
		result.skillLevel = skillLevel ? Number(skillLevel) : undefined;
	}

	if (modifier === 0) {
		result.modSymbol = '';
	} else if (modifier > 0) {
		result.modSymbol = '+';
	} else {
		result.modSymbol = '-';
	}

	return result;
};

export default rollDice;