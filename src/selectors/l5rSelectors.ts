import {
  SUCCESS,
  EXPLOSIVE_SUCCESS,
  STRIFE,
  OPPORTUNITY,
} from "../consts/l5rSymbols";

export const getResultsDerivedSelector = (state: any) => {
  const { l5rData } = state;
  const { resultsKept } = l5rData;
  const additionalDiceKept = getAdditionalDiceKeptSelector(state);

  const resultsDerived = {
    success: 0,
    opportunity: 0,
    strife: 0,
  };

  const resultsCounter = (element: string) => {
    if (element.includes(SUCCESS) || element.includes(EXPLOSIVE_SUCCESS)) {
      resultsDerived.success += 1;
    }
    if (element.includes(OPPORTUNITY)) {
      resultsDerived.opportunity += 1;
    }
    if (element.includes(STRIFE)) {
      resultsDerived.strife += 1;
    }
  };

  resultsKept.forEach(resultsCounter);
  additionalDiceKept.forEach(resultsCounter);

  return resultsDerived;
};

export const getAdditionalDiceKeptSelector = (state: any) => {
  const { l5rData } = state;
  const { additionalDiceRolled, additionalDiceIndexesKept } = l5rData;

  return additionalDiceRolled.filter((_: string, i: number) => {
    return additionalDiceIndexesKept.includes(i);
  });
};
