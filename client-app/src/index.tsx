import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './app/layout/App';
import { createBrowserHistory } from 'history';
import './app/layout/styles.scss';
import ScrollToTop from './app/layout/ScrollToTop';
import { store, StoreContext } from './app/stores/store';

export const  history = createBrowserHistory();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <ScrollToTop />
      <App />
    </Router>
  </StoreContext.Provider>,
  document.getElementById('root')
);