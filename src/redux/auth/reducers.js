import { AUTH_ACTIONS } from './actions';

const authInitialState = {
  tokens: {
    accessToken: null,
    refreshToken: null,
  },
  userDetails: {},
  isAuthenticated: false,
  loading: false,
};

// eslint-disable-next-line default-param-last
export function authReducer(state = authInitialState, action) {
  switch (action.type) {
    case AUTH_ACTIONS.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
