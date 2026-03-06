import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { authReducer } from './auth/reducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    authReducer,
  });
