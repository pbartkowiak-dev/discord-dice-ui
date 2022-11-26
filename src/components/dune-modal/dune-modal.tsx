// @ts-nocheck
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { D20_DUNE_TEST } from "../../consts/diceConstants";
import { ConanFormValuesTypes, DuneModalPropTypes } from "./DuneModalTypes";
import { formValueSelector, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Form2d20 } from "../2d20/form-2d20/form-2d20";
import { validate } from "../2d20/form-2d20/form-utils";
import { DUNE_MAX_FOCUS } from '../2d20/form-2d20/const';

const form = "DuneModalForm";

const FormElement = reduxForm({
  form,
  validate,
})(Form2d20);

const selector = formValueSelector(form);

const DuneModalForm = connect((state) => ({
  formValues: selector(
    state,
    "difficulty",
    "complicationRange",
    "focus",
    "tn",
    "dice",
    "fortune"
  ),
}))(FormElement);

function DuneModal({
  closeDuneModal,
  showModal,
  requestRoll,
}: DuneModalPropTypes) {
  const handleSubmit = (values: ConanFormValuesTypes) => {
    const {
      dice,
      difficulty,
      focus = "0",
      fortune,
      tn,
      complicationRange,
    } = values;

    const focusValue = focus.trim() === "" ? 0 : Number(focus);

    requestRoll({
      diceType: D20_DUNE_TEST,
      diceAmount: Number(dice),
      difficulty: Number(difficulty),
      focus: focusValue,
      fortune: Number(fortune),
      tn: Number(tn),
      complicationRange: Number(complicationRange),
    });

    closeDuneModal();
  };

  const initialValues = {
    dice: "2",
    fortune: "0",
    difficulty: "2",
    complicationRange: "1",
  };

  return (
    <Modal show={showModal} onHide={closeDuneModal}>
      <Modal.Header closeButton>
        <Modal.Title>Dune Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DuneModalForm
          formId={form}
          showComplicationRange={true}
          showUntrainedTest={false}
          showAssistance={false}
          fortuneHeader="Determination"
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
          maxFocus={DUNE_MAX_FOCUS}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeDuneModal}>
          Cancel
        </Button>
        <Button variant="success" type="submit" form={form}>
          Roll!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DuneModal;
