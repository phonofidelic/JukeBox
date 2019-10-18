import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CookiesProvider } from 'react-cookie';

import createRootReducer from 'reducers/index';
import { history } from 'config';
import { ThemeProvider, theme } from 'contexts/theme.context';

export default ({ children, initialState = {} }) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancer = composeEnhancers(
    applyMiddleware(reduxThunk, routerMiddleware(history))
  );

  // TODO: move store configuration to config
  const store = createStore(createRootReducer(history), initialState, enhancer);

  const materialUITheme = createMuiTheme(theme);

  return (
    <CookiesProvider>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider>
            <MuiThemeProvider theme={materialUITheme}>
              {children}
            </MuiThemeProvider>
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    </CookiesProvider>
  );
};
