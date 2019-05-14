import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import reducer from 'reducers';
import { history, THEME } from 'config';
import { ThemeProvider } from 'contexts/theme.context';

export default ({ children, initialState = {} }) => {
	const store = createStore(
		reducer,
		window.window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		applyMiddleware(
	    reduxThunk, 
	    routerMiddleware(history)
	  )
	);

	const theme = createMuiTheme(THEME);

	return (
		<Provider store={store}>
	    <ConnectedRouter history={history}>
	      <ThemeProvider>
	    		<MuiThemeProvider theme={theme}>
	          { children }
	    		</MuiThemeProvider>
	      </ThemeProvider>
	    </ConnectedRouter>
		</Provider>
	);
}