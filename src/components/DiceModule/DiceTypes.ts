export interface DiceModuleProps {
	rollOptions: any;
	submitRoll: Function;
};

export interface DicePropTypes {
	handleRollDice: Function;
	diceType: string;
	label: string;
	extraMark?: string;
	diceImg?: string | undefined;
	noDropdown?: boolean;
}

interface diceSetElement {
	diceType: string;
	label: string;
	extraMark?: string | undefined;
	diceImg?: string | undefined;
	isExcludedFromPool?: boolean;
	noDropdown?: boolean;
}

export type DiceSetType = Array<diceSetElement>;
