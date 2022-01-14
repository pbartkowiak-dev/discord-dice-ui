import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Placement } from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames";
import styles from "./info-tooltip.module.css";
import getRandom from "../../utils/getRandom";

type infoTooltipPropType = {
  content: any;
  type?: string;
  placement?: Placement;
  className?: string;
  containerClassName?: string;
};

function InfoTooltip({
  content,
  type,
  placement = "top",
  className = "",
  containerClassName = "",
}: infoTooltipPropType) {
  const id = `tooltip-${getRandom(999)}`;
  let icon;

  switch (type) {
    default:
      icon = faQuestionCircle;
  }

  return (
    <OverlayTrigger
      key={id}
      placement={placement}
      delay={100}
      overlay={
        <Tooltip id={id} className={containerClassName}>
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
