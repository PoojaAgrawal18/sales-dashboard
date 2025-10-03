import { USER_ACTIONS } from './action';

// ----------------------------------------------------------------------

const userInitialState = {
  data: [],
  userData: {},
  pagination: {
    currentPage: 0,
    totalPages: 1,
    perPage: 1,
    total: 1,
  },
};

// eslint-disable-next-line default-param-last
export function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case USER_ACTIONS.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
