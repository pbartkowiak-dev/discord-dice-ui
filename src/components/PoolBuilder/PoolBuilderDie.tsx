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
	isDiceImgLarge,
	readOnly,
	noImage,
	noHeader,
	disabled,
	variant
}: any) {
	let diceImgPath;
	let diceImgClassName;

	if (!noImage) {

		diceImgPath = diceImg
		? require(`../../img/${diceImg}`)
		: require(`../../img/${diceType}.png`);

		diceImgClassName = classNames({
			[styles.dieImage]: true,
			[styles.dieImageReadOnly]: readOnly,
			[styles.dieImageLarge]: !!isDiceImgLarge
		});
	}

	const handleIncrease = () => {
		if (typeof onIncrease === 'function') {
			onIncrease(diceType)
		}
	}
	
	return (
		<Card className={classNames({
			[styles.dieCard]: true,
			[styles.disabled]: Boolean(disabled),
			[styles.noImage]: !!noImage
		})}>
			<Card.Body className={styles.dieBody}>
				{title && <Card.Subtitle className={classNames({
					hidden: noHeader,
					'text-center': true,
					'text-muted': true,
					[styles.dieCardTitle]: true
				})}>{ title }</Card.Subtitle>
				}
				{ !noImage && <Card.Img
					variant="top"
					className={diceImgClassName}
					onClick={handleIncrease}
					src={diceImgPath}
				/>
				}
			</Card.Body>
			<Card.Footer className={styles.dieFooter}>
				{ readOnly && <div className={styles.readOnlyValue}>{value}</div> }
				{ !readOnly && <PoolBuilderCounter
					value={value}
					modifierValue={modifierValue}
					diceType={diceType}
					onChange={onChange}
					onIncrease={onIncrease}
					onDecrease={onDecrease}
					variant={variant}
				/> }
			</Card.Footer>
		</Card>
	);
}

export default PoolBuilderDie;
