import React from 'react';
import classNames from 'classnames';
import styles from "./CthulhuSkill.module.css";
import dieImg from  "../../img/d10.png";

interface SkillProps {
	name: string;
	type: string;
	skillId: string;
	value: number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>, type: string) => void;
	submitRoll: (value: number, skillId: string) => void;
}

function CthulhuSkill({
	name,
	skillId,
	type,
	value,
	onChange,
	submitRoll
} : SkillProps) {
	const halfValue = Math.floor(value / 2);
	const oneFifthValue = Math.floor(value / 5);

	return (
		<div className={classNames({
			[styles.container]: true,
			[styles.noValue]: !value
		})}>
			<div className={styles.die} role="button" onClick={_ => submitRoll(value, skillId)}>
				<img
					className={styles.dieImg}
					src={dieImg}
					alt="d100"
				/>
			</div>
			<div className={styles.containerLabel}>
				<span className={styles.skillName}>{name}</span>
			</div>
			<div className={styles.containerMain}>
				<input
					type="text"
					name={skillId}
					value={value || ''}
					className={classNames([styles.input, styles.inputMain])}
					onChange={e => onChange(e, type)}
					autoComplete="off"
				/>
			</div>
			<div className={styles.containerDerived}>
				<input
					type="text"
					disabled
					value={value ? halfValue : ''}
					className={classNames([styles.input, styles.inputDerived, styles.inputTop])} />
				<input
					type="text"
					disabled
					value={value ? oneFifthValue : ''}
					className={classNames([styles.input, styles.inputDerived])} />
			</div>
		</div>
	);
}

export default CthulhuSkill;
