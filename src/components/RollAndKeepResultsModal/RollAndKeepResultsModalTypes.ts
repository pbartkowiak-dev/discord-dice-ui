export interface InitialStateType {
	showModal: boolean;

	results: Array<string>;
	resultsKept: Array<string>;
	resultsKeptIndexesAltered: Array<number>;
	resultsKeptIndexesExploded: Array<number>;

	additionalDiceRolled: Array<string>;
	additionalDiceIndexesKept: Array<number>;
	additionalDiceIndexesDropped: Array<number>;
	additionalDiceIndexesExploded: Array<number>;
}

type selectedDiceState = Array<number>;

interface ResultsDerivedType {
	success: number;
	opportunity: number;
	strife: number;
}

export interface L5rResultsModalContainerPropTypes {
	hideMsg: () => void;
	l5rData: InitialStateType;
	rerollCount: number;
	requestL5rReroll: (selectedDiceState: selectedDiceState) => void;
	l5rKeepDice: (selectedDiceState: selectedDiceState) => void;
	l5rClearData: () => void;
	l5rSendState: () => void;
	resultsDerived: ResultsDerivedType;
}

export interface L5rResultsModalPropTypes {
	hideMsg: () => void;
	rerollCount: number
	l5rKeepDice: (selectedDiceState: selectedDiceState) => void;
	requestL5rReroll: (selectedDiceState: selectedDiceState) => void;
	l5rClearData: () => void;
	l5rSendState: () => void;

	showModal: boolean;
	results: Array<string>;
	resultsKept: Array<string>;
	resultsKeptIndexesAltered: Array<number>;
	resultsKeptIndexesExploded: Array<number>;
	resultsDerived: ResultsDerivedType,

	additionalDiceRolled: Array<string>;
	additionalDiceIndexesKept: Array<number>;
	additionalDiceIndexesDropped: Array<number>;
	additionalDiceIndexesExploded: Array<number>;
}
