import { toast } from 'react-toastify';
import { put, call } from 'redux-saga/effects';

// eslint-disable-next-line import/no-cycle
import { history } from '../main';

export function* doApiCall(service, payload, ACTION_SET_STATE) {
  yield showLoading(ACTION_SET_STATE, true);
  yield put({ type: ACTION_SET_STATE, payload: { formError: {} } });
  try {
    yield showLoading(ACTION_SET_STATE, false);
    const response = yield call(service, payload);
    if (response.status === 204) {
      return { success: true };
    }
    // For 2xx with body, return success + data so sagas can use response.success
    if (response.status >= 200 && response.status < 300) {
      return { success: true, data: response.data };
    }
    return response.data;
  } catch (e) {
    yield showLoading(ACTION_SET_STATE, false);
    const { response } = e;
    if (response) {
      const { status, data } = response;
      if (status === 422) {
        yield put({
          type: ACTION_SET_STATE,
          payload: { formError: data.errors },
        });
      }
      if (status === 403) {
        yield history.push('/');
      }
    } else {
      toast.error('Network Error Detected.', {
        position: 'top-right',
        autoClose: '5000',
        hideProgressBar: true,
        closeButton: true,
        closeOnClick: true,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
    }
  }
  return { success: false };
}

export function* showLoading(action, loading) {
  yield put({ type: action, payload: { loading } });
}
