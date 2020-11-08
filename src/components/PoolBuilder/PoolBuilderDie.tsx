import React from 'react';
import Card from 'react-bootstrap/Card';
import PoolBuilderCounter from './PoolBuilderCounter';
import styles from './PoolBuilder.module.css';

function PoolBuilderDie({
	diceType,
	title,
	imageFilename,
	value,
	onChange,
	onIncrease,
	onDecrease
}: any) {
	
	return (
		<Card className={styles.dieCard}>
			<Card.Body className={styles.dieBody}>
				<Card.Subtitle className="text-center text-muted">{ title }</Card.Subtitle>
				<Card.Img
					variant="top"
					className={styles.dieImage}
					onClick={() => onIncrease(diceType)}
					src={require(`../../img/${imageFilename}`)} />
			</Card.Body>
			<Card.Footer className={styles.dieFooter}>
				<PoolBuilderCounter
					value={value}
					diceType={diceType}
					onChange={onChange}
					onIncrease={onIncrease}
					onDecrease={onDecrease}
				/>
			</Card.Footer>
		</Card>
	);
}

export default PoolBuilderDie;
