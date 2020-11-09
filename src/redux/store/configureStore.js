import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { INITIAL_STATE } from '../../common/app-const';
import rootReducer from '../rootReducer';
import api from '../middlewares/api';
import NodeService from '../../utils/nodeService';

const middlewares = [
  thunk,
  api,
];

if (!NodeService.isProduction()) {
  middlewares.push(logger);
}

const store = (initialState = INITIAL_STATE) => (
  createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  )
);

export default store;
