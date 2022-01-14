export type conanSuccessLevelType = {
  isSuccess: boolean;
  isFailure: boolean;
  successLevel: number;
  complications: number;
  momentum: number;
};

interface getConanSuccessLevelPropTypes {
  results: Array<number>;
  tn: number;
  focus: number;
  difficulty: number;
  assistanceSuccessLevel?: number;
  untrainedTest: boolean;
}

export default ({
  results,
  tn,
  focus,
  difficulty,
  untrainedTest,
  assistanceSuccessLevel,
}: getConanSuccessLevelPropTypes) => {
  const compilationMinVal = untrainedTest ? 19 : 20;
  const compilationMaxVal = 20;
  const focusNum = focus ? Number(focus) : 0;
  let successLevel = 0;
  let complications = 0;

  results.forEach((result) => {
    if (result <= tn) {
      if (result <= focusNum) {
        successLevel += 2;
      } else if (result > focusNum) {
        successLevel += 1;
      }
    }
    if (result >= compilationMinVal && result <= compilationMaxVal) {
      complications += 1;
    }
  });

  if (successLevel > 0 && assistanceSuccessLevel) {
    successLevel = successLevel + assistanceSuccessLevel;
  }

  return {
    isSuccess: successLevel >= difficulty,
    isFailure: successLevel < difficulty,
    successLevel,
    complications,
    momentum: successLevel > difficulty ? successLevel - difficulty : 0,
  };
};
