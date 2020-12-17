import React from 'react';
import classNames from 'classnames';
import Button from 'react-bootstrap/Button';
import PoolBuilderContainer from '../PoolBuilder/PoolBuilderContainer';
import { PoolType } from '../PoolBuilderModal/PoolBuilderModalTypes';
import poolBuilderStyles from '../PoolBuilder/PoolBuilder.module.css';

function NarrativeDicePoolBuilder({
	submitRoll
}: any ) {
	const handleSubmit = (pool: PoolType) => submitRoll({ pool });

	const formName = 'narrative-pool-builder-form';

	return (
		<div className={classNames({
			'dice-module' : true,
			[poolBuilderStyles.narrativePoolBuilder]: true
		})}>
			<PoolBuilderContainer
				handleSubmit={handleSubmit}
				formName={formName}
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

export default NarrativeDicePoolBuilder;
