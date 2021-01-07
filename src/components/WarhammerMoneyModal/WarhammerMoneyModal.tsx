import React, { useState } from 'react';
import classNames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faEquals, faSync } from '@fortawesome/free-solid-svg-icons';
import { MoneyType, MoneyTypes, OperationsTypes, WarhammerMoneyModalProps } from './WarhammerMoneyModalTypes';
import styles from './WarhammerMoneyModal.module.css';
import { MONEY_GOLD, MONEY_SILVER, MONEY_BRASS} from '../../consts/consts' ;
import PoolBuilderDie from '../PoolBuilder/PoolBuilderDie';
import { Form } from 'react-bootstrap';

function WarhammerMoneyModal({
	showModal,
	closeModal
}: WarhammerMoneyModalProps
) {
// 	Standard coin values are:
// 1 gold crown (1GC) = 20 silver shillings (20/–) = 240
// brass pennies (240d)
	const initialMoneyState = {
		[MONEY_GOLD]: '',
		[MONEY_SILVER]: '',
		[MONEY_BRASS]: ''
	};
	const [moneyState, setMoneyState] = useState<MoneyTypes>(initialMoneyState);
	const [operationState, setOperationState] = useState<OperationsTypes>('ADD');

	const clearMoneyState = () => {
		setMoneyState(initialMoneyState);
	};

	const onIncrease = (moneyType: MoneyType) => {
		const newValue = Number(moneyState[moneyType]) - 1;
		if (newValue >= 0) {
			setMoneyState({
				...moneyState,
				[moneyType]: `${newValue}`
			});
		}
	};

	const onDecrease = (moneyType: MoneyType) => {
		const newValue = Number(moneyState[moneyType]) + 1;
		setMoneyState({
			...moneyState,
			[moneyType]: `${newValue}`
		});
	};

	const onChange = (moneyType: MoneyType, event: any) => {
		const { value } = event.target;
	};

	return (
		<Modal show={showModal} onHide={closeModal} size="lg">
			<Modal.Header closeButton>
				<Modal.Title>Money Converter</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={styles.container}>
					<div className={styles.row}>
					<div className={classNames([styles.cell, styles.cellCenter])}>
							Your money:
						</div>
						<div className={styles.cell}>
							<PoolBuilderDie
								title="Gold crowns"
								diceType={MONEY_GOLD}
								diceImg="warhammer_money/gold.png"
								value={moneyState[MONEY_GOLD]}
								onChange={onChange}
								onIncrease={onIncrease}
								onDecrease={onDecrease}
								isDiceImgLarge={true}
							/>
						</div>
						<div className={styles.cell}>
							<PoolBuilderDie
								title="Silver shillings"
								diceType={MONEY_SILVER}
								diceImg="warhammer_money/silver.png"
								value={moneyState[MONEY_SILVER]}
								onChange={onChange}
								onIncrease={onIncrease}
								onDecrease={onDecrease}
								isDiceImgLarge={true}
							/>
						</div>
						<div className={styles.cell}>
							<PoolBuilderDie
								title="Brass pennies"
								diceType={MONEY_BRASS}
								diceImg="warhammer_money/brass.png"
								value={moneyState[MONEY_BRASS]}
								onChange={onChange}
								onIncrease={onIncrease}
								onDecrease={onDecrease}
								isDiceImgLarge={true}
							/>
						</div>
					</div>
					<div className={styles.row}>
					<div className={classNames([styles.cell, styles.cellCenter])}>
							{ operationState === 'ADD' ? 'Money to add:' : 'Money to subtract:' }
						</div>
						<div className={styles.cell}>
							<PoolBuilderDie
								title="Gold crowns"
								diceType={MONEY_GOLD}
								value={moneyState[MONEY_GOLD] || '0'}
								onChange={onChange}
								onIncrease={onIncrease}
								onDecrease={onDecrease}
								isDiceImgLarge={false}
								noImage={true}
								noHeader={true}
							/>
						</div>
						<div className={styles.cell}>
							<PoolBuilderDie
								title="Silver shillings"
								diceType={MONEY_SILVER}
								value={moneyState[MONEY_SILVER] || '0'}
								onChange={onChange}
								onIncrease={onIncrease}
								onDecrease={onDecrease}
								isDiceImgLarge={false}
								noImage={true}
								noHeader={true}
							/>
						</div>
						<div className={styles.cell}>
							<PoolBuilderDie
								title="Brass pennies"
								diceType={MONEY_BRASS}
								value={moneyState[MONEY_BRASS] || '0'}
								onChange={onChange}
								onIncrease={onIncrease}
								onDecrease={onDecrease}
								isDiceImgLarge={false}
								noImage={true}
								noHeader={true}
							/>
						</div>
					</div>
					<div className={styles.separator}>
						<div className={styles.buttonsContainer}>
							<Button
								className={classNames({
									[styles.buttonMuted]: operationState === 'ADD',
									[styles.buttonIcon]: true
								})}
								variant="danger"
								onClick={() => setOperationState('SUBTRACT')}
								><FontAwesomeIcon icon={faMinus} /></Button>
							<Button
								className={classNames({
									[styles.buttonMuted]: operationState === 'SUBTRACT',
									[styles.buttonIcon]: true
								})}
								variant="success"
								onClick={() => setOperationState('ADD')}
								><FontAwesomeIcon icon={faPlus} /></Button>
						</div>
					</div>
					<div className={classNames([styles.row, styles.rowResults])}>
						<div className={classNames([styles.cell, styles.cellCenter])}>
							<FontAwesomeIcon className={styles.equalsIcon} icon={faEquals} />
						</div>
						<div className={styles.cell}>
							<PoolBuilderDie
								title="Gold crowns"
								diceType={MONEY_GOLD}
								diceImg="warhammer_money/gold.png"
								value={moneyState[MONEY_GOLD] || '0'}
								onChange={onChange}
								onIncrease={onIncrease}
								onDecrease={onDecrease}
								isDiceImgLarge={false}
								readOnly={true}
							/>
						</div>
						<div className={styles.cell}>
							<PoolBuilderDie
								title="Silver shillings"
								diceType={MONEY_SILVER}
								diceImg="warhammer_money/silver.png"
								value={moneyState[MONEY_SILVER] || '0'}
								onChange={onChange}
								onIncrease={onIncrease}
								onDecrease={onDecrease}
								isDiceImgLarge={false}
								readOnly={true}
							/>
						</div>
						<div className={styles.cell}>
							<PoolBuilderDie
								title="Brass pennies"
								diceType={MONEY_BRASS}
								diceImg="warhammer_money/brass.png"
								value={moneyState[MONEY_BRASS] || '0'}
								onChange={onChange}
								onIncrease={onIncrease}
								onDecrease={onDecrease}
								isDiceImgLarge={false}
								readOnly={true}
							/>
						</div>
					</div>
					<div className={classNames([styles.rowToRight, styles.recalculateRow])}>
						<Button variant="success" onClick={closeModal}><FontAwesomeIcon className={styles.syncIcon} icon={faSync} />Recalculate</Button>
					</div>
					<div className={styles.rowToRight}>
						<Form.Group className={styles.checkboxContainer} controlId="sendToDiscordCheckbox">
							<Form.Check className={styles.checkbox} type="checkbox" label="Send to Discord" />
						</Form.Group>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeModal}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default WarhammerMoneyModal;
