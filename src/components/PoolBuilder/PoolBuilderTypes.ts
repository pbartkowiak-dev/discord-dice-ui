import { DiceSetType } from '../DiceModule/DiceTypes';

export interface PoolStateType {
	[diceType: string]: number;
}

export interface PoolBuilderPropTypes {
	handleSubmit: (event: React.FormEvent<HTMLFormElement>, poolState: PoolStateType, modifierState: string) => void;
	diceSet: DiceSetType;
	formName: string;
}
