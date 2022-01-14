import getRandom from "./getRandom";

export default (
  diceType: number,
  diceAmount: number = 1,
  keepUnits?: boolean,
  sort: boolean = true
): Array<number> => {
  const rollsArr = new Array(diceAmount).fill("");
  let result;

  if (diceType === 66) {
    return [getRandom(66, 11)];
  }

  if (keepUnits) {
    // this setting will reroll only tens and will keep units untouched
    const units = getRandom(10);
    result = rollsArr.map((_) => (getRandom(10) - 1) * 10 + units);
  } else {
    result = rollsArr.map((_) => getRandom(diceType));
  }

  if (sort) {
    return result.sort((a: number, b: number) => a - b);
  } else {
    return result;
  }
};
