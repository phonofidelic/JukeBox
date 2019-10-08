import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import reducer from 'reducers/index';
import { history, THEME } from 'config';
import { ThemeProvider, theme } from 'contexts/theme.context';

export default ({ children, initialState = {} }) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancer = composeEnhancers(
    applyMiddleware(reduxThunk, routerMiddleware(history))
  );

  const store = createStore(reducer, initialState, enhancer);

  const materialUITheme = createMuiTheme(theme);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider>
          <MuiThemeProvider theme={materialUITheme}>
            {children}
          </MuiThemeProvider>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
};
