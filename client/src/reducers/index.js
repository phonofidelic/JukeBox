import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import library, { INITIAL_STATE as libraryInitState } from './library.reducer';
import player, { INITIAL_STATE as playerInitState} from './player.reducer';
import message, { INITIAL_STATE as messageInitState } from './message.reducer';
import auth, { INITIAL_STATE as authInitState } from './auth.reducer';
import error, { INITIAL_STATE as errorInitialState } from './error.reducer';
import { routerReducer } from 'react-router-redux';

export const initialGlobalState = {
	auth: authInitState,
	library: libraryInitState,
	player: playerInitState,
	message: messageInitState,
	error: errorInitialState,
}

export default combineReducers({
	auth,
	library,
	player,
	message,
	error,
	form: formReducer,
	router: routerReducer,
});