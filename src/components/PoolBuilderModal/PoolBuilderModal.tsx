import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { PoolBuilderModalPropTypes, PoolType } from "./PoolBuilderModalTypes";
import PoolBuilderContainer from "../PoolBuilder/PoolBuilderContainer";

function PoolBuilderModal({
  showModal,
  closePoolBuilderModal,
  submitRoll,
}: PoolBuilderModalPropTypes) {
  const handleSubmit = (pool: PoolType, modifier: number) => {
    submitRoll({
      pool,
      modifier,
    });
    closePoolBuilderModal();
  };

  const formName = "pool-builder-form";

  return (
    <Modal show={showModal} onHide={closePoolBuilderModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Pool Builder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PoolBuilderContainer handleSubmit={handleSubmit} formName={formName} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closePoolBuilderModal}>
          Cancel
        </Button>
        <Button variant="success" type="submit" form={formName}>
          Roll!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PoolBuilderModal;
