export interface WarhammerMoneyModalProps {
	showModal: boolean;
	closeModal: () => void;
}

export interface MoneyTypes {
	'MONEY_GOLD': string;
	'MONEY_SILVER': string;
	'MONEY_BRASS': string;
}

export type MoneyType = 'MONEY_GOLD'
	| 'MONEY_SILVER'
	| 'MONEY_BRASS'

export type OperationsTypes = 'ADD' | 'SUBTRACT';
