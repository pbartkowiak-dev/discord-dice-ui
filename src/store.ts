import { createStore, applyMiddleware } from 'redux';
import handleRoll from './middleware/handleRoll.middleware';
import roll from './middleware/roll.middleware';
import getRequestMsg from './middleware/getRequestMsg.middleware';
import getLocalMsg from './middleware/getLocalMsg.middleware';
import sendRequestMsg from './middleware/sendRequestMsg.middleware';
import reducers from './reducers/index';

const rollMiddleware = [
	handleRoll,
	roll,
	getRequestMsg,
	getLocalMsg,
	sendRequestMsg
];

export default createStore(
	reducers,
	applyMiddleware(...rollMiddleware)
);
