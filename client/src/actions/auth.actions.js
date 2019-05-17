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
	INIT_GDRIVE_CONNECT,
	INIT_GDRIVE_CONNECT_SUCCESS,
	INIT_GDRIVE_CONNECT_FAILURE,
} from '../actiontypes';
// import { idbTrack } from '../utils/idbUtils';
import axios from 'axios';
import { history, URLS } from '../config';
const { AUTH_URL, GDRIVE_URL } = URLS;

export const checkUserAgent = () => {
	const userAgentIsMobile = (navigator.maxTouchPoints > 0 || navigator.userAgent.match(/iPhone|iPad|iPod/)) ? true : false
	console.log('checkUserAgent, userAgentIsMobile:', userAgentIsMobile);
	return dispatch => {
		dispatch({
			type: CHECK_USER_AGENT,
			userAgentIsMobile: (navigator.maxTouchPoints > 0 || navigator.userAgent.match(/iPhone|iPad|iPod/)) ? true : false,
		});
	}
}

export const postRegistration = data => {
	return dispatch => {	
		dispatch({
			type: POST_REGISTRATION
		});
		// TOTO: Validate data
		axios.post(`${AUTH_URL}/register`, data)
		.then(response => {
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
			dispatch({
				type: REGISTRATION_FAILURE,
				data: err.response.data,
				status: err.response.status,
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
		axios.post(`${AUTH_URL}/login`, data)
		.then(response => {
			localStorage.setItem('JWT', response.data.token);
			localStorage.setItem('RF', response.data.refreshToken);
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
		// idbTrack.clear();
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
		axios.get(`${AUTH_URL}/user`, { 
		})
		.then(response => {
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
		});
	}
}

export const connectGDriveAccount = () => {
	const userId = localStorage.getItem('userId')
	return dispatch => {
		dispatch({
			type: INIT_GDRIVE_CONNECT,
		});
		axios.get(`${GDRIVE_URL}/authURL`, {
			headers: { 
				userId: userId 
			}
		})
		.then(response => {
			window.open(response.data.authURL)
			dispatch({
				type: INIT_GDRIVE_CONNECT_SUCCESS,
			});
		})
		.catch(err => {
			dispatch({
				type: INIT_GDRIVE_CONNECT_FAILURE,
			});
		});
	}
}
