// @ts-nocheck
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { D20_INFINITY_TEST } from "../../consts/diceConstants";
import {
  InfinityFormValuesTypes,
  InfinityModalPropTypes,
} from "./InfinityModalTypes";
import { formValueSelector, reduxForm } from "redux-form";
import { validate } from "../2d20/form-2d20/form-utils";
import { connect } from "react-redux";
import { Form2d20 } from "../2d20/form-2d20/form-2d20";

const form = "InfinityModalForm";

const FormElement = reduxForm({
  form,
  validate,
})(Form2d20);

const selector = formValueSelector(form);

const InfinityModalForm = connect((state) => ({
  formValues: selector(
    state,
    "difficulty",
    "untrainedTest",
    "focus",
    "tn",
    "dice",
    "fortune",
    "assistanceDice",
    "assistanceFocus",
    "assistanceTn"
  ),
}))(FormElement);

function InfinityModal({
  closeInfinityModal,
  showModal,
  requestRoll,
}: InfinityModalPropTypes) {
  const handleSubmit = (values: InfinityFormValuesTypes) => {
    const {
      assistanceDice,
      dice,
      difficulty,
      focus = "0",
      fortune,
      tn,
      untrainedTest,
      assistanceFocus = "0",
      assistanceTn,
    } = values;

    const focusValue = focus.trim() === "" ? 0 : Number(focus);
    const assistanceFocusValue =
      assistanceFocus.trim() === "" ? focusValue : Number(assistanceFocus);

    requestRoll({
      diceType: D20_INFINITY_TEST,
      assistanceDice: Number(assistanceDice),
      diceAmount: Number(dice),
      difficulty: Number(difficulty),
      focus: focusValue,
      fortune: Number(fortune),
      tn: Number(tn),
      assistanceFocus: assistanceFocusValue,
      assistanceTn:
        assistanceTn.trim() === "" ? Number(tn) : Number(assistanceTn),
      untrainedTest,
      assistanceUntrainedTest:
        assistanceFocus && assistanceFocus.trim() === "0",
    });

    closeInfinityModal();
  };

  const initialValues = {
    dice: "2",
    assistanceDice: "0",
    fortune: "0",
    difficulty: "2",
    assistanceFocus: "",
    assistanceTn: "",
    untrainedTest: false,
  };

  return (
    <Modal show={showModal} onHide={closeInfinityModal}>
      <Modal.Header closeButton>
        <Modal.Title>Infinity Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InfinityModalForm
          formId={form}
          showUntrainedTest={true}
          showComplicationRange={false}
          showAssistance={true}
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeInfinityModal}>
          Cancel
        </Button>
        <Button variant="success" type="submit" form={form}>
          Roll!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InfinityModal;
