import React from 'react';
import classNames from 'classnames';
import Button from 'react-bootstrap/Button';
import PoolBuilderContainer from '../PoolBuilder/PoolBuilderContainer';
import { PoolType } from '../PoolBuilderModal/PoolBuilderModalTypes';
import { submitRoll } from '../../actions/roll.actions';
import poolBuilderStyles from '../PoolBuilder/PoolBuilder.module.css';
import { useDispatch } from "react-redux";

function WrathAndGloryPoolBuilder() {
	const dispatch = useDispatch();

	const handleSubmit = (pool: PoolType, modifier: string) => {
		dispatch(submitRoll({ pool, modifier }));
	};

	const formName = 'wrath-and-glory-builder-form';
	const maxDicePool = 35;

	return (
		<div className={classNames({
			'dice-module' : true,
		})}>
			<PoolBuilderContainer
				handleSubmit={handleSubmit}
				formName={formName}
				maxDicePool={maxDicePool}
				type="wrathAndGloryMode"
			/>
			<div className={poolBuilderStyles.poolBuilderBtnContainer}>
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

export default WrathAndGloryPoolBuilder;
