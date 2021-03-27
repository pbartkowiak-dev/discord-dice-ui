type WarhammerSlTypes =
	| 'fastSL'
	| 'darkHeresySL'
	| 'warhammer4eSL'
	| 'warhammer2eSL'

export interface WarhammerModalPropTypes {
	showModal: boolean,
	closeWarhammerModal: () => void;
	slType: WarhammerSlTypes;
	requestWarhammerRoll: (data: any) => void;
}

export interface WarhammerModalContainerPropTypes extends WarhammerModalPropTypes{
	saveslType: (slType: string) => void;
}


export interface WarhammerFormValuesTypes {
	skillLevel: string;
	slType: WarhammerSlTypes
}
