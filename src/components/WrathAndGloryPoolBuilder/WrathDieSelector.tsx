import React, { FC } from "react";
import useWrathAndGloryStore from "./store";
import classNames from "classnames";
import styles from "./WrathDiceNumberSetter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkull, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

interface WrathDieProps {
	wrathDieValue: number
}

const WrathDieSelector: FC<WrathDieProps> = ({ wrathDieValue }) => {
	const setWrathDiceNumber = useWrathAndGloryStore(({ setWrathDiceNumber }) => setWrathDiceNumber);
	const wrathDiceNumber = useWrathAndGloryStore(({ wrathDiceNumber }) => wrathDiceNumber);

	return (
		<li className={classNames({
			[styles.iconContainer]: true,
			[styles.iconSelected]: wrathDieValue === 0 ?  wrathDiceNumber === 0 : wrathDiceNumber >= wrathDieValue
		})}
			onClick={() => setWrathDiceNumber(wrathDieValue)}
		>
			{ wrathDieValue === 0
				? <FontAwesomeIcon icon={faTimesCircle} />
				: <FontAwesomeIcon icon={faSkull}/>
			}
		</li>
	);
};

export default WrathDieSelector;
