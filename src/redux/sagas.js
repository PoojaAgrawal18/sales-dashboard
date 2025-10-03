import { all } from 'redux-saga/effects';

// eslint-disable-next-line import/no-cycle
import { authSaga } from './auth/saga';
import { userSaga } from './user/saga';

export default function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}
