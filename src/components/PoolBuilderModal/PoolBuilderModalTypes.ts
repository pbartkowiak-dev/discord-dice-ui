export interface PoolBuilderModalPropTypes {
  showModal: boolean;
  closePoolBuilderModal: () => void;
  submitRoll: (data: any) => void;
}

export interface PoolType {
  [key: string]: number;
}
