import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';
import {wsMiddleware} from '../middleware/wsMiddleware'
const loggerMiddleware = createLogger();

const initialState={};

const store = createStore(rootReducer,initialState, 
    applyMiddleware(wsMiddleware,loggerMiddleware,thunk));

export default store;