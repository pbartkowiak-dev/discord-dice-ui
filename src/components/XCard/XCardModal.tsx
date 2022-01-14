import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useXCardStore, { State } from "./store";
import Form from "react-bootstrap/Form";
import styles from "./styles.module.css";

export default () => {
  const xCardStore = useXCardStore((xCardStore: State) => xCardStore);
  const { isModalOpen, closeModal, isAnonymous, setIsAnonymous, throwXCard } =
    xCardStore;

  const onSubmit = () => {
    throwXCard();
    closeModal();
  };

  return (
    <Modal show={isModalOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>X-Card Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section>
          <p>
            If during the games happens anything that's bothering you, please
            let the group know by submitting the X-Card. You can use this Safety
            Tool to let others know you want to skip this scene.
          </p>
          <p>You don't have to give any reason for doing so.</p>
          <p>
            For more details on X-Card, please ask your GM or refer to{" "}
            <a href="http://tinyurl.com/x-card-rpg">
              http://tinyurl.com/x-card-rpg
            </a>
            .
          </p>
        </section>
        <section className={styles.imgContainer}>
          <img src={require("../../img/x_card.png")} alt="X-Card" />
        </section>
        <section>
          <Form.Check
            type="checkbox"
            name="isAnonymous"
            id="isAnonymous"
            label="Throw the X-Card Anonymously"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
            custom
          />
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="success" type="submit" onClick={onSubmit}>
          Throw the X-Card
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
