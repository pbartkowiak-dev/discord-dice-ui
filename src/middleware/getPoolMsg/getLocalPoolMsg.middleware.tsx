import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import { faArrowAltCircleRight, faSkull, faSun } from '@fortawesome/free-solid-svg-icons';
import joinAsBlocks from '../../utils/joinAsBlocks';
import CodeSpan from '../../components/CodeSpan/CodeSpan';
import styles from '../../components/ResultsModal/ResultsModal.module.css';
import { DICE_POOL_ROLLED, localMsgReady } from '../../actions/roll.actions';

const IconUp = <FontAwesomeIcon icon={faArrowAltCircleUp} />;
const IconDown = <FontAwesomeIcon icon={faArrowAltCircleDown} />;
const IconRight = <FontAwesomeIcon icon={faArrowAltCircleRight} />;
const IconScull = <FontAwesomeIcon icon={faSkull} />;
const IconSun = <FontAwesomeIcon icon={faSun} />;

const getLocalMsg = (store:any) => (next:any) => (action:any) => {
	if (action.type === DICE_POOL_ROLLED) {
		const state = store.getState();
		const { form : { diceModuleForm } } = state;
		const { rerollCount } = state;
		const formValues = diceModuleForm?.values || {};
		const { results } = action.payload;
		const fields = [];

		Object.keys(results).forEach((diceType: string) => {

		});

		console.log('DICE_POOL_ROLLED results', results)
		
		// store.dispatch(localMsgReady({
		// 	title,
		// 	fields,
		// 	rollOptions: rollDetails,
		// 	results
		// }));
	}
	next(action);
};

export default getLocalMsg;
