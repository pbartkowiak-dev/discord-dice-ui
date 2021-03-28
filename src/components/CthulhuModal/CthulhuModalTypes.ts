export interface CthulhuModalPropTypes {
	showModal: boolean;
	closeCthulhuModal: () => void;
	requestCthulhuRoll: (data: any) => void;
}

export interface CthulhuFormValuesTypes {
	cocTwoBonus?: boolean;
	cocTwoPenalty?: boolean;
	skillLevel: string;
}
