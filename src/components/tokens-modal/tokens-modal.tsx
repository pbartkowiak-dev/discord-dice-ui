import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./tokens-modal.module.css";
import PoolBuilderDie from "../PoolBuilder/PoolBuilderDie";

type TokenType = "TOKEN_ONE" | "TOKEN_TWO" | "TOKEN_THREE";

interface Token {
  name: string;
  min: number;
  max: number;
  img: string;
  initialValue?: string;
}

export interface TokensState {
  tokenOneState: string;
  tokenTwoState: string;
  tokenThreeState: string;
}

interface Props {
  handleUpdateTokens: (tokensState: TokensState) => void;
  showModal: boolean;
  hideMsg: () => void;
  tokenOne: Token;
  tokenTwo: Token;
  tokenThree?: Token;
}

export const TokensModal = ({
  handleUpdateTokens,
  showModal,
  hideMsg,
  tokenOne,
  tokenTwo,
  tokenThree,
}: Props) => {
  const [tokenOneState, setTokenOneState] = useState("0");
  const [tokenTwoState, setTokenTwoState] = useState("0");
  const [tokenThreeState, setTokenThreeState] = useState("0");

  const onIncrease = (tokenType: TokenType) => {
    if (tokenType === "TOKEN_ONE") {
      const newVal = Number(tokenOneState) + 1;
      setTokenOneState(`${newVal}`);
    }
    if (tokenType === "TOKEN_TWO") {
      const newVal = Number(tokenTwoState) + 1;
      setTokenTwoState(`${newVal}`);
    }
    if (tokenType === "TOKEN_THREE") {
      const newVal = Number(tokenTwoState) + 1;
      setTokenThreeState(`${newVal}`);
    }
  };

  const onDecrease = (tokenType: TokenType) => {
    if (tokenType === "TOKEN_ONE") {
      const newVal = Number(tokenOneState) - 1;
      if (newVal >= 0) setTokenOneState(`${newVal}`);
    }
    if (tokenType === "TOKEN_TWO") {
      const newVal = Number(tokenTwoState) - 1;
      if (newVal >= 0) setTokenTwoState(`${newVal}`);
    }
    if (tokenType === "TOKEN_THREE") {
      const newVal = Number(tokenThreeState) - 1;
      if (newVal >= 0) setTokenThreeState(`${newVal}`);
    }
  };

  const onChange = (tokenType: TokenType, event: any) => {
    const { value } = event.target;

    if (
      tokenType === "TOKEN_ONE" &&
      isValueValid(value, tokenOne.min, tokenOne.max)
    ) {
      setTokenOneState(value);
    }
    if (
      tokenType === "TOKEN_TWO" &&
      isValueValid(value, tokenTwo.min, tokenTwo.max)
    ) {
      setTokenTwoState(value);
    }
    if (
      tokenType === "TOKEN_THREE" &&
      isValueValid(value, tokenThree!.min, tokenThree!.max)
    ) {
      setTokenTwoState(value);
    }
  };

  const isValueValid = (val: string, minAmount: number, maxAmount: number) => {
    const num = Number(val);

    return !isNaN(num) && num >= minAmount && num <= maxAmount;
  };

  useEffect(() => {
    if (tokenOne.initialValue) {
      setTokenOneState(tokenOne.initialValue);
    }
    if (tokenTwo.initialValue) {
      setTokenTwoState(tokenTwo.initialValue);
    }
    if (tokenThree?.initialValue) {
      setTokenTwoState(tokenThree?.initialValue);
    }
  }, [tokenOne, tokenTwo, tokenThree, showModal]);

  return (
    <Modal show={showModal} onHide={hideMsg}>
      <Modal.Header closeButton>
        <Modal.Title>Update pools</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.container}>
          <PoolBuilderDie
            title={tokenOne.name}
            diceType="TOKEN_ONE"
            diceImg={tokenOne.img}
            value={tokenOneState}
            onChange={onChange}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            isDiceImgLarge={true}
          />
          <PoolBuilderDie
            title={tokenTwo.name}
            diceType="TOKEN_TWO"
            diceImg={tokenTwo.img}
            value={tokenTwoState}
            onChange={onChange}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            isDiceImgLarge={true}
          />
          {!!tokenThree && (
            <PoolBuilderDie
              title={tokenThree.name}
              diceType="TOKEN_THREE"
              diceImg={tokenThree.img}
              value={tokenThreeState}
              onChange={onChange}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              isDiceImgLarge={true}
            />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideMsg}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={() =>
            handleUpdateTokens({
              tokenOneState,
              tokenTwoState,
              tokenThreeState,
            })
          }
          type="submit"
        >
          Update pools
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
