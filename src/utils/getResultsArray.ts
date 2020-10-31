import getRandom from './getRandom';

export default (
	diceType: number,
	diceAmount: number,
	keepUnits: boolean
) => {
	const rollsArr = new Array(diceAmount).fill('');

	if (keepUnits) {
		// this setting will reroll only tens and will keep units untouched
		const units = getRandom(10);
		return rollsArr.map(_ => ((getRandom(10)-1) * 10 + units));
	}

	return rollsArr.map(_ => getRandom(diceType));
}
