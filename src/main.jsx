/* eslint-disable import/no-cycle */
// react-toastify
import { Suspense } from 'react';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import createSagaMiddleware from 'redux-saga';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import { routerMiddleware } from 'connected-react-router';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import { compose, applyMiddleware, legacy_createStore as createStore } from 'redux';

import App from './app';
// eslint-disable-next-line import/no-cycle
import sagas from './redux/sagas';
import reducers from './redux/reducers';
import SuspenseLoader from './components/suspense-loder';

// ----------------------------------------------------------------------

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  onError: (err) => {
    console.log(err);
  },
});

const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(reducers(history), compose(applyMiddleware(...middlewares)));

sagaMiddleware.run(sagas);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ToastContainer />
    <HelmetProvider>
      <Router history={history}>
        <Suspense fallback={<SuspenseLoader />}>
          <App />
        </Suspense>
      </Router>
    </HelmetProvider>
  </Provider>
);

export { store, history };
