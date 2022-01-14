import React, { FC } from "react";
import styles from "../WrathAndGloryPoolBuilder/WrathAndGloryResultsModal.module.css";
import Spinner from "react-bootstrap/Spinner";

const RerollOverlay: FC = () => {
  return (
    <div className={styles.rerollOverlay}>
      <div className={styles.rerollBackground} />
      <Spinner
        animation="border"
        role="status"
        variant="primary"
        className={styles.rerollSpinner}
      >
        <span className="sr-only">Rerolling...</span>
      </Spinner>
    </div>
  );
};

export default RerollOverlay;
