import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'Root';
import App from './App';
import { initialGlobalState } from 'reducers/index';

console.log('initialGlobalState:', initialGlobalState)
ReactDOM.render(
  <Root initialState={initialGlobalState}>
    <App />
  </Root>, document.getElementById('root')
);
// registerServiceWorker();
