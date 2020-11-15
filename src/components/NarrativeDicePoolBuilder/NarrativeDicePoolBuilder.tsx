import React from 'react';
import Button from 'react-bootstrap/Button';
import PoolBuilderContainer from '../PoolBuilder/PoolBuilderContainer';
import styles from './NarrativeDicePoolBuilder.module.css';

function NarrativeDicePoolBuilder({
	submitRoll
}: any ) {
	const handleSubmit = () => {
		console.log('handle EotE submit!');
	}

	const formName = 'narrative-pool-builder-form';

	return (
		<div className="dice-module">
			<PoolBuilderContainer
				handleSubmit={handleSubmit}
				formName={formName}
			/>
			<div className={styles.poolBuilderBtnContainer}>
				<Button
					size="lg"
					variant="success"
					type="submit"
					form={formName}>Roll!
				</Button>
			</div>
		</div>
	);
}

export default NarrativeDicePoolBuilder;
