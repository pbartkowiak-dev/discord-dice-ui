import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import styles from './PoolBuilder.module.css';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const Plus = <FontAwesomeIcon icon={faPlus} />;
const Minus = <FontAwesomeIcon icon={faMinus} />;

function PoolBuilderCounter({
	diceType,
	onChange,
	onIncrease,
	onDecrease,
	value
}: any) {
	return (
		<InputGroup className="mb-3">
		<InputGroup.Prepend>
			<Button
				variant="primary"
				onClick={(event) => onDecrease(diceType)}
				className={classNames({
					[styles.counterBtnLeft]: true,
					[styles.btn]: true
				})}
			>{Minus}</Button>
		</InputGroup.Prepend>
		<FormControl
			className={styles.input}
			value={value}
			placeholder="0"
			onChange={(event) => onChange(diceType, event)}
		/>
		<InputGroup.Append>
			<Button
				variant="primary"
				onClick={() => onIncrease(diceType)}
				className={classNames({
					[styles.counterBtnRight]: true,
					[styles.btn]: true
				})}
			>{Plus}</Button>
		</InputGroup.Append>
	  </InputGroup>
	);
}

export default PoolBuilderCounter;
