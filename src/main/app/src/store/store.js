import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';
import {wsMiddleware} from '../middleware/wsMiddleware'
const loggerMiddleware = createLogger();

const initialState={};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,initialState,composeEnhancers(
    applyMiddleware(wsMiddleware,thunk,loggerMiddleware)));

export default store;