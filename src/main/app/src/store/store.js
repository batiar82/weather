import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';
import promise from 'redux-promise-middleware'

const loggerMiddleware = createLogger();

const initialState={};

const store = createStore(rootReducer,initialState, applyMiddleware(loggerMiddleware,thunk));

export default store;