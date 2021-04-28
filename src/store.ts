import { createStore, applyMiddleware } from 'redux';
import handleRoll from './middleware/handleRoll.middleware';
import rollRequested from './middleware/rollRequested.middleware';
import poolRollRequested from './middleware/poolRollRequested.middleware';
import rerollRequested from './middleware/rerollRequested.middleware';
// Narrative Dice Pool
import narrativeDicePoolRollRequested from './middleware/narrativeDicePoolRollRequested.middleware';
import getLocalNarrativeDicePoolMsg from './middleware/getNarrativeDicePollMsg/getLocalNarrativeDicePoolMsg.middleware';
import getRequestNarrativeDicePoolMsg from './middleware/getNarrativeDicePollMsg/getRequestNarrativeDicePoolMsg.middleware';
import narrativeDiceUpdateTokensState from './middleware/narrativeDiceUpdateTokensState.middleware';
// General
import getRequestMsg from './middleware/getMsg/getRequestMsg.middleware';
import getLocalMsg from './middleware/getMsg/getLocalMsg.middleware';
// Call of Cthulhu
import cthulhuRollRequested from './middleware/cthulhu/cthulhuRollRequested.middleware';
import cthulhuPushRollRequested from './middleware/cthulhu/cthulhuPushRollRequested.middleware';
import cthulhuSendResults from './middleware/cthulhu/cthulhuSendResults.middleware';
// Warhammer
import warhammerRollRequested from './middleware/warhammer/warhammerRollRequested.middleware';
import warhammerRerollRequested from './middleware/warhammer/warhammerRerollRequested.middleware';
import warhammerSendResults from './middleware/warhammer/warhammerSendResults.middleware';
import warhammerMoneyRecalculated from './middleware/warhammerMoneyRecalculated.middleware';
// Conan
import getConanLocalMsg from './middleware/getConanMsg/getConanLocalMsg.middleware';
import getConanRequestMsg from './middleware/getConanMsg/getConanRequestMsg.middleware';
import conanUpdateTokensState from './middleware/conanUpdateTokensState.middleware';
// Infinity
import getInfinityLocalMsg from './middleware/getInfinityMsg/getInfinityLocalMsg.middleware';
import getInfinityRequestMsg from './middleware/getInfinityMsg/getInfinityRequestMsg.middleware';
import infinityUpdateTokensState from './middleware/infinityUpdateTokensState.middleware';
// Pool
import getLocalPoolMsg from './middleware/getPoolMsg/getLocalPoolMsg.middleware';
import getRequestPoolMsg from './middleware/getPoolMsg/getRequestPoolMsg.middleware';
// L5R
import l5rRollRequested from './middleware/l5r/l5rRollRequested.middleware';
import l5rRerollRequested from './middleware/l5r/l5rRerollRequested.middleware';
import l5rKeepDice from './middleware/l5r/l5rKeepDice.middleware';
import l5rAlterDie from './middleware/l5r/l5rAlterDie.middleware';
import l5rRollAdditionalDie from './middleware/l5r/l5rRollAdditionalDie.middleware';
import l5rKeepAdditionalDie from './middleware/l5r/l5rKeepAdditionalDie.middleware';
import l5rAddDie from './middleware/l5r/l5rAddDie.middleware';
import l5rSendState from './middleware/l5r/l5rSendState.middleware';
// Roll and Keep
import rollAndKeepRollRequested from './middleware/rollAndKeep/rollAndKeepRollRequested.middleware';
import rollAndKeepRerollRequested from './middleware/rollAndKeep/rollAndKeepRerollRequested.middleware';
import rollAndKeepResultsKept from './middleware/rollAndKeep/rollAndKeepResultsKept.middleware';

import sendRequestMsg from './middleware/sendRequestMsg.middleware';
import reducers from './reducers/index';
// Combat Tracker
import combatTrackerSendRequested from './middleware/combatTracker/combatTrackerSendRequested.middleware';

const rollMiddleware = [
	handleRoll,
	rollRequested,
	poolRollRequested,
	rerollRequested,

	narrativeDicePoolRollRequested,
	getLocalNarrativeDicePoolMsg,
	getRequestNarrativeDicePoolMsg,
	narrativeDiceUpdateTokensState,

	l5rRollRequested,
	l5rRerollRequested,
	l5rKeepDice,
	l5rAlterDie,
	l5rRollAdditionalDie,
	l5rKeepAdditionalDie,
	l5rAddDie,
	l5rSendState,

	rollAndKeepRollRequested,
	rollAndKeepRerollRequested,
	rollAndKeepResultsKept,

	getRequestMsg,
	getLocalMsg,

	cthulhuRollRequested,
	cthulhuPushRollRequested,
	cthulhuSendResults,

	warhammerSendResults,
	warhammerRollRequested,
	warhammerRerollRequested,
	warhammerMoneyRecalculated,

	getConanLocalMsg,
	getConanRequestMsg,
	conanUpdateTokensState,

	getInfinityLocalMsg,
	getInfinityRequestMsg,
	infinityUpdateTokensState,

	getLocalPoolMsg,
	getRequestPoolMsg,

	combatTrackerSendRequested,

	sendRequestMsg
];

export default createStore(
	reducers,
	applyMiddleware(...rollMiddleware)
);
