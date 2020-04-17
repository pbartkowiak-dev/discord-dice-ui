import React from 'react';
import { connect } from 'react-redux';
import { hideMsg } from '../../actions';
import Notifications from './Notifications';

const mapStateToProps = (state:any) => {
	return {
		msgData: state.msg
	};
};

const mapDispatchToProps = { hideMsg };


type ModifierModalContainerProps = {
	hideMsg:Function,
	msgData:any
}

function ModifierModalContainer({
	hideMsg,
	msgData
}:ModifierModalContainerProps) {
	return (
		<>
			<Notifications
				hideMsg={hideMsg}
				msgData={msgData}
			/>
		</>
	);

}

export default connect(mapStateToProps, mapDispatchToProps)(ModifierModalContainer);
