import { combineReducers } from 'redux';
import trackList from './trackList';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
	trackList,
	form: formReducer
});