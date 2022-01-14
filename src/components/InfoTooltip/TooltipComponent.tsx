import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames";
import styles from "./info-tooltip.module.css";
import getRandom from "../../utils/getRandom";

type infoTooltipPropType = {
  content: string;
  type?: string;
  className?: string;
};

function InfoTooltip({ content, type, className = "" }: infoTooltipPropType) {
  const id = `tooltip-${getRandom(999)}`;
  let icon;

  switch (type) {
    default:
      icon = faQuestionCircle;
  }

  return (
    <OverlayTrigger
      key={id}
      placement="top"
      delay={100}
      overlay={
        <Tooltip id={id}>
          <>{content}</>
        </Tooltip>
      }
    >
      <FontAwesomeIcon
        className={classNames({
          [styles.icon]: true,
          [className]: !!className,
        })}
        icon={icon}
      />
    </OverlayTrigger>
  );
}

export default InfoTooltip;
