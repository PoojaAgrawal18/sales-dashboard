/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
/* eslint-disable perfectionist/sort-imports */
// src/app.jsx

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/router';
import { history } from 'src/main';
import store from 'store';
import ThemeProvider from 'src/theme';
import { AUTH_ACTIONS } from './redux/auth/actions';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const query = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();

  const loginCheck = async () => {
    try {
      const token = query.get('token') || store.get('accessToken');
      if (token) {
        store.set('accessToken', token);
        store.set('isAuthenticated', true);
        dispatch({
          type: AUTH_ACTIONS.CURRENT_USER,
          paload: {},
        });
      }
    } catch (error) {
      console.log('TOKEN NOT FOUND', error);
      store.remove('accessToken');
      store.set('isAuthenticated', false);
      history.push('/');
    }
  };

  useEffect(() => {
    loginCheck();
  }, [window.location]);

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
