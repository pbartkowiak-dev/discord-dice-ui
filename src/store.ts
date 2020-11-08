import { createStore, applyMiddleware } from 'redux';
import handleRoll from './middleware/handleRoll.middleware';
import rollRequested from './middleware/rollRequested.middleware';
import poolRollRequested from './middleware/poolRollRequested.middleware';
import rerollRequested from './middleware/rerollRequested.middleware';
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

import sendRequestMsg from './middleware/sendRequestMsg.middleware';
import reducers from './reducers/index';

const rollMiddleware = [
	handleRoll,
	rollRequested,
	poolRollRequested,
	rerollRequested,
	getRequestMsg,
	getLocalMsg,
	getCoCLocalMsg,
	getCoCRequestMsg,
	getWarhammerLocalMsg,
	getWarhammerRequestMsg,
	getConanLocalMsg,
	getConanRequestMsg,
	sendRequestMsg
];

export default createStore(
	reducers,
	applyMiddleware(...rollMiddleware)
);
