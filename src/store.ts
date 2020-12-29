import { createStore, applyMiddleware } from 'redux';
import handleRoll from './middleware/handleRoll.middleware';
import rollRequested from './middleware/rollRequested.middleware';
import poolRollRequested from './middleware/poolRollRequested.middleware';
import rerollRequested from './middleware/rerollRequested.middleware';
// Narrative Dice Pool
import narrativeDicePoolRollRequested from './middleware/narrativeDicePoolRollRequested.middleware';
import getLocalNarrativeDicePoolMsg from './middleware/getNarrativeDicePollMsg/getLocalNarrativeDicePoolMsg.middleware';
import getRequestNarrativeDicePoolMsg from './middleware/getNarrativeDicePollMsg/getRequestNarrativeDicePoolMsg.middleware';
// General
import getRequestMsg from './middleware/getMsg/getRequestMsg.middleware';
import getLocalMsg from './middleware/getMsg/getLocalMsg.middleware';
// Call of Cthulhu
import getCoCLocalMsg from './middleware/getCoCMsg/getCoCLocalMsg.middleware';
import getCoCRequestMsg from './middleware/getCoCMsg/getCoCRequestMsg.middleware';
// Warhammer
import getWarhammerLocalMsg from './middleware/getWarhammerMsg/getWarhammerLocalMsg.middleware';
import getWarhammerRequestMsg from './middleware/getWarhammerMsg/getWarhammerRequestMsg.middleware';
// Conan
import getConanLocalMsg from './middleware/getConanMsg/getConanLocalMsg.middleware';
import getConanRequestMsg from './middleware/getConanMsg/getConanRequestMsg.middleware';
import conanUpdateTokensState from './middleware/conanUpdateTokensState.middleware';
// Pool
import getLocalPoolMsg from './middleware/getPoolMsg/getLocalPoolMsg.middleware';
import getRequestPoolMsg from './middleware/getPoolMsg/getRequestPoolMsg.middleware';
// L5R
import l5rRollRequested from './middleware/l5rRollRequested.middleware';
import l5rRerollRequested from './middleware/l5rRerollRequested.middleware';
import l5rKeepDice from './middleware/l5rKeepDice.middleware';
import l5rAlterDie from './middleware/l5rAlterDie.middleware';
import l5rRollAdditionalDie from './middleware/l5rRollAdditionalDie.middleware';
import l5rKeepAdditionalDie from './middleware/l5rKeepAdditionalDie.middleware';
import l5rAddDie from './middleware/l5rAddDie.middleware';
import l5rSendState from './middleware/l5rSendState.middleware';

import sendRequestMsg from './middleware/sendRequestMsg.middleware';
import reducers from './reducers/index';

const rollMiddleware = [
	handleRoll,
	rollRequested,
	poolRollRequested,
	rerollRequested,

	narrativeDicePoolRollRequested,
	getLocalNarrativeDicePoolMsg,
	getRequestNarrativeDicePoolMsg,

	l5rRollRequested,
	l5rRerollRequested,
	l5rKeepDice,
	l5rAlterDie,
	l5rRollAdditionalDie,
	l5rKeepAdditionalDie,
	l5rAddDie,
	l5rSendState,

	getRequestMsg,
	getLocalMsg,

	getCoCLocalMsg,
	getCoCRequestMsg,

	getWarhammerLocalMsg,
	getWarhammerRequestMsg,

	getConanLocalMsg,
	getConanRequestMsg,
	conanUpdateTokensState,

	getLocalPoolMsg,
	getRequestPoolMsg,

	sendRequestMsg
];

export default createStore(
	reducers,
	applyMiddleware(...rollMiddleware)
);
