import React from 'react';
import classNames from 'classnames';
import Button from 'react-bootstrap/Button';
import PoolBuilderContainer from '../PoolBuilder/PoolBuilderContainer';
import { PoolType } from '../PoolBuilderModal/PoolBuilderModalTypes';
import l5rStyles from '../L5rResultsModal/L5rResultsModal.module.css';
import poolBuilderStyles from '../PoolBuilder/PoolBuilder.module.css';

function L5rDicePoolBuilder({
	submitRoll,
	l5rSendState
}: any ) {
	const handleSubmit = (pool: PoolType) => {
		submitRoll({ pool })
		l5rSendState();
	};

	const formName = 'l5r-pool-builder-form';
	const maxDicePool = 9;

	return (
		<div className={classNames({
			'dice-module' : true,
			[l5rStyles.poolBuilder]: true
		})}>
			<PoolBuilderContainer
				handleSubmit={handleSubmit}
				formName={formName}
				maxDicePool={maxDicePool}
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

export default L5rDicePoolBuilder;
