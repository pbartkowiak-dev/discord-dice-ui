import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faEquals, faBalanceScaleLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MoneyType, MoneyStateTypes, OperationsTypes, WarhammerMoneyModalProps } from './WarhammerMoneyModalTypes';
import styles from './WarhammerMoneyModal.module.css';
import { MONEY_GOLD, MONEY_SILVER, MONEY_BRASS} from '../../consts/consts';
import PoolBuilderDie from '../PoolBuilder/PoolBuilderDie';
import { Form } from 'react-bootstrap';

function WarhammerMoneyModal({
	showModal,
	closeModal,
	warhammerMoneyRecalculated
}: WarhammerMoneyModalProps
) {
// 	Standard coin values are:
// 1 gold crown (1GC) = 20 silver shillings (20/–) = 240
// brass pennies (240d)
	const initialMoneyState = {
		[MONEY_GOLD]: '0',
		[MONEY_SILVER]: '0',
		[MONEY_BRASS]: '0'
	};
	const [moneyState, setMoneyState] = useState<MoneyStateTypes>(initialMoneyState);
	const [moneyToAddState, setMoneyToAddState] = useState<MoneyStateTypes>(initialMoneyState);
	const [moneyResultState, setMoneyResultState] = useState<MoneyStateTypes>(initialMoneyState);
	const [operationState, setOperationState] = useState<OperationsTypes>('ADD');
	const sendToDiscordRef = useRef<HTMLInputElement>(null);

	const handleClearMoneyState = () => {
		setMoneyState(initialMoneyState);
		setMoneyToAddState(initialMoneyState);
		setMoneyResultState(initialMoneyState);
	};

	const changeToPennies = ({ MONEY_GOLD, MONEY_SILVER, MONEY_BRASS }: MoneyStateTypes): number => {
		return (
			Number(MONEY_GOLD) * 240
			+ Number(MONEY_SILVER) * 12
			+ Number(MONEY_BRASS)
		);
	};

	const changePenniesToSilver = (pennies: number) => {
		return Math.floor(pennies / 12);
	};

	const changeSilverToGold = (silver: number) => {
		return Math.floor(silver / 20);
	};

	const handleRecalculate = () => {
		let penniesResult;
		let newResultState = {...initialMoneyState};
		
		if (operationState === 'ADD') {
			penniesResult = changeToPennies(moneyState) + changeToPennies(moneyToAddState);
		} else {
			penniesResult = changeToPennies(moneyState) - changeToPennies(moneyToAddState);
		}

		if (penniesResult > 0) {
			let silverResult = changePenniesToSilver(penniesResult);
			penniesResult = penniesResult - (silverResult * 12);
	
			const goldResult = changeSilverToGold(silverResult);
			silverResult = silverResult - (goldResult * 20);
	
			newResultState = {
				[MONEY_GOLD]: `${goldResult}`,
				[MONEY_SILVER]: `${silverResult}`,
				[MONEY_BRASS]: `${penniesResult}`
			};
		}

		setMoneyResultState(newResultState);

		if (sendToDiscordRef?.current?.checked) {
			warhammerMoneyRecalculated({
				moneyState,
				moneyToAddState,
				newResultState,
				operationState
			});
		}
	};

	const onIncreaseCurrent = (moneyType: MoneyType) => {
		const newValue = Number(moneyState[moneyType]) + 1;
		setMoneyState({
			...moneyState,
			[moneyType]: `${newValue}`
		});
	};

	const onIncreaseToChange = (moneyType: MoneyType) => {
		const newValue = Number(moneyToAddState[moneyType]) + 1;
		setMoneyToAddState({
			...moneyToAddState,
			[moneyType]: `${newValue}`
		});
	};

	const onDecreaseCurrent = (moneyType: MoneyType) => {
		const newValue = Number(moneyState[moneyType]) - 1;
		if (newValue >= 0) {
			setMoneyState({
				...moneyState,
				[moneyType]: `${newValue}`
			});
		}
	};

	const onDecreaseToChange = (moneyType: MoneyType) => {
		const newValue = Number(moneyToAddState[moneyType]) - 1;
		if (newValue >= 0) {
			setMoneyToAddState({
				...moneyToAddState,
				[moneyType]: `${newValue}`
			});
		}
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
								onIncrease={onIncreaseCurrent}
								onDecrease={onDecreaseCurrent}
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
								onIncrease={onIncreaseCurrent}
								onDecrease={onDecreaseCurrent}
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
								onIncrease={onIncreaseCurrent}
								onDecrease={onDecreaseCurrent}
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
								value={moneyToAddState[MONEY_GOLD] || '0'}
								onChange={onChange}
								onIncrease={onIncreaseToChange}
								onDecrease={onDecreaseToChange}
								isDiceImgLarge={false}
								noImage={true}
								noHeader={true}
							/>
						</div>
						<div className={styles.cell}>
							<PoolBuilderDie
								title="Silver shillings"
								diceType={MONEY_SILVER}
								value={moneyToAddState[MONEY_SILVER] || '0'}
								onChange={onChange}
								onIncrease={onIncreaseToChange}
								onDecrease={onDecreaseToChange}
								isDiceImgLarge={false}
								noImage={true}
								noHeader={true}
							/>
						</div>
						<div className={styles.cell}>
							<PoolBuilderDie
								title="Brass pennies"
								diceType={MONEY_BRASS}
								value={moneyToAddState[MONEY_BRASS] || '0'}
								onChange={onChange}
								onIncrease={onIncreaseToChange}
								onDecrease={onDecreaseToChange}
								isDiceImgLarge={false}
								noImage={true}
								noHeader={true}
							/>
						</div>
					</div>
					<div className={styles.separator}>
						<div className={styles.buttonsContainerOperations}>
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
								value={moneyResultState[MONEY_GOLD] || '0'}
								onChange={onChange}
								isDiceImgLarge={false}
								readOnly={true}
							/>
						</div>
						<div className={styles.cell}>
							<PoolBuilderDie
								title="Silver shillings"
								diceType={MONEY_SILVER}
								diceImg="warhammer_money/silver.png"
								value={moneyResultState[MONEY_SILVER] || '0'}
								onChange={onChange}
								isDiceImgLarge={false}
								readOnly={true}
							/>
						</div>
						<div className={styles.cell}>
							<PoolBuilderDie
								title="Brass pennies"
								diceType={MONEY_BRASS}
								diceImg="warhammer_money/brass.png"
								value={moneyResultState[MONEY_BRASS] || '0'}
								onChange={onChange}
								isDiceImgLarge={false}
								readOnly={true}
							/>
						</div>
					</div>
					<div className={classNames([styles.rowToRight, styles.recalculateRow])}>
						<div className={styles.buttonsContainer}>
							<Button
								variant="outline-warning"
								onClick={handleClearMoneyState}
								><FontAwesomeIcon className={styles.buttonIcon} icon={faTrash} />Clear</Button>
							<Button
								variant="success"
								onClick={handleRecalculate}
								><FontAwesomeIcon className={styles.buttonIcon} icon={faBalanceScaleLeft} />Recalculate</Button>
						</div>
					</div>
					<div className={styles.rowToRight}>
						<Form.Group className={styles.checkboxContainer} controlId="sendToDiscordCheckbox">
							<Form.Check
							 	ref={sendToDiscordRef}
								className={styles.checkbox}
								type="checkbox"
								label="Send to Discord" />
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
