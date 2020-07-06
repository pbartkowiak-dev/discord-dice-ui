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

	cocBonusResult?: number | undefined
	cocPenaltyResult?: number | undefined
	cocBonus?: boolean
	cocPenalty?: boolean
	cocTwoBonus?: boolean
	cocTwoPenalty?: boolean
	skillLevel?: number | undefined
}

const rollDice = ({
	diceType = 6,
	modifier = 0,
	diceAmount = 1,
	rollOptions,
	itemsToStay = []
}:rollDiceProps) => {
	// @TODO DETECT CONAN COMBAT DIE
	console.log('rollOptions', rollOptions)
	const { cocBonus, cocTwoBonus, cocPenalty, cocTwoPenalty, skillLevel, fortune } = rollOptions;
	const keepUnits = (cocBonus || cocTwoBonus || cocPenalty || cocTwoPenalty);
	const result = {} as rollDiceResult;
	const fortuneNum = Number(fortune);

	if (rollOptions.cocMode) {
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

	if (rollOptions.cocMode) {
		result.cocBonusResult = (cocBonus || cocTwoBonus) ? Math.min(...result.results) : undefined;
		result.cocPenaltyResult = (cocPenalty || cocTwoPenalty) ?  Math.max(...result.results) : undefined;
		result.cocBonus = cocBonus;
		result.cocPenalty = cocBonus;
		result.cocTwoBonus = cocTwoBonus;
		result.cocTwoPenalty = cocTwoPenalty;
	}

	if (rollOptions.cocMode || rollOptions.warhammerMode) {
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