import { DiceSetType } from "../DiceModule/DiceTypes";

export interface PoolStateType {
  [diceType: string]: number;
}

interface SubmitRollType {
  diceType: string;
  diceAmount: number;
}

export interface PoolBuilderPropTypes {
  handleSubmit: (poolState: PoolStateType, modifierState: string) => void;
  diceSet: DiceSetType;
  formName: string;
  isDiceImgLarge: boolean;
  maxDicePool?: number;
  submitRoll: (data: SubmitRollType) => void;
}

export type allResultsType = Array<string>;

export interface ResultsDerivedType {
  success: number;
  threat: number;
  failure: number;
  advantage: number;
  triumph: number;
  despair: number;
  dark: number;
  light: number;
}
