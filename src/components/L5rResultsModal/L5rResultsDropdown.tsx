import React from "react";
import {
  EXPLOSIVE_SUCCESS,
  OPPORTUNITY,
  STRIFE,
  SUCCESS,
} from "../../consts/l5rSymbols";
import {
  ExplosiveSuccessImg,
  OpportunityImg,
  StrifeImg,
  SuccessImg,
} from "./L5rDropdownSymbols";
import { RING_DIE, SKILL_DIE } from "../../consts/diceConstants";
import { Dropdown } from "react-bootstrap";

function L5rResultsDropdown({
  index,
  result,
  wasAlreadyExploded,
  children,
  l5rAlterDie,
  l5rRollAdditionalDie,
  isModifyingAllowed,
  l5rSendState,
  type,
}: any) {
  const isExplosiveDie = result.includes(EXPLOSIVE_SUCCESS);
  const diceType = result.includes(RING_DIE) ? RING_DIE : SKILL_DIE;

  const handleRollAdditionalDie = () => {
    l5rRollAdditionalDie({ index, result, type });
  };

  const handleAlterDie = (setTo: string, from: string) => {
    l5rAlterDie({
      index,
      setTo: `${setTo}_${from}`,
    });
    l5rSendState();
  };

  const handleAlterRingDie = (setTo: string) => handleAlterDie(setTo, RING_DIE);

  const handleAlterSkillDie = (setTo: string) => handleAlterDie(setTo, SKILL_DIE);


  if ((!isExplosiveDie && !isModifyingAllowed) || wasAlreadyExploded) {
    return <>{children}</>;
  }

  return (
    <Dropdown className="dropdown-wrapper">
      <Dropdown.Toggle id="kept-die-dropdown">{children}</Dropdown.Toggle>
      {diceType === RING_DIE
          ? (
              <Dropdown.Menu>
                {isExplosiveDie && !isModifyingAllowed && (
                    <Dropdown.Item onClick={handleRollAdditionalDie}>
                      Roll additional die
                    </Dropdown.Item>
                )}
                {isModifyingAllowed && (
                    <Dropdown.Item
                        onClick={() => handleAlterRingDie(`${OPPORTUNITY}_${STRIFE}`)}
                    >
                      Set to {OpportunityImg} {StrifeImg}
                    </Dropdown.Item>
                )}
                {isModifyingAllowed && (
                    <Dropdown.Item onClick={() => handleAlterRingDie(`${OPPORTUNITY}`)}>
                      Set to {OpportunityImg}
                    </Dropdown.Item>
                )}
                {isModifyingAllowed && (
                    <Dropdown.Item onClick={() => handleAlterRingDie(`${SUCCESS}_${STRIFE}`)}>
                      Set to {SuccessImg} {StrifeImg}
                    </Dropdown.Item>
                )}
                {isModifyingAllowed && (
                    <Dropdown.Item onClick={() => handleAlterRingDie(`${SUCCESS}`)}>
                      Set to {SuccessImg}
                    </Dropdown.Item>
                )}
                {isModifyingAllowed && (
                    <Dropdown.Item
                        onClick={() => handleAlterRingDie(`${EXPLOSIVE_SUCCESS}_${STRIFE}`)}
                    >
                      Set to {ExplosiveSuccessImg} {StrifeImg}
                    </Dropdown.Item>
                )}
              </Dropdown.Menu>
          ) : (
              <Dropdown.Menu>
                {isExplosiveDie && !isModifyingAllowed && (
                    <Dropdown.Item onClick={handleRollAdditionalDie}>
                      Roll additional die
                    </Dropdown.Item>
                )}
                {isModifyingAllowed && (
                    <Dropdown.Item
                        onClick={() => handleAlterSkillDie(`${OPPORTUNITY}`)}
                    >
                      Set to {OpportunityImg}
                    </Dropdown.Item>
                )}
                {isModifyingAllowed && (
                    <Dropdown.Item onClick={() => handleAlterSkillDie(`${SUCCESS}_${STRIFE}`)}>
                      Set to {SuccessImg} {StrifeImg}
                    </Dropdown.Item>
                )}
                {isModifyingAllowed && (
                    <Dropdown.Item onClick={() => handleAlterSkillDie(`${SUCCESS}`)}>
                      Set to {SuccessImg}
                    </Dropdown.Item>
                )}
                {isModifyingAllowed && (
                    <Dropdown.Item onClick={() => handleAlterSkillDie(`${SUCCESS}_${OPPORTUNITY}`)}>
                      Set to {SuccessImg} {OpportunityImg}
                    </Dropdown.Item>
                )}
                {isModifyingAllowed && (
                    <Dropdown.Item
                        onClick={() => handleAlterSkillDie(`${EXPLOSIVE_SUCCESS}_${STRIFE}`)}
                    >
                      Set to {ExplosiveSuccessImg} {StrifeImg}
                    </Dropdown.Item>
                )}
                {isModifyingAllowed && (
                    <Dropdown.Item
                        onClick={() => handleAlterSkillDie(`${EXPLOSIVE_SUCCESS}`)}
                    >
                      Set to {ExplosiveSuccessImg}
                    </Dropdown.Item>
                )}
              </Dropdown.Menu>
          )}
    </Dropdown>
  );
}

export default L5rResultsDropdown;
