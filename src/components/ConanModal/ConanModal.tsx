// @ts-nocheck
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { D20_CONAN_TEST } from "../../consts/diceConstants";
import { ConanFormValuesTypes, ConanModalPropTypes } from "./ConanModalTypes";
import { formValueSelector, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Form2d20 } from "../2d20/form-2d20/form-2d20";
import { validate } from "../2d20/form-2d20/form-utils";

const form = "ConanModalForm";

const FormElement = reduxForm({
  form,
  validate,
})(Form2d20);

const selector = formValueSelector(form);

const ConanModalForm = connect((state) => ({
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

function ConanModal({
  closeConanModal,
  showModal,
  requestRoll,
}: ConanModalPropTypes) {
  const handleSubmit = (values: ConanFormValuesTypes) => {
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
      diceType: D20_CONAN_TEST,
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

    closeConanModal();
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
    <Modal show={showModal} onHide={closeConanModal}>
      <Modal.Header closeButton>
        <Modal.Title>Conan Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ConanModalForm
          formId={form}
          showUntrainedTest={true}
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeConanModal}>
          Cancel
        </Button>
        <Button variant="success" type="submit" form={form}>
          Roll!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConanModal;
