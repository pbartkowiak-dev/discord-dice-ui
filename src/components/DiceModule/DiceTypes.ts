export interface DiceModuleProps {
	rollOptions: any;
	submitRoll: Function;
};

export interface DicePropTypes {
	handleRollDice: Function;
	diceType: string;
	label: string;
	imageFilename: string;
	extraMark?: string;
}

interface diceSetElement {
	diceType: string;
	label: string;
	imageFilename: string;
	extraMark?: string | undefined;
}

export type diceSet = Array<diceSetElement>

export type SetTypes = 'coc' | 'warhammer' | 'conan' | 'classic' | 'POOL';

