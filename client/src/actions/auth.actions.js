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
	POST_GDRIVE_CODE,
	POST_GDRIVE_CODE_SUCCESS,
	POST_GDRIVE_CODE_FAILURE,
} from '../actiontypes';
// import { idbTrack } from '../utils/idbUtils';
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
			console.log('postRegistration error:', err.response);
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
		});
	}
}

export const connectGDriveAccount = () => {
	const userId = localStorage.getItem('userId')
	console.log('connectGDriveAccount, userId:', userId)
	return dispatch => {
		dispatch({
			type: INIT_GDRIVE_CONNECT,
		});
		axios.post(`user/gdrive/authURL`, { userId: userId })
		.then(response => {
			console.log('user/gdrive/authURL response:', response);
			window.open(response.data.authURL)
			dispatch({
				type: INIT_GDRIVE_CONNECT_SUCCESS,
			});
		})
		.catch(err => {
			console.error('user/gdrive/authURL, error:', err);
			dispatch({
				type: INIT_GDRIVE_CONNECT_FAILURE,
			});
		});
	}
}

// export const submitGDSecCode = (formData) => {
// 	console.log('submitGDSecCode, formData:', formData);
// 	return dispatch => {
// 		dispatch({
// 			type: POST_GDRIVE_CODE
// 		});
// 		axios.post('user/gdrive/seccode', { GDSecCode: formData.GDSecCode })
// 		.then(response => {
// 			console.log('POST user/gdrive/seccode, response:', response);
// 			dispatch({
// 				type: POST_GDRIVE_CODE_SUCCESS
// 			})
// 		})
// 		.catch(err => {
// 			console.log('POST /gdrive/seccode, error:', err);
// 			dispatch({
// 				type: POST_GDRIVE_CODE_FAILURE
// 			})
// 		})
// 	}
// }
