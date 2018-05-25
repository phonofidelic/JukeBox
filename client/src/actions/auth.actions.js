import {
	POST_REGISTRATION,
	REGISTRATION_SUCCESS,
	REGISTRATION_FAILURE,
	POST_LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
} from '../actiontypes';
import axios from 'axios';

export const postRegistration = data => {
	return dispatch => {	
		dispatch({
			type: POST_REGISTRATION
		});
		// TOTO: Validate data
		axios.post('/auth/register', data)
		.then(response => {
			console.log('postRegistration response:', response);
			dispatch({
				type: REGISTRATION_SUCCESS,
				user: response.data.user,
				token: response.data.token,
				message: response.data.message
			})
		})
		.catch(err => {
			console.error('postRegistration error:', err);
			dispatch({
				type: REGISTRATION_FAILURE,
				message: err
			})
		});
	}
}

export const login = data => {
	return dispatch => {
		dispatch({
			type: POST_LOGIN
		});
		// TODO: 	Validate data
		axios.post('/auth/login', data)
		.then(response => {
			console.log('login response:', response);
			dispatch({
				type: LOGIN_SUCCESS,
				user: response.data.user,
				token: response.data.token,
				message: response.data.message
			})
		})
		.catch(err => {
			console.error('login error:', err);
			dispatch({
				type: LOGIN_FAILURE,
			})
		});
	}
}