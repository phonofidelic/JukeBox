import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import trackList_reducer from './trackList.reducer';
import player_reducer from './player.reducer';
import message_reducer from './message.reducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
	trackList_reducer,
	player_reducer,
	message_reducer,
	form: formReducer,
	router: routerReducer,
});