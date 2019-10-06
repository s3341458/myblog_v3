import { combineReducers } from 'redux';
import auth from './auth';

import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';


const rootReducer = combineReducers({ auth });

const store = createStore(
  rootReducer,
  devToolsEnhancer()
);

export default store;
