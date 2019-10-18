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
  INIT_GDRIVE_CONNECT_FAILURE
} from '../actiontypes';
// import { idbTrack } from '../utils/idbUtils';
import axios from 'axios';
import { history, URLS } from '../config';
const { AUTH_URL, GDRIVE_URL } = URLS;

export const checkUserAgent = () => {
  const userAgentIsMobile =
    navigator.maxTouchPoints > 0 ||
    navigator.userAgent.match(/iPhone|iPad|iPod/)
      ? true
      : false;
  console.log('checkUserAgent, userAgentIsMobile:', userAgentIsMobile);
  return dispatch => {
    dispatch({
      type: CHECK_USER_AGENT,
      userAgentIsMobile:
        navigator.maxTouchPoints > 0 ||
        navigator.userAgent.match(/iPhone|iPad|iPod/)
          ? true
          : false
    });
  };
};

export const postRegistration = data => {
  return dispatch => {
    dispatch({
      type: POST_REGISTRATION
    });
    // TOTO: Validate data
    axios
      .post(`${AUTH_URL}/register`, data)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);

        history.push('/home'); // TODO: push referrer instead of static 'home'

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
          message: err.response.data.message || err.response.data
        });
      });
  };
};

export const login = data => {
  return dispatch => {
    dispatch({
      type: POST_LOGIN
    });
    // console.log('login, data:', data)
    // TODO: 	Validate data
    axios
      .post(`${AUTH_URL}/login`, data)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);

        history.push('/home'); // TODO: push referrer instead of static 'home'

        console.log('====================================');
        console.log('history:', history);
        console.log('====================================');

        dispatch({
          type: LOGIN_SUCCESS,
          user: response.data.user,
          token: response.data.token,
          message: response.data.message
        });
      })
      .catch(err => {
        console.log('====================================');
        console.log('LOGIN_FAILURE, err:', err);
        console.log('====================================');
        dispatch({
          type: LOGIN_FAILURE
          // data: err.response.data,
          // status: err.response.status,
          // message: err.response.message || err.response.data
        });
      });
  };
};

export const logoutUser = () => {
  return async dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('acceptedCookies');
    // idbTrack.clear();
    history.push('/');

    try {
      const response = await axios.post(`${AUTH_URL}/logout`);

      console.log('====================================');
      console.log('logout response:', response);
      console.log('====================================');

      dispatch({
        type: UNAUTH_USER
      });
    } catch (err) {
      console.error('### logout error:', err);
    }
  };
};

export const getUserInfo = () => {
  return async dispatch => {
    dispatch({
      type: GET_USER_INFO
    });
    axios
      .get(`${AUTH_URL}/user`)
      .then(response => {
        dispatch({
          type: GET_USER_INFO_SUCCESS,
          user: response.data.user,
          isAuthed: response.data.isAuthed,
          message: response.data.message
        });
      })
      .catch(err => {
        // if (err.response.status === 401) {
        //   console.log('====================================');
        //   console.log('RECIEVED', err.response.status);
        //   console.log('====================================');
        //   localStorage.removeItem('JWT');
        //   localStorage.removeItem('userId');
        //   localStorage.removeItem('acceptedCookies');
        //   // idbTrack.clear();
        //   history.push('/');
        //   dispatch({
        //     type: UNAUTH_USER
        //   });
        // }
        dispatch({
          type: GET_USER_INFO_FAILURE
          // data: err.response.data,
          // status: err.response.status,
          // message: err.response.data.message || err.response.data
        });
      });
  };
};

export const connectGDriveAccount = () => {
  return dispatch => {
    dispatch({
      type: INIT_GDRIVE_CONNECT
    });
    axios
      .get(`${GDRIVE_URL}/authURL`, {
        headers: {
          token: localStorage.getItem('JWT')
        }
      })
      .then(response => {
        window.open(response.data.authURL);
        dispatch({
          type: INIT_GDRIVE_CONNECT_SUCCESS
        });
      })
      .catch(err => {
        dispatch({
          type: INIT_GDRIVE_CONNECT_FAILURE
        });
      });
  };
};
