import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducer from './reducers/index';
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
	reducer,
	window.window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(reduxThunk)
);

const theme = createMuiTheme({
  typography: {
    // Use the system font over Roboto.
    fontFamily:
      '-apple-system,system-ui,BlinkMacSystemFont,' +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    fontWeightMedium: 500,
    body1: {
      fontWeight: 500,
    },
    subheading: {
      fontSize: 12,
    },
    button: {
      // fontStyle: 'italic',
      // size: 'large'
    },
  },
  palette: {
    primary: {
      main: '#d2d8d8',
      light: '#fff',
      dark: '#a1a7a7'
    },
    secondary: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d'
    }
  }
});

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
