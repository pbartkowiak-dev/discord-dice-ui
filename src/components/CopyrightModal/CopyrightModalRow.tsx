import React, { ReactNode } from "react";
import { Card } from "react-bootstrap";
import styles from "./CopyrightModal.module.css";

interface CopyrightModalRowPropTypes {
  title: string;
  content: string | ReactNode;
  link?: string;
  link2?: string;
}

function CopyrightModalRow({
  title,
  content,
  link,
  link2,
}: CopyrightModalRowPropTypes) {
  return (
    <Card className={styles.row}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
        {link && (
          <div>
            <Card.Link href={link}>{link}</Card.Link>
          </div>
        )}
        {link2 && (
          <div>
            <Card.Link href={link2}>{link2}</Card.Link>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default CopyrightModalRow;
