import React from 'react';
import { connect } from 'react-redux';
import { showMsgModal, hideMsg } from '../../actions/modals';
import CoCPushOptions from './CocPushOptions';
import { requestRoll } from '../../actions/roll.actions';

const mapDispatchToProps = {
	showMsgModal,
	hideMsg,
	requestRoll
};

function CocPushOptionsContainer({
	rollOptions ={},
	finalDieResult,
	requestRoll,
	hideMsg,
	canPush
}:any) {

	const handlePushRoll = () => {
		hideMsg();
		rollOptions.isPushed = true;
		console.log('push roll - rollOptions', rollOptions);
		setTimeout(() => {
			requestRoll({
				diceType: 100,
				...rollOptions
			});
		}, 500);
	};

	const luckRequiredForSuccess = Number(finalDieResult) - Number(rollOptions.skillLevel);
	const luckRequiredForHardSuccess = Number(finalDieResult) - Math.floor( Number(rollOptions.skillLevel) / 2 );
	const luckRequiredForExtremeSuccess = Number(finalDieResult) - Math.floor( Number(rollOptions.skillLevel) / 5 );

	return (
		<CoCPushOptions
			handlePushRoll={handlePushRoll}
			isPushed={rollOptions.isPushed}
			canPush={canPush}
			luckRequiredForSuccess={luckRequiredForSuccess}
			luckRequiredForHardSuccess={luckRequiredForHardSuccess}
			luckRequiredForExtremeSuccess={luckRequiredForExtremeSuccess}
		/>
	);
}

export default connect(undefined, mapDispatchToProps)(CocPushOptionsContainer);