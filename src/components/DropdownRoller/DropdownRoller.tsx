import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { commonDice } from "../../consts/diceSets";
import { useDispatch } from "react-redux";
import { submitRoll } from "../../actions/roll.actions";
import { openWarhammerModal } from "../../actions/warhammer.actions";
import styles from "./DropdownRoller.module.css";
import useDiceModuleFormStore from "../DiceModuleOptions/store";

interface DropdownRoller {
  onToggle: (isOpen: boolean) => void;
}

function DropdownRoller({ onToggle }: DropdownRoller) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { mode } = useDiceModuleFormStore((state) => state);
  const diceRolls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const dropdownRef = useRef(null);

  const closeDropdown = () => {
    setShow(false);
    onToggle(false);
  };

  const handleRollDice = (diceType: string, diceAmount: number = 1) => {
    closeDropdown();
    dispatch(submitRoll({ diceType, diceAmount }));
  };

  const handleWarhammerRoll = () => {
    closeDropdown();
    dispatch(openWarhammerModal());
  };

  const handleOutsideClick = (event: Event) => {
    // @ts-ignore
    if (!dropdownRef.current?.contains(event.target) && show) {
      closeDropdown();
    }
  };

  const toggle = () => {
    onToggle(!show);
    setShow(!show);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  return (
    <Dropdown drop="up" show={show}>
      <Dropdown.Toggle
        variant="outline-primary"
        id="dropdown-roller"
        onClick={toggle}
      >
        <span>Roll the Dice</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <div ref={dropdownRef}>
          {mode === "warhammerMode" && (
            <>
              <Dropdown.Item
                className={styles.dropdownItem}
                as="div"
                onClick={handleWarhammerRoll}
              >
                <span>
                  <img
                    src={require(`../../img/d100-skill-test.png`)}
                    className={styles.dieImg}
                    alt="Skill Test"
                  />
                  <strong>Skill Test</strong>
                </span>
              </Dropdown.Item>
              <Dropdown.Divider />
            </>
          )}
          {commonDice.map(({ diceType, label }) => (
            <Dropdown.Item
              key={diceType}
              className={styles.dropdownItem}
              as="div"
            >
              <Dropdown drop="right">
                <Dropdown.Toggle as="div" id="dropdown-roller-second-level">
                  <span>
                    <img
                      src={require(`../../img/${diceType}.png`)}
                      className={styles.dieImg}
                      alt={diceType}
                    />
                    <strong>{label}</strong>
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div>
                    {" "}
                    {diceRolls.map((diceAmount) => (
                      <div key={diceAmount}>
                        <Dropdown.Item
                          href="#"
                          onClick={() => handleRollDice(diceType, diceAmount)}
                        >
                          <span>
                            <img
                              src={require(`../../img/${diceType}.png`)}
                              className={styles.dieImgSecond}
                              alt={diceType}
                            />
                            Roll{" "}
                            <strong>
                              {diceAmount > 1 ? diceAmount : ""}
                              {label}
                            </strong>
                          </span>
                        </Dropdown.Item>
                        {diceAmount === 1 && <Dropdown.Divider />}
                      </div>
                    ))}{" "}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
          ))}{" "}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownRoller;
