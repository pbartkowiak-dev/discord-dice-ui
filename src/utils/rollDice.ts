import getRandom from './getRandom';

export default function rollDice(diceType:number = 6, diceAmount:number = 1, keepUnits:boolean = false) {
	console.log('rollDice, diceType', diceType, typeof(diceType))
	console.log('rollDice, keepUnits', keepUnits)
	const rollsArr = new Array(diceAmount).fill('');
	if (keepUnits && Number(diceType) === 100) {
		// this setting will reroll only tens and will keep units untouched
		const units = getRandom(10);
		return rollsArr.map(_ => ((getRandom(10)-1) * 10 + units));
	}
	return rollsArr.map(_ => getRandom(diceType));
}