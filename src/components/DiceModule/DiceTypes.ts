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
}

interface diceSetElement {
	diceType: string;
	label: string;
	extraMark?: string | undefined;
	diceImg?: string | undefined;
}

export type DiceSetType = Array<diceSetElement>;
