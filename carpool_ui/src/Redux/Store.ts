import {createStore} from 'redux';
import {rootReducer} from './rootreducer'
import { composeWithDevTools } from 'redux-devtools-extension';
const redux = require('redux')
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunkMiddleware)))