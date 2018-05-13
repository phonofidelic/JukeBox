import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import trackList from './trackList.reducer';
import player from './player.reducer';
import message from './message.reducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
	trackList,
	player,
	message,
	form: formReducer,
	router: routerReducer,
});