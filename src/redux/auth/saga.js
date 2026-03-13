import store from 'store';
import { toast } from 'react-toastify';
import { all, put, takeEvery } from 'redux-saga/effects';

// eslint-disable-next-line import/no-cycle
import { history } from '../../main';
import { doApiCall } from '../helper';
import { AUTH_ACTIONS } from './actions';
import { AuthAPIService } from '../../services/auth/auth';

const authService = new AuthAPIService();

export function* LOGIN({ payload }) {
  const response = yield doApiCall(authService.login, payload, AUTH_ACTIONS.SET_STATE);

  if (response.success && response.data) {
    const { data } = response;
    // Support multiple backend shapes: tokens object, or top-level accessToken/token
    const accessToken =
      data.tokens?.accessToken ?? data.accessToken ?? data.token ?? null;
    const refreshToken =
      data.tokens?.refreshToken ?? data.refreshToken ?? data.token ?? null;

    const loginEmail =
      payload?.body?.email && typeof payload.body.email === 'string'
        ? payload.body.email.trim()
        : data?.user?.email ?? data?.email ?? null;

    const userDetails = {
      ...(data?.userDetails || data?.user || {}),
      clientEmail:
        loginEmail ||
        data?.userDetails?.clientEmail ||
        data?.user?.email ||
        data?.email,
      clientName: data?.userDetails?.clientName ?? data?.user?.name ?? data?.name,
    };

    yield put({
      type: AUTH_ACTIONS.SET_STATE,
      payload: {
        ...data,
        tokens: data.tokens ?? { accessToken, refreshToken },
        isAuthenticated: true,
        userDetails,
      },
    });

    if (accessToken) store.set('accessToken', accessToken);
    if (refreshToken) store.set('refreshToken', refreshToken);
    store.set('isAuthenticated', true);
    store.set('userDetails', userDetails);

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

export function* SIGNUP({ payload }) {
  const response = yield doApiCall(authService.signup, payload, AUTH_ACTIONS.SET_STATE);

  if (response.success && response.data) {
    const { data } = response;
    // If backend returns tokens on signup, log user in and go to dashboard
    const accessToken =
      data.tokens?.accessToken ?? data.accessToken ?? data.token ?? null;
    const refreshToken =
      data.tokens?.refreshToken ?? data.refreshToken ?? data.token ?? null;

    if (accessToken) {
      yield put({
        type: AUTH_ACTIONS.SET_STATE,
        payload: {
          ...data,
          tokens: data.tokens ?? { accessToken, refreshToken },
          isAuthenticated: true,
        },
      });
      store.set('accessToken', accessToken);
      if (refreshToken) store.set('refreshToken', refreshToken);
      store.set('isAuthenticated', true);
      history.push('/dashboard');
      toast.success('Account created successfully', {
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
      // No tokens: assume signup only, redirect to login
      history.push('/login');
      toast.success('Account created. Please log in.', {
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
  } else if (!response.success && response !== undefined) {
    toast.error('Sign up failed. Please try again.', {
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
      userDetails: {},
      isAuthenticated: false,
      loading: false,
    },
  });
  history.push('/');
}

export function* CURRENT_USER() {
  const isAuthenticated = store.get('isAuthenticated');
  const accessToken = store.get('accessToken');
  const refreshToken = store.get('refreshToken');
  const persistedUserDetails = store.get('userDetails') || {};

  if (isAuthenticated && accessToken) {
    yield put({
      type: AUTH_ACTIONS.SET_STATE,
      payload: {
        tokens: {
          accessToken,
          refreshToken: refreshToken || null,
        },
        userDetails: persistedUserDetails,
        isAuthenticated: true,
      },
    });
  }
}

export function* authSaga() {
  yield all([
    takeEvery(AUTH_ACTIONS.LOGIN, LOGIN),
    takeEvery(AUTH_ACTIONS.SIGNUP, SIGNUP),
    takeEvery(AUTH_ACTIONS.LOGOUT, LOGOUT),
     takeEvery(AUTH_ACTIONS.CURRENT_USER, CURRENT_USER),
  ]);
}