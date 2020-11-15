export interface DiceModuleProps {
	rollOptions: any;
	submitRoll: Function;
};

export interface DicePropTypes {
	handleRollDice: Function;
	diceType: string;
	label: string;
	extraMark?: string;
}

interface diceSetElement {
	diceType: string;
	label: string;
	extraMark?: string | undefined;
}

export type DiceSetType = Array<diceSetElement>;
