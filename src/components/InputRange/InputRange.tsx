import React from 'react';
import classNames from 'classnames';
import Form from "react-bootstrap/Form";
import styles from './InputRange.module.css';

interface InputRangeProps {
	id: string,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	hidePercent?: boolean;
	min?: number;
	max?: number;
}

function InputRange({ id, onChange, hidePercent, min, max }: InputRangeProps) {
	return (
		<div className={styles.container}>
			{ !hidePercent && <span className={classNames([styles.num, styles.numLeft])}>1%</span> }
			<Form.Group>
				<Form.Control
					type="range"
					id={id}
					name={id}
					min={min || 1}
					max={max || 100}
					onChange={onChange}
				/>
			</Form.Group>
			{ !hidePercent && <span className={classNames([styles.num, styles.numRight])}>100%</span> }
		</div>
	);
}

export default InputRange;
