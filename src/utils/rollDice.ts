import getRandom from './getRandom';

function getResultsArray(diceType:number = 6, diceAmount:number = 1, keepUnits:boolean) {
	const rollsArr = new Array(diceAmount).fill('');
	if (keepUnits) {
		// this setting will reroll only tens and will keep units untouched
		const units = getRandom(10);
		return rollsArr.map(_ => ((getRandom(10)-1) * 10 + units));
	}
	return rollsArr.map(_ => getRandom(diceType));
}

type rollDiceProps = {
	diceType:number,
	modifier: number,
	diceAmount: number,
	rollOptions: any
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
	cocBonus: number
	cocPenalty: number
}

const rollDice = ({ diceType, modifier = 0, diceAmount, rollOptions }:rollDiceProps) => {
	const keepUnits = (rollOptions.cocBonus || rollOptions.cocPenalty) && Number(diceType) === 100;
	const result = {} as rollDiceResult;

	result.results = getResultsArray(diceType, diceAmount, keepUnits);
	result.modifier = modifier;
	result.diceAmount = diceAmount;
	result.diceType = diceType;
	result.totalWithModifier = result.results.reduce((a, b) => Number(a) + Number(b), Number(modifier));
	result.totalWithoutModifier = result.totalWithModifier - Number(modifier);
	result.highest = Math.max(...result.results) + Number(modifier);
	result.lowest = Math.min(...result.results) + Number(modifier);
	result.cocBonus = Math.max(...result.results);
	result.cocPenalty = Math.min(...result.results);

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