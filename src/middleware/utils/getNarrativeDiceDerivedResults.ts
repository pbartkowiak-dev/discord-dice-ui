import {
  allResultsType,
  ResultsDerivedType,
} from "../../components/PoolBuilder/PoolBuilderTypes";

export default (allResults: allResultsType): ResultsDerivedType => {
  const resultsDerived = {
    success: 0,
    threat: 0,
    failure: 0,
    advantage: 0,
    triumph: 0,
    despair: 0,
    dark: 0,
    light: 0,
  };
  allResults.forEach((result) => {
    switch (result) {
      case "success":
        resultsDerived.success += 1;
        resultsDerived.failure -= 1;
        break;
      case "threat":
        resultsDerived.threat += 1;
        resultsDerived.advantage -= 1;
        break;
      case "failure":
        resultsDerived.success -= 1;
        resultsDerived.failure += 1;
        break;
      case "advantage":
        resultsDerived.threat -= 1;
        resultsDerived.advantage += 1;
        break;
      case "triumph":
        resultsDerived.triumph += 1;
        break;
      case "despair":
        resultsDerived.despair += 1;
        break;
      case "dark":
        resultsDerived.dark += 1;
        break;
      case "light":
        resultsDerived.light += 1;
        break;
    }
  });

  Object.keys(resultsDerived).forEach((key: string) => {
    // @ts-ignore
    if ((resultsDerived[key] as number) < 0) {
      // @ts-ignore
      resultsDerived[key] = 0;
    }
  });

  return resultsDerived;
};
