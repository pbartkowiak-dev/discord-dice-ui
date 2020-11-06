import React from 'react';
import { connect } from 'react-redux';
import { hideMsg } from '../../actions/modals';
import CoCPushOptions from './CocPushOptions';
import { requestRoll } from '../../actions/roll.actions';
import { D100_SL } from '../../consts/warhammerConstants';

const mapDispatchToProps = {
	hideMsg,
	requestRoll
};

function CocPushOptionsContainer({
	rollOptions = {},
	finalDieResult,
	requestRoll,
	hideMsg
}: any) {

	const handlePushRoll = () => {
		hideMsg();

		setTimeout(() => {
			requestRoll({
				diceType: D100_SL,
				...rollOptions,
				isPushed: true
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
			luckRequiredForSuccess={luckRequiredForSuccess}
			luckRequiredForHardSuccess={luckRequiredForHardSuccess}
			luckRequiredForExtremeSuccess={luckRequiredForExtremeSuccess}
		/>
	);
}

export default connect(undefined, mapDispatchToProps)(CocPushOptionsContainer);
