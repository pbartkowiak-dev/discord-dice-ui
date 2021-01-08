export interface MoneyStateTypes {
	'MONEY_GOLD': string;
	'MONEY_SILVER': string;
	'MONEY_BRASS': string;
}

export type OperationsTypes = 'ADD' | 'SUBTRACT';

export interface WarhammerMoneyRecalculatedPayload {
	moneyState: MoneyStateTypes,
	moneyToAddState: MoneyStateTypes,
	newResultState: MoneyStateTypes,
	operationState: OperationsTypes
}

export interface WarhammerMoneyModalProps {
	showModal: boolean;
	closeModal: () => void;
	warhammerMoneyRecalculated: (payload: WarhammerMoneyRecalculatedPayload) => void;
}

export type MoneyType = 'MONEY_GOLD'
	| 'MONEY_SILVER'
	| 'MONEY_BRASS'
