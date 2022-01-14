import InfoTooltip from "../InfoTooltip/InfoTooltip";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { EYE_SCORE, GANDALF_SCORE } from "../../consts/torDice";
import GandalfRune from "./GandalfRune";

export const FavouredTooltip = () => (
  <InfoTooltip
    content={
      <span>
        When a roll is <strong>Favoured</strong>, players roll two Feat Dice
        instead of one, keeping the best result.
      </span>
    }
  />
);

export const IllFavouredTooltip = () => (
  <InfoTooltip
    content={
      <span>
        When a roll is <strong>Ill-Favoured</strong>, players roll two Feat Dice
        instead of one, keeping the worst result.
      </span>
    }
  />
);

export const WearyTooltip = () => (
  <InfoTooltip
    content={
      <span>
        When a hero is <strong>Weary</strong>, all the Success Dice showing{" "}
        <strong>1</strong>, <strong>2</strong>, or <strong>3</strong> are
        considered as a result of <strong>0</strong> instead.
      </span>
    }
  />
);

export const MiserableTooltip = () => (
  <InfoTooltip
    content={
      <span>
        When a hero is <strong>Miserable</strong>, the roll is considered a
        Failure if a Feat Die shows the <FontAwesomeIcon icon={faEye} /> icon (
        <strong>{EYE_SCORE}</strong>), regardless of the total result obtained
        by the roll.
      </span>
    }
  />
);

export const AdversaryRollTooltip = () => (
  <InfoTooltip
    content={
      <span>
        When rolling for <strong>an Adversary</strong>, the{" "}
        <FontAwesomeIcon icon={faEye} /> icon (<strong>{EYE_SCORE}</strong>)
        becomes the highest result possible, while the{" "}
        <GandalfRune style={{ fill: "#fff" }} /> rune (
        <strong>{GANDALF_SCORE}</strong>) becomes the lowest result possible and
        is read&nbsp;as&nbsp;<strong>0</strong>.
      </span>
    }
  />
);
