export interface I2d20SuccessLevel {
  isSuccess: boolean;
  isFailure: boolean;
  successLevel: number;
  complications: number;
  momentum: number;
}

export interface Get2d20SuccessLevelProps {
  results: Array<number>;
  tn: number;
  focus: number;
  difficulty: number;
  assistanceSuccessLevel?: number;
  untrainedTest: boolean;
  complicationRange?: number;
}

export const get2d20SuccessLevel = ({
  results,
  tn,
  focus,
  difficulty,
  untrainedTest,
  assistanceSuccessLevel,
  complicationRange,
}: Get2d20SuccessLevelProps): null | I2d20SuccessLevel => {
  const compilationMaxVal = 20;
  const focusNum = focus ? Number(focus) : 0;
  let compilationMinVal: number;
  let successLevel = 0;
  let complications = 0;

  if (!results) {
    return null;
  }

  if (complicationRange) {
    compilationMinVal = 21 - complicationRange;
  } else {
    compilationMinVal = untrainedTest ? 19 : 20;
  }

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
