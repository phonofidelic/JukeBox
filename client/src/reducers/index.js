import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import library from './library.reducer';
import player from './player.reducer';
import message from './message.reducer';
import auth from './auth.reducer';
import error from './error.reducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
	auth,
	library,
	player,
	message,
	error,
	form: formReducer,
	router: routerReducer,
});