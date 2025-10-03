import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { userReducer } from './user/reducer';
import { authReducer } from './auth/reducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    authReducer,
    userReducer,
  });
