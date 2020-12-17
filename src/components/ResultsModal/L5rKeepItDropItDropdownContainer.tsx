import React from 'react';
import { connect } from 'react-redux';
import L5rKeepItDropItDropdown from './L5rKeepItDropItDropdown';
import { l5rKeepAdditionalDie, l5rSendState } from '../../actions/l5r.actions';

const mapDispatchToProps = { l5rKeepAdditionalDie, l5rSendState };

function L5rKeepItDropItDropdownContainer(props: any) {
	return (
		<L5rKeepItDropItDropdown {...props} />
	);
}

export default connect(undefined, mapDispatchToProps)(L5rKeepItDropItDropdownContainer);
