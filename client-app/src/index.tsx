import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './app/layout/App';
import { createBrowserHistory } from 'history';
import './app/layout/styles.scss';
import ScrollToTop from './app/layout/ScrollToTop';

export const  history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop />
    <App />
  </Router>,
  document.getElementById('root')
);