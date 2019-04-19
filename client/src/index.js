import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducer from './reducers/index';
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import registerServiceWorker from './registerServiceWorker';
// import createBrowserHistory from 'history/createBrowserHistory';
// import { history } from './config';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { history, THEME } from './config';
import { ThemeProvider } from './contexts/theme.context';

// export const history = createBrowserHistory();

const store = createStore(
	reducer,
	window.window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(
    reduxThunk, 
    routerMiddleware(history)
  )
);

const theme = createMuiTheme(THEME);

ReactDOM.render(
	<Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider>
    		<MuiThemeProvider theme={theme}>
          <App />
    		</MuiThemeProvider>
      </ThemeProvider>
    </ConnectedRouter>
	</Provider>, document.getElementById('root'));
// registerServiceWorker();
