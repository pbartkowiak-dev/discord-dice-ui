import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import styles from './PoolBuilder.module.css';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const Plus = <FontAwesomeIcon icon={faPlus} />;
const Minus = <FontAwesomeIcon icon={faMinus} />;

function PoolBuilderCounter() {
	return (
		<InputGroup className="mb-3">
		<InputGroup.Prepend>
			<Button variant="primary" className={styles.counterBtnLeft}>{Minus}</Button>
		</InputGroup.Prepend>
		<FormControl
			className={styles.input}
		/>
		<InputGroup.Append>
			<Button variant="primary" className={styles.counterBtnRight}>{Plus}</Button>
		</InputGroup.Append>
	  </InputGroup>
	);
}

export default PoolBuilderCounter;
