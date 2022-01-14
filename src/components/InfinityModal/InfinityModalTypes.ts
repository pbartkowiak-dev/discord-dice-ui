export interface InfinityModalPropTypes {
  closeInfinityModal: () => void;
  showModal: boolean;
  requestRoll: (data: any) => void;
}

export interface InfinityFormValuesTypes {
  assistanceDice: string;
  dice: string;
  difficulty: string;
  focus: string;
  fortune: string;
  tn: string;
  assistanceFocus: string;
  assistanceTn: string;
  untrainedTest: boolean;
  assistanceUntrainedTest: boolean;
}
