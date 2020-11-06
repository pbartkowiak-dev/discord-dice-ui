type WarhammerSlTypes =
	| 'fastSL'
	| 'darkHeresySL'
	| 'warhammer4eSL'
	| 'warhammer2eSL'

export interface WarhammerModalPropTypes {
	showModal: boolean,
	closeWarhammerModal: () => void;
	warhammerSlMode: WarhammerSlTypes;
	requestRoll: (data: any) => void;
}

export interface WarhammerModalContainerPropTypes extends WarhammerModalPropTypes{
	saveWarhammerSlMode: (warhammerSlMode: string) => void;
}


export interface WarhammerFormValuesTypes {
	skillLevel: string;
	warhammerSlMode: WarhammerSlTypes
}
