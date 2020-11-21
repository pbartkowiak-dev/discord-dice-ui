import { DiceSetType } from '../DiceModule/DiceTypes';

export interface PoolStateType {
	[diceType: string]: number;
}

export interface PoolBuilderPropTypes {
	handleSubmit: (poolState: PoolStateType, modifierState: string) => void;
	diceSet: DiceSetType;
	formName: string;
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
