import React from "react";
import classNames from "classnames";
import styles from './Zone.module.css';
import AddCombatant from "./AddCombatant";
import useCombatTrackerStore, { CombatantTypes } from "./store";
import Combatant from "./Combatant";

interface ZoneProps {
	name: string;
	index: number;
}

export default function Zone({ name, index }: ZoneProps) {
	const isWaitingRoom = index === -1;

	const combatants = useCombatTrackerStore(
		({ combatants }) => combatants
			.filter(cb => cb.zoneIndex === index)
			.sort((a, b) => b.initiative - a.initiative)
	);

	const isDragging = useCombatTrackerStore(({ isDragging }) => isDragging);
	const setHoverZone = useCombatTrackerStore(({ setHoverZone }) => setHoverZone);
	const hoverZone = useCombatTrackerStore(({ hoverZone }) => hoverZone);

	const onMouseEnter = () => setHoverZone(index);

	const onMouseLeave = () => setHoverZone(null);

	return (
		<div
			className={classNames({
				[styles.container]: true,
				[styles.containerWaitingRoom]: isWaitingRoom
			})}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{ isDragging && <div
				className={classNames({
					[styles.draggingOverlay]: true,
					[styles.draggingOverlayHovered]: hoverZone === index
				})}
			/>
			}
			<div className={classNames({
				[styles.name]: true,
				[styles.nameWaitingRoom]: isWaitingRoom
			})}>
				{name}
			</div>
			<div>
				{
					combatants.map((combatant: CombatantTypes) => <Combatant key={combatant.id} {...combatant} /> )
				}
			</div>
			{ isWaitingRoom && <AddCombatant zoneIndex={index} /> }
		</div>
	);
}
