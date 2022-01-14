interface DiceSelectedType {
  diceAmount: number;
  diceType: string;
}

export interface ModifierModalPropTypes {
  closeModifierModal: () => void;
  requestRoll: (obj: {
    diceType: string;
    diceAmount: number;
    modifier: number;
  }) => void;
  diceSelected: DiceSelectedType;
  showModal: boolean;
}
