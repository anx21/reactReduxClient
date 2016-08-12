import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  RESET_PASSWORD_INIT,
  RESET_PASSWORD_END,
  CLEAR_ERROR,
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    case RESET_PASSWORD_INIT:
      return { ...state, emailMessage: action.payload };
    case RESET_PASSWORD_END:
      return { ...state, resetMessage: action.payload };
    default:
      return state;
  }
}
