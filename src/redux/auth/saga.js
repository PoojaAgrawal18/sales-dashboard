import store from 'store';
import { toast } from 'react-toastify';
import { all, put, takeEvery } from 'redux-saga/effects';

// eslint-disable-next-line import/no-cycle
import { history } from '../../main';
import { doApiCall } from '../helper';
import { AUTH_ACTIONS } from './actions';
import { AuthAPIService } from '../../services/auth/auth';
import { UserAPIService } from '../../services/user/user';

const authService = new AuthAPIService();
const userService = new UserAPIService();

export function* LOGIN({ payload }) {
  const response = yield doApiCall(authService.login, payload, AUTH_ACTIONS.SET_STATE);
  
  if (response.success) {
    const { data } = response;
    yield put({
      type: AUTH_ACTIONS.SET_STATE,
      payload: {
        ...data,
        isAuthenticated: true,
      },
    });
    
  
    store.set('accessToken', data.tokens.accessToken);
    store.set('refreshToken', data.tokens.refreshToken);
    store.set('isAuthenticated', true);

    history.push('/dashboard');
    
    toast.success('Login successful', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: true,
      closeOnClick: true,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });
  } else {
    toast.error('Invalid Credentials', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: true,
      closeOnClick: true,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });
  }
}

export function* CURRENT_USER() {
  const response = yield doApiCall(userService.getSelfProfile, {}, AUTH_ACTIONS.SET_STATE);

  if (response.success) {
    const { data } = response;
    yield put({
      type: AUTH_ACTIONS.SET_STATE,
      payload: {
        tokens: {
          accessToken: store.get('accessToken'),
          refreshToken: store.get('refreshToken'),
        },
        userDetails: { ...data },
        isAuthenticated: true,
      },
    });
  } else {
    store.clearAll();
    yield put({
      type: AUTH_ACTIONS.SET_STATE,
      payload: {
        tokens: {
          accessToken: null,
          refreshToken: null,
        },
        user: {
          id: null,
          uuid: null,
          adminLoginId: null,
          name: null,
          email: null,
          profilePicture: null,
          mobileNumber: null,
          status: null,
          createdAt: null,
          updatedAt: null,
        },
        isAuthenticated: false,
        loading: false,
      },
    });
    history.push('/');
    // toast.error('Unauthorised!!!', {
    //   position: 'top-right',
    //   autoClose: '5000',
    //   hideProgressBar: true,
    //   closeButton: true,
    //   closeOnClick: true,
    //   draggable: false,
    //   progress: undefined,
    //   theme: 'colored',
    // });
  }
}

export function* LOGOUT() {
  store.clearAll();
  localStorage.removeItem('token');
  
  yield put({
    type: AUTH_ACTIONS.SET_STATE,
    payload: {
      tokens: {
        accessToken: null,
        refreshToken: null,
      },
      user: {
        id: null,
        uuid: null,
        adminLoginId: null,
        name: null,
        email: null,
        profilePicture: null,
        mobileNumber: null,
        status: null,
        createdAt: null,
        updatedAt: null,
      },
      isAuthenticated: false,
      loading: false,
    },
  });
  history.push('/');
}

export function* authSaga() {
  yield all([
    takeEvery(AUTH_ACTIONS.LOGIN, LOGIN),
    takeEvery(AUTH_ACTIONS.LOGOUT, LOGOUT),
    takeEvery(AUTH_ACTIONS.CURRENT_USER, CURRENT_USER),
  ]);
}