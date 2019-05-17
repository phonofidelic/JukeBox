import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'Root';
import App from './App';
import { initialGlobalState } from 'reducers/index';
import 'index.css';

console.log('initialGlobalState:', initialGlobalState)
ReactDOM.render(
  <Root initialState={initialGlobalState}>
    <App />
  </Root>, document.getElementById('root')
);
// registerServiceWorker();
