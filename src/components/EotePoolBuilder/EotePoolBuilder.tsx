import React from 'react';
import { connect } from 'react-redux';
import { submitRoll } from '../../actions/roll.actions';
import PoolBuilderContainer from '../PoolBuilder/PoolBuilderContainer';

function EotePoolBuilder({
	submitRoll
}: any ) {
	const handleSubmit = () => {
		console.log('handle EotE submit!');
	}

	return (
		<div>
			<PoolBuilderContainer handleSubmit={handleSubmit} />
		</div>
	);
}

export default EotePoolBuilder;
