// @ts-nocheck
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import WarhammerModalForm from "./WarhammerModalForm";
import {
  WarhammerModalPropTypes,
  WarhammerFormValuesTypes,
} from "./WarhammerModalTypes";

function WarhammerModal({
  showModal,
  closeWarhammerModal,
  slType,
  requestWarhammerRoll,
}: WarhammerModalPropTypes) {
  const initialValues = {
    slType,
  };

  const handleSubmit = (values: WarhammerFormValuesTypes) => {
    requestWarhammerRoll({
      ...values,
      skillLevel: Number(values.skillLevel),
    });
    closeWarhammerModal();
  };

  const formId = "warhammer-mode-form";

  return (
    <Modal show={showModal} onHide={closeWarhammerModal}>
      <Modal.Header closeButton>
        <Modal.Title>Warhammer Roll Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <WarhammerModalForm
          onSubmit={(values) => handleSubmit(values)}
          initialValues={initialValues}
          formId={formId}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeWarhammerModal}>
          Cancel
        </Button>
        <Button variant="success" type="submit" form={formId}>
          Roll!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WarhammerModal;
