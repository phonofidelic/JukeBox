import {
	CHECK_USER_AGENT,
	POST_REGISTRATION,
	REGISTRATION_SUCCESS,
	REGISTRATION_FAILURE,
	POST_LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	UNAUTH_USER,
	GET_USER_INFO,
	GET_USER_INFO_SUCCESS,
	GET_USER_INFO_FAILURE,
} from '../actiontypes';
import axios from 'axios';
import { history } from '../config';

export const checkUserAgent = () => {
	return dispatch => {
		dispatch({
			type: CHECK_USER_AGENT,
			userAgentIsMobile: navigator.userAgent.indexOf('Mobile') > 0 ? true : false,
		});
	}
}

export const postRegistration = data => {
	return dispatch => {	
		dispatch({
			type: POST_REGISTRATION
		});
		// TOTO: Validate data
		axios.post('/auth/register', data)
		.then(response => {
			console.log('postRegistration response:', response);
			localStorage.setItem('JWT', response.data.token);
			localStorage.setItem('userId', response.data.user._id);
			history.push('/'); // TODO: push referrer instead of static 'home'
			dispatch({
				type: REGISTRATION_SUCCESS,
				user: response.data.user,
				token: response.data.token,
				message: response.data.message
			});
		})
		.catch(err => {
			console.log('postRegistration error:', err);
			dispatch({
				type: REGISTRATION_FAILURE,
				data: err.response.data,
				status: err.response.status ,
				message: err.response.data.message || err.response.data,
			});
		});
	}
}

export const login = data => {	
	return dispatch => {
		dispatch({
			type: POST_LOGIN
		});
		// console.log('login, data:', data)
		// TODO: 	Validate data
		axios.post('/auth/login', data)
		.then(response => {
			console.log('login response:', response);
			localStorage.setItem('JWT', response.data.token);
			localStorage.setItem('userId', response.data.user._id);
			history.push('/'); // TODO: push referrer instead of static 'home'
			dispatch({
				type: LOGIN_SUCCESS,
				user: response.data.user,
				token: response.data.token,
				message: response.data.message
			});
		})
		.catch(err => {
			console.log('login error:', err.response);
			dispatch({
				type: LOGIN_FAILURE,
				data: err.response.data,
				status: err.response.status ,
				message: err.response.message || err.response.data,
			});
		});
	}
}

export const logoutUser = () => {
	return dispatch => {
		localStorage.removeItem('JWT');
		localStorage.removeItem('userId');
		history.push('/');
		dispatch({
			type: UNAUTH_USER
		});
	}
}

export const getUserInfo = () => {
	return dispatch => {
		dispatch({
			type: GET_USER_INFO,
		});
		axios.get(`/auth/user`, { 
			headers: {
				token: localStorage.getItem('JWT'),
				userId: localStorage.getItem('userId')
			}
		})
		.then(response => {
			console.log('getUserInfo, response:', response)
			dispatch({
				type: GET_USER_INFO_SUCCESS,
				user: response.data.user,
				message: response.data.message,
			});
		})
		.catch(err => {
			dispatch({
				type: GET_USER_INFO_FAILURE,
				data: err.response.data,
				status: err.response.status ,
				message: err.response.data.message || err.response.data,
			});
		})
	}
}
