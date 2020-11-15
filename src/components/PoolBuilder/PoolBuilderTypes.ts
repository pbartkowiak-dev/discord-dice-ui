import { DiceSetType } from '../DiceModule/DiceTypes';

export interface PoolStateType {
	[diceType: string]: number;
}

export interface PoolBuilderPropTypes {
	handleSubmit: (poolState: PoolStateType, modifierState: string) => void;
	diceSet: DiceSetType;
	formName: string;
}
