import React from 'react';
import { connect } from 'react-redux';
import { showMsg, hideMsg } from '../../actions';
import CoCPushOptions from './CocPushOptions';
import getCocRequestMsg from '../../utils/getCocRequestMsg';
import getCocLocalMsg from '../../utils/getCocLocalMsg';
import rollDice from '../../utils/rollDice';
import { request } from '../../utils/request';

const mapDispatchToProps = { showMsg, hideMsg };

function CocPushOptionsContainer({
	// props
	rollOptions ={},
	finalDieResult,
	userSettings,
	// dispatch props
	showMsg,
	hideMsg,
	canPush
}:any) {

	const handlePushRoll = () => {
		hideMsg();
		rollOptions.isPushed = true;
		setTimeout(() => {
			const result = rollDice({
				diceType: 100,
				rollOptions
			});
			const requestMsg = getCocRequestMsg(result, rollOptions, userSettings);
			const localMsg = getCocLocalMsg(result, rollOptions);
		
			showMsg(localMsg);
			request(requestMsg);
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