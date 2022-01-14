import { successLevelsType } from "./getSuccessLevels";

export default (successLevels: successLevelsType): string => {
  if (successLevels.isCriticalSuccess) {
    return "CRITICAL SUCCESS";
  } else if (successLevels.isExtremeSuccess) {
    return "EXTREME SUCCESS";
  } else if (successLevels.isHardSuccess) {
    return "HARD SUCCESS";
  } else if (successLevels.isRegularSuccess) {
    return "SUCCESS";
  } else if (successLevels.isFumble) {
    return "FUMBLE";
  } else if (successLevels.isRegularFailure) {
    return "FAILURE";
  }
  return "";
};
