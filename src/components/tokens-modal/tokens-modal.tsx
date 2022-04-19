import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./tokens-modal.module.css";
import PoolBuilderDie from "../PoolBuilder/PoolBuilderDie";

type TokenType = "TOKEN_ONE" | "TOKEN_TWO";

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
}

interface Props {
  handleUpdateTokens: (tokensState: TokensState) => void;
  showModal: boolean;
  hideMsg: () => void;
  tokenOne: Token;
  tokenTwo: Token;
}

export const TokensModal = ({
  handleUpdateTokens,
  showModal,
  hideMsg,
  tokenOne,
  tokenTwo,
}: Props) => {
  const [tokenOneState, setTokenOneState] = useState("0");
  const [tokenTwoState, setTokenTwoState] = useState("0");

  const onIncrease = (tokenType: TokenType) => {
    if (tokenType === "TOKEN_ONE") {
      const newVal = Number(tokenOneState) + 1;
      if (isValueValid(newVal, tokenOne.min, tokenOne.max)) {
        setTokenOneState(`${newVal}`);
      }
    }
    if (tokenType === "TOKEN_TWO") {
      const newVal = Number(tokenTwoState) + 1;
      if (isValueValid(newVal, tokenTwo.min, tokenTwo.max)) {
        setTokenTwoState(`${newVal}`);
      }
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
  };

  const onChange = (
    tokenType: TokenType,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
  };

  const isValueValid = (
    val: string | number,
    minAmount: number,
    maxAmount: number
  ) => {
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
  }, [tokenOne, tokenTwo, showModal]);

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
