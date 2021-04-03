import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import classNames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import {
	closeCthulhuSheetModal,
	cthulhuSkillsUpdateRequested,
	cthulhuAttributesUpdateRequested,
	requestCthulhuRoll
} from "../../actions/cthulhu.actions";
import styles from "./CthulhuSheetModal.module.css";
import cthulhuSkillsList, { SkillType } from './utils/cthulhuSkillsList';
import cthulhuAttributesList, { AttributeType } from './utils/cthulhuAttributesList';
import CthulhuSkill from "./CthulhuSkill";

function Checkbox({ name, label, onChange, isDisabled }: any) {
	return (
		<div className={styles.checkbox__container}>
			<input
				type="checkbox"
				name={name}
				id={name}
				disabled={isDisabled}
				className={classNames({
					[styles.checkbox__input]: true,
					[styles['checkbox--disabled']]: isDisabled
				})}
				onChange={(e) => onChange(e, name)}
			/>
			<label
				className={classNames({
					[styles.checkbox__Label]: true,
					[styles['checkbox--disabled']]: isDisabled
				})}
				htmlFor={name}
			>{label}</label>
		</div>
	);
}

function CthulhuSheetModal() {
	const dispatch = useDispatch();
	const [skillsState, setSkillsState] = useState<{[key: string] : number}>({});
	const [attributesState, setAttributesState] = useState<{[key: string] : number}>({});
	const [bonusState, setBonusState] = useState('');

	const hideModal = () => dispatch(closeCthulhuSheetModal());
	const updateSkills = (st : any) => dispatch(cthulhuSkillsUpdateRequested(st));
	const updateAttributes = (st : any) => dispatch(cthulhuAttributesUpdateRequested(st));
	const cthulhuState = useSelector(({ cthulhuState }: any) => cthulhuState);

	const { showCthulhuSheetModal, skills, attributes } = cthulhuState;

	const CTHULHU_BONUS = 'CTHULHU_BONUS';
	const CTHULHU_TWO_BONUS = 'CTHULHU_TWO_BONUS';
	const CTHULHU_PENALTY = 'CTHULHU_PENALTY';
	const CTHULHU_TWO_PENALTY = 'CTHULHU_TWO_PENALTY';

	const SKILL = 'SKILL';
	const ATTR = 'ATTR';

	useEffect(() => {
		setSkillsState(skills);
		setAttributesState(attributes);
		setBonusState('');
	}, [attributes, skills, showCthulhuSheetModal]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
		const value = Number(event.target.value);

		if (!isNaN(value)) {
			if (type === SKILL) {
				setSkillsState({
					...skillsState,
					[event.target.name]: value
				});
			}
			if (type === ATTR) {
				setAttributesState({
					...attributesState,
					[event.target.name]: value
				});
			}
		}
	};

	const saveChanges = () => {
		updateSkills(skillsState);
		updateAttributes(attributesState);

		hideModal();
	};

	const submitRoll = (value: number, skillId: string) => {
		if (value) {
			dispatch(requestCthulhuRoll({
				cthulhuBonus: bonusState === CTHULHU_BONUS,
				cthulhuTwoBonus: bonusState === CTHULHU_TWO_BONUS,
				cthulhuPenalty: bonusState === CTHULHU_PENALTY,
				cthulhuTwoPenalty: bonusState === CTHULHU_TWO_PENALTY,
				skillLevel: value,
				skillId
			}));

			hideModal();
		}
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
		if (event.target.checked) {
			setBonusState(name);
		} else {
			setBonusState('');
		}
	};

	return (
		<Modal
			show={showCthulhuSheetModal}
			onHide={hideModal}
			size="lg"
		>
			<Modal.Header closeButton>
				<Modal.Title><FontAwesomeIcon className={styles.headerIcon} icon={faFileInvoice} /> Character Skills</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={styles.containerBonusDice}>
					<div className={styles.bonusDiceLeft}>
						<Checkbox
							name={CTHULHU_BONUS}
							isDisabled={bonusState && bonusState !== CTHULHU_BONUS}
							label={<>Apply <strong>one</strong> Bonus Die</>}
							onChange={handleCheckboxChange}
						/>
						<Checkbox
							name={CTHULHU_TWO_BONUS}
							isDisabled={bonusState && bonusState !== CTHULHU_TWO_BONUS}
							label={<>Apply <strong>two</strong> Bonus Dice</>}
							onChange={handleCheckboxChange}
						/>
					</div>
					<div>
						<Checkbox
							name={CTHULHU_PENALTY}
							isDisabled={bonusState && bonusState !== CTHULHU_PENALTY}
							label={<>Apply <strong>one</strong> Penalty Die</>}
							onChange={handleCheckboxChange}
						/>
						<Checkbox
							name={CTHULHU_TWO_PENALTY}
							isDisabled={bonusState && bonusState !== CTHULHU_TWO_PENALTY}
							label={<>Apply <strong>two</strong> Penalty Dice</>}
							onChange={handleCheckboxChange}
						/>
					</div>
				</div>
				<div className={styles.list}> {
					cthulhuAttributesList.map(({ id, name }: AttributeType) => (
						<CthulhuSkill
							key={id}
							type={ATTR}
							name={name}
							skillId={id}
							value={attributesState[id] || 0}
							onChange={handleChange}
							submitRoll={submitRoll}
						/>
					))
				} </div>
				<div className={styles.list}> {
					cthulhuSkillsList.map(({ id, name }: SkillType) => (
						<CthulhuSkill
							key={id}
							type={SKILL}
							name={name}
							skillId={id}
							value={skillsState[id] || 0}
							onChange={handleChange}
							submitRoll={submitRoll}
						/>
					))
				} </div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="outline-secondary"
					onClick={hideModal}>Close</Button>
				<Button
					variant="success"
					onClick={saveChanges}
					type="submit">Save changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CthulhuSheetModal;
