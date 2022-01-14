export type WarhammerSlTypes =
  | "warhammer2e"
  | "warhammer4e"
  | "fastSL"
  | "darkHeresy2e";

export interface WarhammerModalPropTypes {
  showModal: boolean;
  closeWarhammerModal: () => void;
  slType: WarhammerSlTypes;
  requestWarhammerRoll: (data: any) => void;
}

export interface WarhammerModalContainerPropTypes
  extends WarhammerModalPropTypes {
  saveSlType: (slType: string) => void;
}

export interface WarhammerFormValuesTypes {
  skillLevel: string;
  slType: WarhammerSlTypes;
}
