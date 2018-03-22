import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import trackList from './trackList';
import player from './player';

export default combineReducers({
	trackList,
	player,
	form: formReducer
});