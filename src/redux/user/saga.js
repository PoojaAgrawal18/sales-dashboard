import { toast } from 'react-toastify';
import { all, put, takeEvery } from 'redux-saga/effects';

// eslint-disable-next-line import/no-cycle
import { doApiCall } from '../helper';
import { USER_ACTIONS } from './action';
import { UserAPIService } from '../../services/user/user';

const userService = new UserAPIService();

export function* GET_USERS({ payload }) {
  const response = yield doApiCall(userService.getUser, payload, USER_ACTIONS.SET_STATE);

  if (response.success) {
    const {
      data,
      meta: { pagination },
    } = response;
    yield put({
      type: USER_ACTIONS.SET_STATE,
      payload: {
        data,
        pagination,
      },
    });
  }
}

export function* CREATE_USER({ payload }) {
  const response = yield doApiCall(userService.createUser, payload, USER_ACTIONS.SET_STATE);

  if (response.success) {
    const { data } = response;
    yield put({
      type: USER_ACTIONS.SET_STATE,
      payload: {
        ...data,
      },
    });

    toast.success('User added successfull', {
      position: 'top-right',
      autoClose: '1000',
      hideProgressBar: false,
      closeButton: true,
      closeOnClick: true,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });
  }
}

export function* GET_USER_BY_ID({ payload }) {
  const response = yield doApiCall(userService.getUserById, payload, USER_ACTIONS.SET_STATE);
  if (response.success) {
    const { data } = response;
    yield put({
      type: USER_ACTIONS.SET_STATE,
      payload: {
        userData: data,
      },
    });
  }
}

export function* UPDATE_USER({ payload }) {
  const response = yield doApiCall(userService.updateUser, payload, USER_ACTIONS.SET_STATE);

  if (response.success) {
    const { data } = response;
    yield put({
      type: USER_ACTIONS.SET_STATE,
      payload: {
        ...data,
      },
    });

    toast.success('User updated successfull', {
      position: 'top-right',
      autoClose: '1000',
      hideProgressBar: false,
      closeButton: true,
      closeOnClick: true,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });
  }
}

export function* userSaga() {
  yield all([
    takeEvery(USER_ACTIONS.GET_USERS, GET_USERS),
    takeEvery(USER_ACTIONS.CREATE_USER, CREATE_USER),
    takeEvery(USER_ACTIONS.GET_USER_BY_ID, GET_USER_BY_ID),
    takeEvery(USER_ACTIONS.UPDATE_USER, UPDATE_USER),
  ]);
}
