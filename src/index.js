import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { routeConfig } from './router';
import createSagaMiddleware from 'redux-saga';
import homeRedu from './reducers/HomeRedu';
import userRedu from './reducers/UserRedu';
import personalRedu from './reducers/PersonalRedu';
import settingRedu from './reducers/SettingRedu';
import detailRedu from './reducers/DetailRedu';

import rootSagas from './sagas/RootSagas';
const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const store = createStore (
  combineReducers({
    homeRedu,
    userRedu,
    personalRedu,
    settingRedu,
    detailRedu,
    router: routerReducer
  }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSagas);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div style={{maxHeight: '100%'}}>
        {routeConfig}
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);