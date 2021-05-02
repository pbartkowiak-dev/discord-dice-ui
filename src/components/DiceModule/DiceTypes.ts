export interface DiceModuleProps {
	submitRoll: Function;
}

export interface DicePropTypes {
	handleRollDice: Function;
	diceType: string;
	label: string;
	diceImg?: string | undefined;
	noDropdown?: boolean;
}

interface diceSetElement {
	diceType: string;
	label: string;
	diceImg?: string | undefined;
	isExcludedFromPool?: boolean;
	noDropdown?: boolean;
}

export type DiceSetType = Array<diceSetElement>;
