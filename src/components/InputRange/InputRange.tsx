import React from 'react';
import classNames from 'classnames';
import Form from "react-bootstrap/Form";
import styles from './InputRange.module.css';

interface InputRangeProps {
	id: string,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputRange({ id, onChange }: InputRangeProps) {
	return (
		<div className={styles.container}>
			<span className={classNames([styles.num, styles.numLeft])}>1%</span>
			<Form.Group>
				<Form.Control
					type="range"
					id={id}
					name={id}
					min="1"
					max="100"
					onChange={onChange}
				/>
			</Form.Group>
			<span className={classNames([styles.num, styles.numRight])}>100%</span>
		</div>
	);
}

export default InputRange;