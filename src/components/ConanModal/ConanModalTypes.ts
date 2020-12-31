export interface ConanModalPropTypes {
	closeConanModal: () => void;
	showModal: boolean;
	requestRoll: (data: any) => void;
}

export interface ConanFormValuesTypes {
	dice: string;
	difficulty: string;
	focus: string;
	fortune: string;
	tn: string;
	untrainedTest: boolean
}
