import React from 'react';
import { connect } from 'react-redux';
import { showMsg, closeCoCModal } from '../../actions';
import CoCPushOptions from './CocPushOptions';
import getCocRequestMsg from '../../utils/getCocRequestMsg';
import getCocLocalMsg from '../../utils/getCocLocalMsg';
import rollDice from '../../utils/rollDice';
import { request } from '../../utils/request';

const mapDispatchToProps = { showMsg, closeCoCModal };

function CocPushOptionsContainer({
	// props
	rollOptions,
	finalDieResult,
	userSettings,
	// dispatch props
	showMsg,
	closeCoCModal
}:any) {

	const handlePushRoll = () => {
		console.log('handlePushRoll')
		closeCoCModal();
		setTimeout(() => {
			const result = rollDice({
				diceType: 100,
				rollOptions
			});
			const requestMsg = getCocRequestMsg(result, rollOptions, userSettings);
			const localMsg = getCocLocalMsg(result, rollOptions);
		
			showMsg(localMsg);
			request(requestMsg);
		}, 3000)

	};

	const luckRequired = Number(finalDieResult) - Number(rollOptions.skillLevel);

	return (
		<CoCPushOptions
			handlePushRoll={handlePushRoll}
			luckRequired={luckRequired}
		/>
	);
}

export default connect(undefined, mapDispatchToProps)(CocPushOptionsContainer);