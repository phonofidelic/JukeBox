import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import trackList from './trackList';
import player from './player';
import messages from './messages';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
	trackList,
	player,
	messages,
	form: formReducer,
	router: routerReducer,
});