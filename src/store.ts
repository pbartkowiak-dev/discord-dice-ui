import { createStore, applyMiddleware } from 'redux';
import handleRoll from './middleware/handleRoll.middleware';
import roll from './middleware/roll.middleware';
// General
import getRequestMsg from './middleware/getRequestMsg.middleware';
import getLocalMsg from './middleware/getLocalMsg.middleware';
// Call of Cthulhu
import getCoCLocalMsg from './middleware/getCoCLocalMsg.middleware';
import getCoCRequestMsg from './middleware/getCoCRequestMsg.middleware';
// Warhammer
// import getWarhammerLocalMsg from './middleware/getWarhammerLocalMsg.middleware';
// import getWarhammerRequestMsg from './middleware/getWarhammerRequestMsg.middleware';
// Conan
// import getConanLocalMsg from './middleware/getConanLocalMsg.middleware';
// import getConanRequestMsg from './middleware/getConanRequestMsg.middleware';
import sendRequestMsg from './middleware/sendRequestMsg.middleware';

import reducers from './reducers/index';

const rollMiddleware = [
	handleRoll,
	roll,
	getRequestMsg,
	getLocalMsg,
	getCoCLocalMsg,
	getCoCRequestMsg,
	// getWarhammerLocalMsg,
	// getWarhammerRequestMsg,
	// getConanLocalMsg,
	// getConanRequestMsg,
	sendRequestMsg
];

export default createStore(
	reducers,
	applyMiddleware(...rollMiddleware)
);
