import React from 'react';
import Button from 'react-bootstrap/Button'
import styles from './Reroll.module.css';

function Reroll({ handleReroll }:any) {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.row}>
					<Button variant="outline-primary"
						onClick={ handleReroll }
					>Reroll</Button>
				</div>
			</div>
		</>
	);
}

export default Reroll;
