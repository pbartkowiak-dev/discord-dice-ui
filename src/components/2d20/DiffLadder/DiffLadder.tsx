import React from "react";
import { Field } from "redux-form";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import styles from "./difficulty-ladder.module.css";

function DiffLadder({ input }: any) {
  const { value } = input;
  const cx = classNames.bind(styles);

  return (
    <Table className={styles.table} bordered>
      <tbody>
        <tr>
          <td className={styles.td}>
            <label
              className={cx({
                simple: true,
                label: true,
                active: value === "0",
              })}
            >
              <Field
                className={styles.input}
                id="difficulty"
                name="difficulty"
                value="0"
                component="input"
                type="radio"
              />
              <span>Simple (D0)</span>
            </label>
          </td>
        </tr>
        <tr>
          <td className={styles.td}>
            <label
              className={cx({
                average: true,
                label: true,
                active: value === "1",
              })}
            >
              <Field
                className={styles.input}
                id="difficulty"
                name="difficulty"
                value="1"
                component="input"
                type="radio"
              />
              <span>Average (D1)</span>
            </label>
          </td>
        </tr>
        <tr>
          <td className={styles.td}>
            <label
              className={cx({
                challenging: true,
                label: true,
                active: value === "2",
              })}
            >
              <Field
                className={styles.input}
                id="difficulty"
                name="difficulty"
                value="2"
                component="input"
                type="radio"
              />
              <span>Challenging (D2)</span>
            </label>
          </td>
        </tr>
        <tr>
          <td className={styles.td}>
            <label
              className={cx({
                daunting: true,
                label: true,
                active: value === "3",
              })}
            >
              <Field
                className={styles.input}
                id="difficulty"
                name="difficulty"
                value="3"
                component="input"
                type="radio"
              />
              <span>Daunting (D3)</span>
            </label>
          </td>
        </tr>
        <tr>
          <td className={styles.td}>
            <label
              className={cx({
                dire: true,
                label: true,
                active: value === "4",
              })}
            >
              <Field
                className={styles.input}
                id="difficulty"
                name="difficulty"
                value="4"
                component="input"
                type="radio"
              />
              <span>Dire (D4)</span>
            </label>
          </td>
        </tr>
        <tr>
          <td className={styles.td}>
            <label
              className={cx({
                epic: true,
                label: true,
                active: value === "5",
              })}
            >
              <Field
                className={styles.input}
                id="difficulty"
                name="difficulty"
                value="5"
                component="input"
                type="radio"
              />
              <span>Epic (D5)</span>
            </label>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default DiffLadder;
