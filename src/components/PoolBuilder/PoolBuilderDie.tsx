import React from 'react';
import Card from 'react-bootstrap/Card';
import PoolBuilderCounter from './PoolBuilderCounter';
import styles from './PoolBuilder.module.css';

function PoolBuilderDie({
	title,
	imageFilename
}: any) {
	return (
		<Card className={styles.dieCard}>
			<Card.Body className={styles.dieBody}>
				<Card.Subtitle className="text-center text-muted">{ title }</Card.Subtitle>
				{/* <div className="dice__image"></div> */}
				{/* <Card.Img variant="top" src={d4} /> */}
				<Card.Img
					variant="top"
					className={styles.dieImage}
					src={require(`../../img/${imageFilename}`)} />
			</Card.Body>
			<Card.Footer className={styles.dieFooter}>
				<PoolBuilderCounter />
			</Card.Footer>
		</Card>
	);
}

export default PoolBuilderDie;
