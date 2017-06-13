import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import { AppContainer } from 'react-hot-loader'
import FastClick from 'fastclick';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom'

import store from './store';
import Root from './root';

const container = document.getElementById('container');

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>
    , container
  )
};

render(Root);

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./root', () => {
    const NextApp = require('./root').default;
    render(NextApp);
  });
}
