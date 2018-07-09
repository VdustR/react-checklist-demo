import { applyMiddleware, createStore, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import history from 'Src/history';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const rootReducer = () => ({});
const initialState = ({});

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composeEnhancers(applyMiddleware(routerMiddleware(history))),
);

export default store;
