import React from "react";
import { Dropdown } from "react-bootstrap";

function L5rResultsDropdown({
  index,
  l5rKeepAdditionalDie,
  l5rSendState,
  children,
}: any) {
  const handleKeepIt = () => {
    l5rKeepAdditionalDie({
      decision: true,
      index,
    });
    l5rSendState();
  };

  const handleDropIt = () => {
    l5rKeepAdditionalDie({
      decision: false,
      index,
    });
  };

  return (
    <Dropdown className="dropdown-wrapper">
      <Dropdown.Toggle id="keep-it-drop-it-dropdown">
        {children}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleKeepIt}>Keep it</Dropdown.Item>
        <Dropdown.Item onClick={handleDropIt}>Drop it</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default L5rResultsDropdown;
