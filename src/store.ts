import { createStore, applyMiddleware } from 'redux';
import handleRoll from './middleware/handleRoll.middleware';
import roll from './middleware/roll.middleware';
import requestMsg from './middleware/requestMsg.middleware';
import localMsg from './middleware/localMsg.middleware';
import reducers from './reducers/index';

const rollMiddleware = [
	handleRoll,
	roll,
	requestMsg,
	localMsg
];

export default createStore(
	reducers,
	applyMiddleware(...rollMiddleware)
);
