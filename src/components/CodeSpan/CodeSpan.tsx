import React, { ReactElement } from "react";
import classNames from "classnames";
import styles from "./CodeSpan.module.css";

const FAILURE = "failure";
const SUCCESS = "success";
const INACTIVE = "inactive";
const COMPLICATION = "complication";

interface Props {
  className?: string;
  type?: string;
  children: string | number | ReactElement;
}

export default function CodeSpan({ className = "", type, children }: Props) {
  const fullClassName = classNames({
    [styles.codeSpan]: true,
    [className]: !!className,
    [styles.failure]: type === FAILURE,
    [styles.success]: type === SUCCESS,
    [styles.complication]: type === COMPLICATION,
    [styles.inactive]: type === INACTIVE,
  });
  return <span className={fullClassName}>{children}</span>;
}
