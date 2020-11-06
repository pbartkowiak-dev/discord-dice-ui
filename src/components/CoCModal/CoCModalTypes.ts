export interface CoCModalPropTypes {
	showModal: boolean;
	closeCoCModal: () => void;
	requestRoll: (data: any) => void;
}

export interface CoCFormValuesTypes {
	cocTwoBonus?: boolean;
	cocTwoPenalty?: boolean;
	skillLevel: string;
}
