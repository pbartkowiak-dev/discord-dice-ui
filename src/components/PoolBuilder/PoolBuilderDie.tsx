import React from 'react';
import classNames from 'classnames';
import Card from 'react-bootstrap/Card';
import PoolBuilderCounter from './PoolBuilderCounter';
import styles from './PoolBuilder.module.css';

function PoolBuilderDie({
	diceType,
	title,
	value,
	modifierValue,
	onChange,
	onIncrease,
	onDecrease,
	diceImg,
	isDiceImgLarge
}: any) {

	const diceImgPath = diceImg
		? require(`../../img/${diceImg}`)
		: require(`../../img/${diceType}.png`);

	const diceImgClassName = classNames({
		[styles.dieImage]: true,
		[styles.dieImageLarge]: !!isDiceImgLarge
	});
	
	return (
		<Card className={styles.dieCard}>
			<Card.Body className={styles.dieBody}>
				<Card.Subtitle className={classNames({
					'text-center': true,
					'text-muted': true,
					[styles.dieCardTitle]: true
				})}>{ title }</Card.Subtitle>
				<Card.Img
					variant="top"
					className={diceImgClassName}
					onClick={() => onIncrease(diceType)}
					src={diceImgPath}
				/>
			</Card.Body>
			<Card.Footer className={styles.dieFooter}>
				<PoolBuilderCounter
					value={value}
					modifierValue={modifierValue}
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