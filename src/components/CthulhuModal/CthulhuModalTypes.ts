export interface CthulhuModalPropTypes {
	showModal: boolean;
	closeCthulhuModal: () => void;
	requestCthulhuRoll: (data: any) => void;
}

export interface CthulhuFormValuesTypes {
	cthulhuTwoBonus?: boolean;
	cthulhuTwoPenalty?: boolean;
	skillLevel: string;
}
