import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import useCombatTrackerStore from "./store";
import styles from './AddZone.module.css'
import { zoneNameMaxLength } from "./consts";

export default function AddZone() {
	const [zoneName, setZoneName] = useState('');
	const [error, setError] = useState('');
	const addZone: (name: string) => void = useCombatTrackerStore(({ addZone }) => addZone);

	const validate = (name: string) => {
		let error = ''

		if (!zoneName) {
			error = 'Zone name cannot be empty';
		} else if (name.length > zoneNameMaxLength)
			error = 'Zone name is too long';
		return error;
	}

	const handleAddZone = (e: React.FormEvent) => {
		e.preventDefault();

		const zoneNameTrimmed = zoneName.trim();
		const error = validate(zoneNameTrimmed);

		if (!error) {
			setZoneName('');
			addZone(zoneNameTrimmed);
		}

		setError(error);
	};
	return (
		<form onSubmit={handleAddZone} className={styles.container}>
			<input
				name="addZone"
				type="text"
				value={zoneName}
				className={styles.input}
				placeholder="Zone's Name"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setZoneName(e.target.value)}
			/>
			<Button variant="primary" size="sm" type="submit">
				Add Zone
			</Button>
			<div className={styles.errorContainer}>{error}</div>
		</form>
	);
}
