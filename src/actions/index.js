import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  RESET_PASSWORD_INIT,
  RESET_PASSWORD_END,
  CLEAR_ERROR,
} from '../actions/types';
import axios from 'axios';
import { browserHistory } from 'react-router';

const ROOT_URL = 'http://localhost:3090';

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function clearError(error) {
  return {
    type: CLEAR_ERROR,
    payload: error,
  };
}

export function signinUser({ email, password }) {
  return function signin(dispatch) {
    // submit email, pass to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // if request is good
        // - update state to authenticated
        dispatch({ type: AUTH_USER });
        // - Save JWT
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to user
        dispatch(authError('Bad Login Info'));
      });
  };
}

export function signupUser({ email, password }) {
  return function signup(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
    .then(response => {
      // if request is good
      // - update state to authenticated
      dispatch({ type: AUTH_USER });
      // - Save JWT
      localStorage.setItem('token', response.data.token);
      // - redirect to the route '/feature'
      browserHistory.push('/feature');
    })
    .catch(error => {
      // If request is bad...
      // - Show an error to user
      dispatch(authError(error.response.data.error));
    });
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER,
    payload: null,
  };
}

export function fetchMessage() {
  return function fetchMessageHelper(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message,
      });
    });
  };
}

export function resetPasswordInitiate({ email }) {
  return function resetPasswordInitiateHelper(dispatch) {
    axios.post(`${ROOT_URL}/resetpasswordinit`, { email })
    .then(response => {
      dispatch({
        type: RESET_PASSWORD_INIT,
        payload: response.data.message,
      });
    })
    .catch(error => {
      // If request is bad...
      // - Show an error to user
      dispatch(authError(error.response.data.error));
    });
  };
}

export function resetPasswordEnd({ password, token }) {
  return function resetPasswordEndHelper(dispatch) {
    axios.post(`${ROOT_URL}/resetpassword`, { password, token })
    .then(response => {
      dispatch({
        type: RESET_PASSWORD_END,
        payload: response.data.message,
      });
    })
    .catch(error => {
      // If request is bad...
      // - Show an error to user
      dispatch(authError(error.response.data.error));
    });
  };
}
